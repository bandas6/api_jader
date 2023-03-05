'use strict';
const Usuario = require('../models/usuarioModel')

exports.findAll = function(req, res) {
	Usuario.findAll(function(err, usuario) {
		if (err)
			res.send(err);
		res.send(usuario);
	});
};

exports.create = function(req, res) {
	const new_usuario = new Usuario(req.body);
	//handles null error
	if(req.body.constructor === Object && Object.keys(req.body).length === 0){
		res.status(400).send({ error:true, message: 'Please provide all required field' });
	}else{
		Usuario.create(new_usuario, function(err, usuario) {
			if (err)
				res.send(err);
			res.json({error:false,message:"usuario added successfully!",data:usuario});
		});
	}
};

exports.findById = function(req, res) {
	Usuario.findById(req.params.id, function(err, usuario) {
		if (err)
			res.send(err);
		res.json(usuario);
	});
};

/* exports.findByEmail = function(req, res) {
	Usuario.findByEmail(req.params.email, function(err, usuario) {
		if (err)
			res.send(err);
		res.json(usuario);
	});
}; */

exports.findByTlf = function(req, res) {
	Usuario.findByTlf(req.params.tlf, function(err, usuario) {
		if (err)
			res.send(err);
		res.json(usuario);
	});
};

exports.update = function(req, res) {
	if(req.body.constructor === Object && Object.keys(req.body).length === 0){
		res.status(400).send({ error:true, message: 'Please provide all required field' });
	}else{
		Usuario.update(req.params.id, new Usuario(req.body), function(err, usuario) {
			if (err)
				res.send(err);
			res.json({ error:false, message: 'usuario successfully updated' });
		});
	}
};

exports.updatePass = function(req, res) {
	if(req.body.constructor === Object && Object.keys(req.body).length === 0){
		res.status(400).send({ error:true, message: 'Please provide all required field' });
	}else{
		Usuario.updatePass(req.params.id, new Usuario(req.body), function(err, usuario) {
			if (err)
				res.send(err);
			res.json({ error:false, message: 'usuario successfully updated' });
		});
	}
};

exports.updateCodigo = function(req, res) {
	if(req.body.constructor === Object && Object.keys(req.body).length === 0){
		res.status(400).send({ error:true, message: 'Please provide all required field' });
	}else{
		Usuario.updateCodigo(req.params.id, new Usuario(req.body), function(err, usuario) {
			if (err)
				res.send(err);
			res.json({ error:false, message: 'usuario successfully updated' });
		});
	}
};

/* exports.sendSMS = function(req, res) {
	const new_usuario = new Usuario(req.body);
	if(req.body.constructor === Object && Object.keys(req.body).length === 0){
		res.status(400).send({ error:true, message: 'Please provide all required field' });
	}else{
		Usuario.sendSMS(new_usuario, function(err, usuario) {
			if (err)
				res.send(err);
			res.json({error:false,message:"sms enviado!",data:usuario});
		});
	}
}; */

exports.updateVerificado = function(req, res) {
	Usuario.updateVerificado(req.params.id, function(err, usuario) {
		if (err)
			res.send(err);
		res.json({ error:false, message: 'usuario successfully updated' });
	});
};

exports.delete = function(req, res) {
	Usuario.delete( req.params.id, function(err, usuario) {
		if (err)
			res.send(err);
		res.json({ error:false, message: 'usuario successfully deleted' });
	});
};
