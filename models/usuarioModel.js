var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var OpcionListaMaestra = require('../models/opcionListaMaestraModel')
var opcionListaMaestra = mongoose.model('opcionListaMaestra');

var usuarioSchema = mongoose.Schema({
    identificador: Number,
    perfil_id: { type: Schema.ObjectId, ref: "opcionListaMaestra" },
    nombre: String,
    apellido: String,
    correo: String,
    telefono: String,
    contrasenia: String,
    fecha_creacion: String,
    fecha_modificacion: String,
    foto_perfil: String,
    fecha_nacimiento: String,
    activo: {
        type: Boolean,
        default: false
    },
    verificado: {
        type: Boolean,
        default: false
    },
    codigo_verificacion: String,
},
{collection: 'usuario'});

usuarioSchema.index( {correo: 1}, {unique: true}, function(err, result) {
    console.log(result);
});
usuarioSchema.index( {telefono: 1}, {unique: true}, function(err, result) {
    console.log(result);
});

var Usuario = module.exports = mongoose.model('usuario', usuarioSchema);

module.exports.get = function (req, callback, limit){
    cadena = '{ "perfil_id" : { "$nin" : [ "63f2e3b4b9df508afeedc299" , "63f2e408b9df508afeedc29b" ] } ,"$and" : [{ "activo" : "true" }, { "verificado" : "true" }], '
    cadena = cadena+' "$or" : [ ';
    bandera = false;
    if(req.nombre){
        bandera = true
        cadena = cadena+'{ "nombre" : { "$regex" : "'+req.nombre+'" } }'; 
    }
    if(req.perfil_id){
        if(bandera){
            cadena = cadena+', { "perfil_id" : "'+req.perfil_id+'" }';
        }else{
            bandera = true
            cadena = cadena+'{ "perfil_id" : "'+req.perfil_id+'" }';
        }
    }
    if(req.correo){
        if(bandera){
            cadena = cadena+', { "correo" : { "$regex" : "'+req.correo+'" } }';
        }else{
            bandera = true
            cadena = cadena+'{ "correo" : { "$regex" : "'+req.correo+'" } }';
        }
    }
    if(bandera){
    cadena = cadena+" ] }";
    Usuario.find(JSON.parse(cadena), callback).limit(limit)
    }else{
        Usuario.find( { perfil_id: { $nin: ["63f2e3b4b9df508afeedc299","63f2e408b9df508afeedc29b"]}, $and: [{ activo: 'true' }, { verificado: 'true'}] }, callback).limit(limit)
    }
}

module.exports.getAdmin = function (req, callback, limit){
    cadena = '{ "$or" : [ ';
    bandera = false;
    if(req.nombre){
        bandera = true
        cadena = cadena+'{ "nombre" : { "$regex" : "'+req.nombre+'" } }'; 
    }
    if(req.perfil_id){
        if(bandera){
            cadena = cadena+', { "perfil_id" : "'+req.perfil_id+'" }';
        }else{
            bandera = true
            cadena = cadena+'{ "perfil_id" : "'+req.perfil_id+'" }';
        }
    }
    if(req.correo){
        if(bandera){
            cadena = cadena+', { "correo" : { "$regex" : "'+req.correo+'" } }';
        }else{
            bandera = true
            cadena = cadena+'{ "correo" : { "$regex" : "'+req.correo+'" } }';
        }
    }
    if(bandera){
        cadena = cadena+" ] }";
        Usuario.find(JSON.parse(cadena), callback).limit(limit)
    }else{
        Usuario.find(callback).limit(limit)
    }
    
}