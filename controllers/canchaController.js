'use strict';
const Cancha = require('../models/canchaModel')

exports.findAll = function(req, res) {
	Cancha.findAll(function(err, cancha) {
		if (err)
			res.send(err);
		res.send(cancha);
	});
};

exports.create = function(req, res) {
	const new_cancha = new Cancha(req.body);
	//handles null error
	if(req.body.constructor === Object && Object.keys(req.body).length === 0){
		res.status(400).send({ error:true, message: 'Please provide all required field' });
	}else{
		Cancha.create(new_cancha, function(err, cancha) {
			if (err)
				res.send(err);
			res.json({error:false,message:"Cancha added successfully!",data:cancha});
		});
	}
};

exports.findById = function(req, res) {
	Cancha.findById(req.params.id, function(err, cancha) {
		if (err)
			res.send(err);
		res.json(cancha);
	});
};

exports.update = function(req, res) {
	if(req.body.constructor === Object && Object.keys(req.body).length === 0){
		res.status(400).send({ error:true, message: 'Please provide all required field' });
	}else{
		Cancha.update(req.params.id, new Cancha(req.body), function(err, cancha) {
			if (err)
				res.send(err);
			res.json({ error:false, message: 'Cancha successfully updated' });
		});
	}
};

exports.delete = function(req, res) {
	Cancha.delete( req.params.id, function(err, cancha) {
		if (err)
			res.send(err);
		res.json({ error:false, message: 'Cancha successfully deleted' });
	});
};
