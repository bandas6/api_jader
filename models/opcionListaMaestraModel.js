var mongoose = require('mongoose')

var opcionListaMaestraSchema = mongoose.Schema({
    lista_maestra_id: String,
    nombre: String,
    etiqueta: String,
    fecha_creacion: String,
    fecha_modificacion: String,
    activo: {
        type: Boolean,
        default: true
    },
    visible: {
        type: Boolean,
        default: true
    },
},
{collection: 'opcionListaMaestra'}
)

var OpcionListaMaestra = module.exports = mongoose.model('opcionListaMaestra', opcionListaMaestraSchema)

module.exports.get = function (req ,callback, limit){
    OpcionListaMaestra.find({$and: [ {  activo: 'true' }, { visible: 'true'}, { lista_maestra_id : req.params}]},callback).limit(limit)
}

module.exports.getAdmin = function (req ,callback, limit){
    OpcionListaMaestra.find( { lista_maestra_id : req.params} ,callback).limit(limit)
}
