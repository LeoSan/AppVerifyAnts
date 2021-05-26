//Importamos la librerias de express
const express = require('express');
const {check} = require('express-validator');
const router  = express.Router();
//Controlador 
const accionCotroller = require('../controller/accionCotroller'); 
//Importamos el validador de Token para ejecutar esta tarea 
const auth  = require('../middleware/auth');

//End-Point - Crear Acccion
router.post('/',
        auth,
        [
            check('nomAccion',  'El nombre de la categoria es obligatorio.').not().isEmpty(), 
            check('autor',      'El Autor es obligatorio.').not().isEmpty(), 
            check('categoria',  'La Categoria es obligatorio.').not().isEmpty(), 
            check('nomAccion',  'El nombre de la categoria debe ser de al menos 6 caracteres.').isLength({min:6}), //Valida minimo 6 caracteres
        ] , 
        accionCotroller.newAccion 
);

//End-Point - Consultar Acccion
router.get('/',
      auth,  
      accionCotroller.getAccion
);


//End-Point - Consultar Accion  por fecha 
router.get('/a-between-fecha',
      auth,  
      [
            check('fechaInicio',     'El campo fecha Inicio es obligatorio.').not().isEmpty(), //Valida vacio
            check('fechaFin',        'El campo fecha Fin es obligatorio.').not().isEmpty(), //Valida vacio
            check('activo',          'El campo activo es obligatorio.').not().isEmpty(), //Valida vacio
            check('tipo',            'El campo tipo es obligatorio.').not().isEmpty(), //Valida vacio
      ] ,      
      accionCotroller.getAccionBetweenFecha
);


//End-Point - Editar Acccion
router.put('/', 
      auth,
      accionCotroller.updateAccion
);

//End-Point - Aliminar Acccion
router.delete('/', 
      auth,
      accionCotroller.deleteAccion
);

module.exports = router;