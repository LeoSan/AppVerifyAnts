//Importamos la librerias de express
const express = require('express');

const {check} = require('express-validator');

//llamamos al controlador 
const usuarioController = require('../controller/usuarioCotroller');  // Nueva Parte

//Importamos la Librerias  de Router 
const router  = express.Router();

//Importamos el validador de Token para ejecutar esta tarea 
const auth  = require('../middleware/auth');

//importamos helper 
const { validaCampos, isUserId } = require('../middleware/helpers');


//End-Point - Crear usuario 
router.post('/',
        [
        check('nomUsu',    'El nombre es obligatorio.').not().isEmpty(), //Nueva Parte 
        check('emailUsu',  'Debes agregar  un email valido.').isEmail(), //Nueva Parte 
        check('password',  'El password debe tener al menos 6 caracteres.').isLength({min:6}), //Nueva Parte 
        isUserId,
        validaCampos
        ], 
        usuarioController.nuevoUsuario 
);

//End-Point - Editar Usuario
router.put('/editar', 
    auth,
    [
        check('emailUsu',  'El correo es obligatorio.').not().isEmpty(), //Valida vacio    
        check('nomUsu',    'El nombre es obligatorio.').not().isEmpty(), //Valida vacio    
        check('apeUsu',    'El apellido es obligatorio.').not().isEmpty(), //Valida vacio    
        validaCampos,
    ],       
    usuarioController.updateUsuario
);

//End-Point - Editar Usuario Cambio de clave -> Desde Home  
router.put('/pass', 
    [
        check('token',     'El identificador es obligatorio.').not().isEmpty(), //Valida vacio    
        check('emailUsu',  'El correo es obligatorio.').not().isEmpty(), //Valida vacio    
        check('password',  'El password es obligatorio.').not().isEmpty(), //Valida vacio    
        check('captcha',   'El Captcha es obligatorio.').not().isEmpty(), //Valida vacio    
        validaCampos,
    ],       
    usuarioController.cambioClaveUsuario
);

//End-Point - Eliminar Usuario
router.post('/delete-user', 
      auth,
      [
        check('id',       'El identificador es obligatorio.').not().isEmpty(), //Valida vacio    
        check('emailUsu',  'El correo es  obligatorio.').not().isEmpty(), //Valida vacio    
        validaCampos
      ],      
      usuarioController.deleteUsuario
);


module.exports = router;