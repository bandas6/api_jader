'use strict';
const Mensaje = require('../models/mensajeModel')

exports.findAll = function(req, res) {
	Mensaje.findAll(function(err, mensaje) {
		if (err)
			res.send(err);
		res.send(mensaje);
	});
};

exports.create = function(req, res) {
	const new_mensaje = new Mensaje(req.body);
	//handles null error
	if(req.body.constructor === Object && Object.keys(req.body).length === 0){
		res.status(400).send({ error:true, message: 'Please provide all required field' });
	}else{
		Mensaje.create(new_mensaje, function(err, mensaje) {
			if (err)
				res.send(err);
			res.json({error:false,message:"mensaje added successfully!",data:mensaje});
		});
	}
};

exports.findById = function(req, res) {
	Mensaje.findById(req.params.id, function(err, mensaje) {
		if (err)
			res.send(err);
		res.json(mensaje);
	});
};

exports.update = function(req, res) {
	if(req.body.constructor === Object && Object.keys(req.body).length === 0){
		res.status(400).send({ error:true, message: 'Please provide all required field' });
	}else{
		Mensaje.update(req.params.id, new Mensaje(req.body), function(err, mensaje) {
			if (err)
				res.send(err);
			res.json({ error:false, message: 'mensaje successfully updated' });
		});
	}
};

exports.delete = function(req, res) {
	Mensaje.delete( req.params.id, function(err, mensaje) {
		if (err)
			res.send(err);
		res.json({ error:false, message: 'mensaje successfully deleted' });
	});
};
