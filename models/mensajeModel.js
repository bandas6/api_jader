'use strict';
const dbConn = require('../db/db');

const Mensaje = function (mensaje) {
    this.mensaje = mensaje.mensaje;
    this.tipoMensaje = mensaje.tipoMensaje;
    this.fecha = mensaje.fecha;
    this.hora = mensaje.hora;
    this.estado = mensaje.estado;
    this.idTarea = mensaje.idTarea;
    this.idUsarioCrea = mensaje.idUsarioCrea;
    this.idUsuarioRealiza = mensaje.idUsuarioRealiza;
};
Mensaje.create = function (newMensaje, result) {
    dbConn.query("INSERT INTO mensajes set ?", newMensaje, function (err, res) {
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
Mensaje.findById = function (id, result) {
    dbConn.query("Select * from mensajes where idMensaje = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};
Mensaje.findAll = function (result) {
    dbConn.query("Select * from mensajes", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
Mensaje.update = function (id, usuario, result) {
    dbConn.query("UPDATE mensajes SET mensaje=?,tipoMensaje=?,fecha=?,hora=?,estado=?,idTarea=?,idUsarioCrea=?,idUsuarioRealiza=? WHERE idMensaje = ?", 
    [mensaje.mensaje, mensaje.tipoMensaje, mensaje.fecha, mensaje.hora, mensaje.estado, mensaje.idTarea, mensaje.idUsarioCrea, mensaje.idUsuarioRealiza, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
Mensaje.delete = function (id, result) {
    dbConn.query("DELETE FROM mensajes WHERE idMensaje = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
module.exports = Mensaje;