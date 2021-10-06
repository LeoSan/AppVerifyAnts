//Rutas para autenticar usuarios 
const express = require('express'); 
//Creamos el router
const router = express.Router();
//Importamos nuestro controlador 
const authController = require('../controller/authController');
//llamamos nuestra validaciones en el router
const { check } = require('express-validator');
//Importamos nuestro middleware de auth 
const auth  = require('../middleware/auth');

//importamos helper 
const { validaCampos, notIsUserId } = require('../middleware/helpers');



//obtener un usuario 
//api/auth // midleware 
router.get('/',
    auth,
    authController.usuarioAutenticado
);

// Crea un usuario 
//api/auth // midleware 
router.post('/',
    [
        check('emailUsu',  'Agrega un email valido').isEmail(),
        check('password',  'El password debe ser minimo de 6 caracteres').isLength({min:6}),
        validaCampos
    ], 
    authController.autenticarUsuario
);


//Autenticar Usuario con captcha
//api/auth // midleware 
router.post('/captcha',
    [
        check('emailUsu',  'Agrega un email valido').isEmail(),
        check('password',  'El password debe ser minimo de 6 caracteres').isLength({min:6}),
        check('captcha',   'El sitekey debe ser minimo de 6 caracteres').not().isEmpty(),
        validaCampos,
        notIsUserId
    ], 
    authController.autenticarUsuarioToken
);


//Permitir enviar correo para cambio de clave 
//api/auth // midleware 
router.post('/olvidoClave',
    [
        check('emailUsu',  'Agrega un email valido').isEmail(),
        check('captcha',   'El sitekey debe ser minimo de 6 caracteres').not().isEmpty(),
        validaCampos,
        notIsUserId

    ], 
    authController.olvidoClave
);










module.exports = router;