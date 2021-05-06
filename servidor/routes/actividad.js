//Importamos la librerias de express
const express = require('express');

const {check} = require('express-validator');

//llamamos al controlador 
const actividadCotroller = require('../controller/actividadCotroller');  // Nueva Parte

//Importamos la Librerias  de Router 
const router  = express.Router();

//End-Point - Crear Categoria Recurrente
router.post('/',[
    check('nomActi',  'El nombre de la actividad es obligatorio.').not().isEmpty(), //Valida vacio
    check('nomActi',  'El nombre de la actividad debe ser de al menos 6 caracteres.').isLength({min:6}), //Valida minimo 6 caracteres
] , 
actividadCotroller.newActividad
);

module.exports = router;