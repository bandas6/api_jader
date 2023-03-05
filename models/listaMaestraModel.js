var mongoose = require('mongoose')

var listaMaestraSchema = mongoose.Schema({
    id: Number,
    nombre: String,
    etiqueta: String,
    fecha_creacion: String,
    fecha_modificacion: String,
    activo: {
        type: Boolean,
        default: true
    },
},
{collection: 'listaMaestra'}
)

var ListaMaestra = module.exports = mongoose.model('listaMaestra', listaMaestraSchema)

module.exports.get = function (callback, limit){
    ListaMaestra.find(callback).limit(limit)
}