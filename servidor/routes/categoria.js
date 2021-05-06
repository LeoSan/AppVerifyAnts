//Importamos la librerias de express
const express = require('express');

const {check} = require('express-validator');

//llamamos al controlador 
const categoriaCotroller = require('../controller/categoriaCotroller');  // Nueva Parte

//Importamos la Librerias  de Router 
const router  = express.Router();

//End-Point - Crear Categorias
router.post('/',[
    check('nomCate',  'El nombre de la categoria es obligatorio.').not().isEmpty(), //Valida vacio
    check('autor',    'El Autor es obligatorio.').not().isEmpty(), //Valida vacio
    check('nomCate',  'El nombre de la categoria debe ser de al menos 6 caracteres.').isLength({min:6}), //Valida minimo 6 caracteres
] , 
categoriaCotroller.newCategoria 
);

module.exports = router;