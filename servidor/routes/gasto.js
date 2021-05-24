//Importamos la librerias de express
const express = require('express');
const {check} = require('express-validator');
//Importamos la Librerias  de Router 
const router  = express.Router();
//Controlador 
const gastoCotroller = require('../controller/gastoCotroller');  // Nueva Parte
//Importamos el validador de Token para ejecutar esta tarea 
const auth  = require('../middleware/auth');

//End-Point - Crear Gasto
router.post('/',
        auth,
        [
            check('nomGasto',      'El nombre de la categoria es obligatorio.').not().isEmpty(), //Valida vacio
            check('montoGasto',    'El Monto es obligatorio.').not().isEmpty(), //Valida vacio
            check('usuario',       'El usuario es obligatorio.').not().isEmpty(), //Valida vacio
            check('categoria',     'El Categoria es obligatorio.').not().isEmpty(), //Valida vacio
            check('nomGasto',      'El nombre de la categoria debe ser de al menos 6 caracteres.').isLength({min:6}), //Valida minimo 6 caracteres
        ] , 
        gastoCotroller.newGasto 
);


//End-Point - Consultar Gastos 
router.get('/',
      auth,  
      gastoCotroller.getGastos
);

//End-Point - Consultar Gastos por fecha
router.get('/gastobyfecha',
      auth,  
      [
            check('fechaConsultar', 'El campo fecha es obligatorio.').not().isEmpty(), //Valida vacio
            check('usuario',        'El campo usuario es obligatorio.').not().isEmpty(), //Valida vacio
            check('categoria',      'El campo categoria es obligatorio.').not().isEmpty(), //Valida vacio
            check('activo',         'El campo activo es obligatorio.').not().isEmpty(), //Valida vacio
        ] ,      
      gastoCotroller.getGastosByFecha
);

//End-Point - Consultar Gastos por fecha
router.get('/gastoSumabyfecha',
      auth,  
      [
            check('fechaConsultar', 'El campo fecha es obligatorio.').not().isEmpty(), //Valida vacio
            check('usuario',        'El campo usuario es obligatorio.').not().isEmpty(), //Valida vacio
            check('categoria',      'El campo categoria es obligatorio.').not().isEmpty(), //Valida vacio
            check('activo',         'El campo activo es obligatorio.').not().isEmpty(), //Valida vacio
        ] ,      
      gastoCotroller.getGastoSumaByFecha
);

//End-Point - Editar Gasto
router.put('/', 
      auth,
      gastoCotroller.updateGasto
);

//End-Point - Eliminar Gasto
router.delete('/', 
      auth,
      gastoCotroller.deleteGasto
);

module.exports = router;