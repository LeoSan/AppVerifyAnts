//Importamos la librerias de express
const express = require('express');

const {check} = require('express-validator');

//llamamos al controlador 
const usuarioController = require('../controller/usuarioCotroller');  // Nueva Parte

//Importamos la Librerias  de Router 
const router  = express.Router();

//Importamos el validador de Token para ejecutar esta tarea 
const auth  = require('../middleware/auth');

//End-Point - Crear usuario 
router.post('/',
        [
        check('nomUsu',    'El nombre es obligatorio.').not().isEmpty(), //Nueva Parte 
        check('emailUsu',  'Debes agregar  un email valido.').isEmail(), //Nueva Parte 
        check('password',  'El password debe ser de al menos 6 caracteres.').isLength({min:6}), //Nueva Parte 
        ] , 
        usuarioController.nuevoUsuario 
);

module.exports = router;