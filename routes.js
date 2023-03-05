const express = require('express')
const routes = express.Router()

routes.get('/', (req, res)=>
res.json({
     status: 'ok',
     code: 200,
     message: "bienvenido"
    })
)

/* app.put('/prestador/foto', upload ,(req, res) =>{
    console.log(req.file);
}) */


const usuarioControlador = require('./controllers/usuarioController');
const listaMaestraControlador = require('./controllers/listaMaestraController');
const opcionListaMaestraControlador = require('./controllers/opcionListaMaestraController');
//const administradorControlador = require('./controllers/administradorController')
//const canchaControlador = require('./controllers/canchaController')
//const localesControlador = require('./controllers/localController')

// Administrador App
/*routes.route('/administrador')
    .get(administradorControlador.findAll) //lista los administradores
    .post(administradorControlador.create) //registrar un administrador nuevo

routes.route('/administrador/id/:id')
    .get(administradorControlador.findById) //obtener información de un administrador especifíco por id
    .put(administradorControlador.update) //actualizar la información de un administrador especifíco
    .delete(administradorControlador.delete) //cambiar el estado de un admnistrador a inactivo

routes.route('/administrador/email/:email')
    .get(administradorControlador.findByEmail) //obtener información de un administrador especifíco por email

routes.route('/administrador/cambio_contrasenia/:id')
    .put(administradorControlador.updatePass) //actualizar la contraseña de un administrador por id

// Locales_canchas
routes.route('/locales')
    .get(canchaControlador.findAll) //listar todos los locales de canchas
    .post(canchaControlador.create) //registrar un local de cancha

routes.route('/local/id/:id')
    .get(canchaControlador.findById) //obtener la información de un local especifíco
    .put(canchaControlador.update) //actualizar la información de un local especifíco
    .delete(canchaControlador.delete) //cambiar el estado de un local a inactivo

routes.route('/local/id/:id/canchas')
    .get(canchaControlador.findAll) //listar todas las canchas de un local
    .post(canchaControlador.create) //registrar una cancha de un local
   
// Cancha
routes.route('/canchas')
    .get(canchaControlador.findAll) //listar todas las canchas

routes.route('/cancha/id/:id')
    .get(canchaControlador.findById) //obtener información de una cancha especifíca
    .put(canchaControlador.update) //actualizar la información de una cancha especifíca
    .delete(canchaControlador.delete) //cambiar el estado de una cancha a inactiva
*/
// Usuario
routes.route('/usuarios/')
    .get(usuarioControlador.findAll) //listar todos los usuarios del sistema (excepto los administradores)
    .post(usuarioControlador.create) //registrar un usuario (excepto los administradores)

routes.route('/usuario/id/:_id')
    .get(usuarioControlador.findById) //obtener la información de un usuario especifíco por id
    .put(usuarioControlador.update) //actualizar la información de un usuario especifíco
    .delete(usuarioControlador.delete) //cambiar el estado de un usuario a inactivo

routes.route('/usuarios/admin/')
    .get(usuarioControlador.findAllAdmin) //listar todos los usuarios del sistema (excepto los administradores)
    .post(usuarioControlador.createAdmin) //registrar un usuario (excepto los administradores)

routes.route('/usuario/admin/activar/:_id')
    .put(usuarioControlador.activar) //cambiar el estado de un usuario a activo
    

routes.route('/login/')
    .post(usuarioControlador.login) //inicia sesion con telefono o correo
/* 
routes.route('/usuario/tlf/:tlf') 
    .get(usuarioControlador.findByTlf) //obtener la información de un usuario especifíco por telefono

routes.route('/usuario/verificar/:_id')
    .put(usuarioControlador.updateVerificado) //verificar un usuario especifíco (aplica para administradores de cancha y moderadores)

routes.route('/usuario/cambio_contrasenia/:_id')
    .put(usuarioControlador.updatePass) //cambiar la contraseña de un usuario por id

routes.route('/usuario/codigo/:id')
    .put(usuarioControlador.updateCodigo)

routes.route('/usuario/sms/')
    .post(usuarioControlador.sendSMS) */

// Lista maestra
routes.route('/listasMaestra/')
    .get(listaMaestraControlador.findAll) //listar todas las listas maestras
    .post(listaMaestraControlador.create) //registrar una lista maestra

routes.route('/listaMaestra/id/:id')
    .get(listaMaestraControlador.findById) //obtener la información de una lista maestra especifíca por id
    .put(listaMaestraControlador.update) //actualizar la información de una lista maestra especifíca
    .delete(listaMaestraControlador.delete) //cambiar el estado de una lista maestra a inactivo

// Opciones lista maestra
routes.route('/opcionesListaMaestra/:_id')
    .get(opcionListaMaestraControlador.findAll) //listar todas las opciones lista maestra activas y visibles uso general
    .post(opcionListaMaestraControlador.create) //registrar una opcion lista maestra

routes.route('/opcionListaMaestra/id/:_id')
    .get(opcionListaMaestraControlador.findById) //obtener la información de una opcion lista maestra especifíca por id
    .put(opcionListaMaestraControlador.update) //actualizar la información de una opcion lista maestra especifíca
    .delete(opcionListaMaestraControlador.delete) //cambiar el estado de una opcion lista maestra a inactivo

routes.route('/opcionesListaMaestra/admin/:_id')
    .get(opcionListaMaestraControlador.findAllAdmin) //listar todas las opciones lista maestra uso admin
/*    
// Archivo
routes.route('/archivo')
    .get(archivoControlador.findAll)
    .post(archivoControlador.create)

routes.route('/archivo/id/:id')
    .get(archivoControlador.findById)
    .put(archivoControlador.update)
    .delete(archivoControlador.delete)

// Categoria
routes.route('/categoria')
    .get(categoriaControlador.findAll)
    .post(categoriaControlador.create)

routes.route('/categoria/id/:id')
    .get(categoriaControlador.findById)
    .put(categoriaControlador.update)
    .delete(categoriaControlador.delete)

// Foto	
routes.route('/foto')
    .get(fotoControlador.findAll)
    .post(fotoControlador.create)

routes.route('/foto/:id')
    .get(fotoControlador.findById)
    .put(fotoControlador.update)
    .delete(fotoControlador.delete)

// Habilidad	
routes.route('/habilidad')
    .get(habilidadControlador.findAll)
    .post(habilidadControlador.create)

routes.route('/habilidad/id/:id')
    .get(habilidadControlador.findById)
    .put(habilidadControlador.update)
    .delete(habilidadControlador.delete)

// HabilidadesTarea
routes.route('/habilidadest')
    .get(habilidadesTareaControlador.findAll)
    .post(habilidadesTareaControlador.create)

routes.route('/habilidadest/id/:id')
    .get(habilidadesTareaControlador.findById)
    .put(habilidadesTareaControlador.update)
    .delete(habilidadesTareaControlador.delete)

// HabilidadesUsuario
routes.route('/habilidadesu')
    .get(habilidadesUsuarioControlador.findAll)
    .post(habilidadesUsuarioControlador.create)

routes.route('/habilidadesu/id/:id')
    .get(habilidadesUsuarioControlador.findById)
    .put(habilidadesUsuarioControlador.update)
    .delete(habilidadesUsuarioControlador.delete)

// Mensaje
routes.route('/mensaje')
    .get(mensajeControlador.findAll)
    .post(mensajeControlador.create)

routes.route('/mensaje/id/:id')
    .get(mensajeControlador.findById)
    .put(mensajeControlador.update)
    .delete(mensajeControlador.delete) 

// Postulacion
routes.route('/postulacion')
    .get(postulacionControlador.findAll)
    .post(postulacionControlador.create)

routes.route('/postulacion/id/:id')
    .get(postulacionControlador.findById)
    .put(postulacionControlador.update)
    .delete(postulacionControlador.delete) 

// Tarea
routes.route('/tarea')
    .get(tareaControlador.findAll)
    .post(tareaControlador.create)

routes.route('/tarea/id/:id')
    .get(tareaControlador.findById)
    .put(tareaControlador.update)
    .delete(tareaControlador.delete)  */

module.exports = routes