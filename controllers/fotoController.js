'use strict';
const Foto = require('../models/fotoModel')

exports.findAll = function(req, res) {
	Foto.findAll(function(err, foto) {
		if (err)
			res.send(err);
		res.send(foto);
	});
};

exports.create = function(req, res) {
	const new_foto = new Foto(req.body);
	//handles null error
	if(req.body.constructor === Object && Object.keys(req.body).length === 0){
		res.status(400).send({ error:true, message: 'Please provide all required field' });
	}else{
		Foto.create(new_foto, function(err, foto) {
			if (err)
				res.send(err);
			res.json({error:false,message:"foto added successfully!",data:foto});
		});
	}
};

exports.findById = function(req, res) {
	Foto.findById(req.params.id, function(err, foto) {
		if (err)
			res.send(err);
		res.json(foto);
	});
};

exports.update = function(req, res) {
	if(req.body.constructor === Object && Object.keys(req.body).length === 0){
		res.status(400).send({ error:true, message: 'Please provide all required field' });
	}else{
		Foto.update(req.params.id, new Foto(req.body), function(err, foto) {
			if (err)
				res.send(err);
			res.json({ error:false, message: 'foto successfully updated' });
		});
	}
};

exports.delete = function(req, res) {
	Foto.delete( req.params.id, function(err, foto) {
		if (err)
			res.send(err);
		res.json({ error:false, message: 'foto successfully deleted' });
	});
};
