//Importamos la librerias de express
const express = require('express');

const {check} = require('express-validator');

//llamamos al controlador 
const patrimonioCotroller = require('../controller/patrimonioCotroller');  // Nueva Parte

//Importamos la Librerias  de Router 
const router  = express.Router();

//End-Point - Crear Categorias
router.post('/',[
    check('nomPatrimonio',   'El nombre del patrimonio es obligatorio.').not().isEmpty(), //Valida vacio
    check('montoPatrimonio', 'El Monto es obligatorio.').not().isEmpty(), //Valida vacio
    check('usuario',         'El usuario es obligatorio.').not().isEmpty(), //Valida vacio
    check('categoria',       'La Categoria es obligatorio.').not().isEmpty(), //Valida vacio
    check('nomPatrimonio',   'El nombre de la categoria debe ser de al menos 6 caracteres.').isLength({min:6}), //Valida minimo 6 caracteres
] , 
patrimonioCotroller.newPatrimonio
);

module.exports = router;