OpcionListaMaestra = require('../models/opcionListaMaestraModel')
var fecha= new Date();

exports.findAll = function (req, res){
    OpcionListaMaestra.get(req ,function(err, opcionListaMaestra){
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
            data: opcionListaMaestra
        })
    })
}

exports.create = function(req, res){
    var opcionListaMaestra = new OpcionListaMaestra()
    opcionListaMaestra.lista_maestra_id = req.params._id
    opcionListaMaestra.nombre = req.body.nombre
    opcionListaMaestra.etiqueta = req.body.etiqueta
    opcionListaMaestra.fecha_creacion = fecha
    opcionListaMaestra.fecha_modificacion = fecha
    opcionListaMaestra.activo = "true"
    opcionListaMaestra.visible = "true"
    opcionListaMaestra.save(function (err){
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
            data: opcionListaMaestra
        })
    })

}

exports.findById = function(req, res){
    OpcionListaMaestra.findById(req.params, function(err, opcionListaMaestra){
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
            message: 'registro encontrado',
            data: opcionListaMaestra
        })
    })
}

exports.update = function(req, res){
    OpcionListaMaestra.findById(req.params, function(err, opcionListaMaestra){
        if(err)
            res.json({
                status: 'error',
                code: 500,
                message: err
            })
			opcionListaMaestra.lista_maestra_id = req.body.lista_maestra_id
            opcionListaMaestra.nombre = req.body.nombre
            opcionListaMaestra.etiqueta = req.body.etiqueta
            opcionListaMaestra.fecha_modificacion = fecha
            opcionListaMaestra.activo = req.body.activo
            opcionListaMaestra.visible = req.body.visible
			opcionListaMaestra.save(function (err){
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
                data: opcionListaMaestra
            })
        })
    })
}

exports.delete = function(req, res){
	OpcionListaMaestra.findById(req.params, function(err, opcionListaMaestra){
        if(err)
            res.json({
                status: 'error',
                code: 500,
                message: err
            })
			opcionListaMaestra.activo = "false"
			opcionListaMaestra.save(function (err){
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

exports.findAllAdmin = function (req, res){
    OpcionListaMaestra.getAdmin(req ,function(err, opcionListaMaestra){
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
            data: opcionListaMaestra
        })
    })
}