//Importamos la librerias de express
const express = require('express');

const { check } = require('express-validator');

//llamamos al controlador 
const recurrenteCotroller = require('../controller/recurrenteCotroller');  // Nueva Parte

//Importamos la Librerias  de Router 
const router = express.Router();

//Importamos el validador de Token para ejecutar esta tarea 
const auth = require('../middleware/auth');

//importamos helper 
const { validaCampos } = require('../middleware/helpers');

//End-Point - Crear  Recurrente
router.post('/create',
  auth,
  [
    check('nomRecu', 'El nombre de la categoria recurrente es obligatorio.').not().isEmpty(), //Valida vacio
    check('nomRecu', 'El nombre de la categoria recurrente debe ser de al menos 6 caracteres.').isLength({ min: 6 }), //Valida minimo 6 caracteres
    validaCampos
  ],
  recurrenteCotroller.newRecurrente
);

//End-Point - Consultar Recurrente 
router.post('/get-recurrentes',
  auth,
  [
    check('tipo', 'Tipo obligatoria.').not().isEmpty(), //Valida vacio
    validaCampos
  ],
  recurrenteCotroller.getRecurrente
);

//End-Point - Editar Recurrente
router.post('/edit-rec',
  auth,
  [
    check('id', 'El identificador es obligatorio.').not().isEmpty(), //Valida vacio    
    check('nomRecu', 'El nombre de la categoria recurrente es obligatorio.').not().isEmpty(), //Valida vacio    
    validaCampos,
  ],
  recurrenteCotroller.updateRecurrente
);

//End-Point - Eliminar Recurrente
router.post('/del-rec',
  auth,
  [
    check('id', 'El identificador es obligatorio.').not().isEmpty(), //Valida vacio    
    check('nomRecu', 'El nombre de la categoria recurrente es obligatorio.').not().isEmpty(), //Valida vacio    
    validaCampos,
  ],
  recurrenteCotroller.deleteRecurrente
);


module.exports = router;