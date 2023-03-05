'use strict';
const dbConn = require('../db/db');

const Foto = function (foto) {
    this.ruta = foto.ruta;
    this.idUsuario = foto.idUsuario;
    this.idTarea = foto.idTarea;
};
Foto.create = function (newFoto, result) {
    dbConn.query("INSERT INTO fotos set ?", newFoto, function (err, res) {
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
Foto.findById = function (id, result) {
    dbConn.query("Select * from fotos where idFoto = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};
Foto.findAll = function (result) {
    dbConn.query("Select * from fotos", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
Foto.update = function (id, foto, result) {
    dbConn.query("UPDATE fotos SET ruta=?,idUsuario=?,idTarea=? WHERE idFoto = ?", 
    [foto.ruta, foto.idUsuario, foto.idTarea, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
Foto.delete = function (id, result) {
    dbConn.query("DELETE FROM fotos WHERE idFoto = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
module.exports = Foto;