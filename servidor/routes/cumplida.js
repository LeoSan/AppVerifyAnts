//Importamos la librerias de express
const express = require('express');
const {check} = require('express-validator');
const router  = express.Router();
//Controlador 
const cumplidaCotroller = require('../controller/cumplidaCotroller'); 
//Importamos el validador de Token para ejecutar esta tarea 
const auth  = require('../middleware/auth');

//End-Point - Crear Cumplida
router.post('/',
        auth,
        [
            check('cumplida',  'Debes envar true o falso .').not().isEmpty(), 
            check('usuario',   'El Usuario es obligatorio.').not().isEmpty(), 
            check('accion',    'La Accion es obligatorio.').not().isEmpty(), 
            check('duracion',  'La Duración es obligatoria.').not().isEmpty(), 
        ] , 
        cumplidaCotroller.newCumplida 
);

//End-Point - Consultar Cumplida
router.get('/',
      auth, 
      [
            check('usuario',   'El Usuario es obligatorio.').not().isEmpty(), 
            check('accion',    'La Accion es obligatorio.').not().isEmpty(), 
      ] ,        
      cumplidaCotroller.getCumplida
);


//End-Point - Aliminar Cumplida
router.delete('/', 
      auth,
      [
            check('usuario',   'El Usuario es obligatorio.').not().isEmpty(), 
            check('accion',    'La Accion es obligatorio.').not().isEmpty(), 
      ] ,       
      cumplidaCotroller.deleteCumplida
);

module.exports = router;