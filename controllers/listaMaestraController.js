ListaMaestra = require('../models/listaMaestraModel')
var fecha= new Date();

exports.findAll = function (req, res){
    ListaMaestra.get(function(err, listaMaestra){
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
            data: listaMaestra
        })
    })
}

exports.create = function(req, res){
    var listaMaestra = new ListaMaestra()
    listaMaestra.id = req.body.id
    listaMaestra.nombre = req.body.nombre
    listaMaestra.etiqueta = req.body.etiqueta
    listaMaestra.fecha_creacion = fecha//req.body.fecha_creacion
    listaMaestra.fecha_modificacion = fecha//req.body.fecha_modificacion
    listaMaestra.activo = "true"
    listaMaestra.save(function (err){
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
            data: listaMaestra
        })
    })

}

exports.findById = function(req, res){
    ListaMaestra.findById(req.params, function(err, listaMaestra){
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
            data: listaMaestra
        })
    })
}

exports.update = function(req, res){
    ListaMaestra.findById(req.params, function(err, listaMaestra){
        if(err)
            res.json({
                status: 'error',
                code: 500,
                message: err
            })
			listaMaestra.id = req.body.id
            listaMaestra.nombre = req.body.nombre
            listaMaestra.etiqueta = req.body.etiqueta
            listaMaestra.fecha_modificacion = fecha//req.body.fecha_modificacion
            listaMaestra.activo = req.body.activo
			listaMaestra.save(function (err){
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
                data: listaMaestra
            })
        })
    })
}

exports.delete = function(req, res){
	ListaMaestra.findById(req.params, function(err, listaMaestra){
        if(err)
            res.json({
                status: 'error',
                code: 500,
                message: err
            })
			listaMaestra.activo = "false"
			listaMaestra.save(function (err){
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