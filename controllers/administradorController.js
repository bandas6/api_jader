'use strict';
const AdministradorCancha = require('../models/administradorCanchaModel')

exports.findAll = function(req, res) {
	AdministradorCancha.findAll(function(err, administradorCancha) {
		if (err)
			res.send(err);
		res.send(administradorCancha);
	});
};

exports.create = function(req, res) {
	const new_administradorCancha = new AdministradorCancha(req.body);
	//handles null error
	if(req.body.constructor === Object && Object.keys(req.body).length === 0){
		res.status(400).send({ error:true, message: 'Please provide all required field' });
	}else{
		AdministradorCancha.create(new_administradorCancha, function(err, administradorCancha) {
			if (err)
				res.send(err);
			res.json({error:false,message:"administradorCancha added successfully!",data:administradorCancha});
		});
	}
};

exports.findById = function(req, res) {
	AdministradorCancha.findById(req.params.id, function(err, administradorCancha) {
		if (err)
			res.send(err);
		res.json(administradorCancha);
	});
};

exports.findByEmail = function(req, res) {
	AdministradorCancha.findByEmail(req.params.email, function(err, administradorCancha) {
		if (err)
			res.send(err);
		res.json(administradorCancha);
	});
}; 

exports.update = function(req, res) {
	if(req.body.constructor === Object && Object.keys(req.body).length === 0){
		res.status(400).send({ error:true, message: 'Please provide all required field' });
	}else{
		AdministradorCancha.update(req.params.id, new AdministradorCancha(req.body), function(err, administradorCancha) {
			if (err)
				res.send(err);
			res.json({ error:false, message: 'administradorCancha successfully updated' });
		});
	}
};

exports.updatePass = function(req, res) {
	if(req.body.constructor === Object && Object.keys(req.body).length === 0){
		res.status(400).send({ error:true, message: 'Please provide all required field' });
	}else{
		AdministradorCancha.updatePass(req.params.id, new AdministradorCancha(req.body), function(err, administradorCancha) {
			if (err)
				res.send(err);
			res.json({ error:false, message: 'administradorCancha successfully updated' });
		});
	}
};

exports.updateActivo = function(req, res) {
	AdministradorCancha.updateActivo(req.params.id, function(err, administradorCancha) {
		if (err)
			res.send(err);
		res.json({ error:false, message: 'administradorCancha successfully updated' });
	});
};

exports.delete = function(req, res) {
	AdministradorCancha.delete( req.params.id, function(err, administradorCancha) {
		if (err)
			res.send(err);
		res.json({ error:false, message: 'administradorCancha successfully deleted' });
	});
};
