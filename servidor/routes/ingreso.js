//Importamos la librerias de express
const express = require('express');

const {check} = require('express-validator');

//llamamos al controlador 
const ingresoCotroller = require('../controller/ingresoCotroller');  // Nueva Parte

//Importamos la Librerias  de Router 
const router  = express.Router();

//Importamos el validador de Token para ejecutar esta tarea 
const auth  = require('../middleware/auth');


//End-Point - Crear Categorias
router.post('/',
        auth,
        [
            check('nomIngreso',   'El nombre de la categoria es obligatorio.').not().isEmpty(), //Valida vacio
            check('montoIngreso', 'El Monto es obligatorio.').not().isEmpty(), //Valida vacio
            check('usuario',      'El usuario es obligatorio.').not().isEmpty(), //Valida vacio
            check('categoria',    'El Categoria es obligatorio.').not().isEmpty(), //Valida vacio
            check('nomIngreso',   'El nombre de la categoria debe ser de al menos 6 caracteres.').isLength({min:6}), //Valida minimo 6 caracteres
        ] , 
        ingresoCotroller.newIngreso
);

module.exports = router;