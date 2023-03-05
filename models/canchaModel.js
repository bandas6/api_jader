'use strict';
const dbConn = require('../db/db');

const Cancha = function (cancha) {
    this.id_local = cancha.id_local;
    this.id_tamano = cancha.id_tamano;
    this.id_tipo_juego = cancha.id_tipo_juego;
    this.id_tipo_cancha = cancha.id_tipo_cancha;
};
Cancha.create = function (newCancha, result) {
    dbConn.query("INSERT INTO `cancha` set ?", newCancha, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
Cancha.findById = function (id, result) {
    dbConn.query("Select * from `cancha` where idCancha	 = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};
Cancha.findAll = function (result) {
    dbConn.query("Select * from `cancha`", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
    
Cancha.update = function (id, categoria, result) {
    dbConn.query("UPDATE `cancha` SET nombre=?, telefono=?, email=?, direccion=?, cubierta=? WHERE idCancha = ?", 
    [cancha.nombre,cancha.telefono,cancha.email,cancha.direccion,cancha.cubierta, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
Cancha.delete = function (id, result) {
    dbConn.query("DELETE FROM `cancha` WHERE idCancha = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
module.exports = Cancha;