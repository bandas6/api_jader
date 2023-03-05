Usuario = require('../models/usuarioModel')
OpcionListaMaestra = require('../models/opcionListaMaestraModel')
const bcrypt = require("bcryptjs")
const rondasDeSal = 10
var fecha= new Date();

//inicia sesion con email o telefono y contraseña
exports.login = async function(req, res){
    Usuario.find({$or: [ { correo: req.body.usuario }, { telefono: req.body.usuario } ]}, 
        '_id perfil_id nombre apellido correo telefono foto_perfil activo verificado contrasenia', 
        async function(err, usuario){
        if(err)
            res.json({
                status: 'error',
                code: 500,
                message: err
            })
        if(usuario.length > 0){
            if(usuario[0].activo){
                var comparacion = await bcrypt.compare(req.body.contrasenia, usuario[0].contrasenia);
                if(comparacion){
                    res.json({
                        status: 'success',
                        code: 200,
                        message: 'registro encontrado',
                        data: usuario
                    })
                }else{
                    res.json({
                        status: 'error',
                        code: 200,
                        message: 'La contraseña es incorrecta',
                        data: []
                    })
                }
            }else{
                res.json({
                    status: 'error',
                    code: 200,
                    message: 'el usuario no se encuentra activo o fue eliminado',
                    data: []
                })
            }
        }else{
            res.json({
                status: 'error',
                code: 200,
                message: 'no existe un usuario registrado con esa información',
                data: []
            })
        }
        
    })
}

//obtener todos los usuarios activos y verificados para uso general
exports.findAll = function (req, res){
    Usuario.get(req.query ,function(err, usuarios){
        if(err){
            res.json({
                status: 'error',
                code: 500,
                message: err
            })
        }
        OpcionListaMaestra.populate(usuarios, { path: "perfil_id" }, function (err, usuarios) {
            if(err){
                res.json({
                    status: 'error',
                    code: 500,
                    message: err
                })
            }
            res.json({
                status: 'success',
                code: 200,
                message: 'registros consultados',
                cantidad_registros: usuarios.length,
                data: usuarios
            })
        });
    })
}

//registrar usuarios solos
exports.create = async function(req, res){
    var usuario = new Usuario()
    usuario.perfil_id = req.body.perfil_id
    usuario.nombre = req.body.nombre
    usuario.apellido = req.body.apellido
    usuario.correo = req.body.correo
    usuario.telefono = req.body.telefono
    usuario.contrasenia = await bcrypt.hash(req.body.contrasenia, rondasDeSal);
    usuario.fecha_creacion = fecha//req.body.fecha_creacion
    usuario.fecha_modificacion = fecha//req.body.fecha_modificacion
    usuario.foto_perfil = "http://localhost/archivos/perfil.png"//req.body.foto_perfil
	usuario.fecha_nacimiento = req.body.fecha_nacimiento
    usuario.activo = "true"
	usuario.verificado = "false"
    usuario. codigo_verificacion = generador_codigo_verificacion();
    usuario.save(function (err){
        if(err){
            res.json({
                status: 'error',
                code: 500,
                message: err
            })
        }
        res.json({
            status: 'success',
            code: 200,
            message: 'registro guardado',
            data: usuario
        })
    })

}

//obtener un usuario para uso general
exports.findById = function(req, res){
    Usuario.findById(req.params,'perfil_id nombre apellido correo telefono foto_perfil activo verificado' , function(err, usuario){
        if(err)
            res.json({
                status: 'error',
                code: 500,
                message: err
            })
        res.json({
            status: 'success',
            code: 200,
            message: 'registro encontrado',
            data: usuario
        })
    })
}

//actualizar la información de un usuario menos la contraseña
exports.update = function(req, res){
    Usuario.findById(req.params, function(err, usuario){
        if(err)
            res.json({
                status: 'error',
                code: 500,
                message: err
            })
			usuario.perfil_id = req.body.perfil_id
			usuario.nombre = req.body.nombre
			usuario.apellido = req.body.apellido
			usuario.correo = req.body.correo
			usuario.telefono = req.body.telefono
			usuario.fecha_modificacion = fecha
			usuario.fecha_nacimiento = req.body.fecha_nacimiento
			usuario.save(function (err){
            if(err)
				res.json({
					status: 'error',
					code: 500,
					messagge: err
				})
            res.json({
                status: 'success',
                code: 200,
                message: 'registro actualizado',
                data: usuario
            })
        })
    })
}

//cambia el estado de un usuario a inactivo
exports.delete = function(req, res){
	Usuario.findById(req.params, function(err, usuario){
        if(err)
            res.json({
                status: 'error',
                code: 500,
                message: err
            })
			usuario.activo = "false"
            usuario.fecha_modificacion = fecha
			usuario.save(function (err){
            if(err)
				res.json({
					status: 'error',
					code: 500,
					messagge: err
				})
            res.json({
                status: 'success',
                code: 200,
                message: 'registro eliminado',
                data: ""
            })
        })
    })
    /* Lugar.deleteOne({
        _id: req.params._id
    }, function (err){
        if(err)
        res.json({
            status: 'error',
            code: 500,
            message: err
        })
        res.json({
            status: 'success',
            code: 200,
            message: 'registro eliminado'
        })
    }) */
}

//cambia el estado de un usuario a activo
exports.activar = function(req, res){
	Usuario.findById(req.params, function(err, usuario){
        if(err)
            res.json({
                status: 'error',
                code: 500,
                message: err
            })
			usuario.activo = "true"
			usuario.save(function (err){
            if(err)
				res.json({
					status: 'error',
					code: 500,
					messagge: err
				})
            res.json({
                status: 'success',
                code: 200,
                message: 'registro eliminado',
                data: ""
            })
        })
    })
}

//cambia el estado de un usuario
exports.verificar = function(req, res){
	Usuario.findById(req.params, function(err, usuario){
        if(err){
            res.json({
                status: 'error',
                code: 500,
                message: err
            })
        }
        if(usuario.length > 0){
            if(usuario[0].activo){
                if(usuario[0].codigo_verificacion.length>0){
                    if(req.body.codigo === usuario[0].codigo_verificacion){
                        usuario.fecha_modificacion = fecha
                        usuario.verificado = "true"
                        usuario.save(function (err){
                            if(err){
                                res.json({
                                    status: 'error',
                                    code: 500,
                                    messagge: err
                                })
                            }
                            res.json({
                                status: 'success',
                                code: 200,
                                message: 'Registro verificado.',
                                data: ""
                            })
                        })
                    }else{
                        res.json({
                            status: 'error',
                            code: 200,
                            message: 'El codigo ingresado es incorrecto.',
                            data: ""
                        })
                    }
                }else{
                    res.json({
                        status: 'error',
                        code: 200,
                        message: 'Para ser verificado debe comunicarse con el administrador de la App.',
                        data: ""
                    })
                }
            }else{
                res.json({
                    status: 'error',
                    code: 401,
                    message: 'Usuario no disponible, comunicate con el administrador de la App',
                    data: ""
                })
            }
        }else{
            res.json({
                status: 'error',
                code: 400,
                message: 'No existe el usuario.',
                data: ""
            })
        }
    })
}

//obtener todos los usuarios para uso solo de administradores
exports.findAllAdmin = function (req, res){
    Usuario.getAdmin(req.query,function(err, usuarios){
        if(err){
            res.json({
                status: 'error',
                code: 500,
                message: err
            })
        }
        OpcionListaMaestra.populate(usuarios, { path: "perfil_id" }, function (err, usuarios) {
            if(err){
                res.json({
                    status: 'error',
                    code: 500,
                    message: err
                })
            }
            res.json({
                status: 'success',
                code: 200,
                message: 'registros consultados',
                cantidad_registros: usuarios.length,
                data: usuarios
            })
        });
    })
}

//registrar usuarios por el administrador
exports.createAdmin = function(req, res){
    var usuario = new Usuario()
    var contrasenia = encriptar(req.body.contrasenia)
    usuario.perfil_id = req.body.perfil_id
    usuario.nombre = req.body.nombre
    usuario.apellido = req.body.apellido
    usuario.correo = req.body.correo
    usuario.telefono = req.body.telefono
    usuario.contrasenia = contrasenia
    usuario.fecha_creacion = fecha//req.body.fecha_creacion
    usuario.fecha_modificacion = fecha//req.body.fecha_modificacion
    usuario.foto_perfil = "http://localhost/archivos/perfil.png"//req.body.foto_perfil
	usuario.fecha_nacimiento = req.body.fecha_nacimiento
    usuario.activo = "true"
	usuario.verificado = "true"
    usuario. codigo_verificacion = "";
    usuario.save(function (err){
        if(err){
            res.json({
                status: 'error',
                code: 500,
                message: err
            })
        }
        res.json({
            status: 'success',
            code: 200,
            message: 'registro guardado',
            data: usuario
        })
    })

}

function generador_codigo_verificacion() {
    var tamano = 8;
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charLength = chars.length;
    var codigo = '';
    for ( var i = 0; i < tamano; i++ ) {
        codigo += chars.charAt(Math.floor(Math.random() * charLength));
    }
    return codigo;
 }