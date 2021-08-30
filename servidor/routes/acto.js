//Importamos la librerias de express
const express = require('express');
const {check} = require('express-validator');
const router  = express.Router();
//Controlador 
const actoCotroller = require('../controller/actoCotroller'); 
//Importamos el validador de Token para ejecutar esta tarea 
const auth  = require('../middleware/auth');

//importamos helper 
const { validaCampos } = require('../middleware/helpers');


//End-Point - Crear Acto 
router.post('/create-acto',
        auth,
        [
            check('nomActo',    'El nombre de la categoria es obligatorio.').not().isEmpty(), 
            check('desActo',    'El nombre de la categoria es obligatorio.').not().isEmpty(), 
            check('autor',      'El Autor es obligatorio.').not().isEmpty(), 
            check('categoria',  'La Categoria es obligatorio.').not().isEmpty(), 
            check('nomActo',    'El nombre de la categoria debe ser de al menos 6 caracteres.').isLength({min:6}), //Valida minimo 6 caracteres
            validaCampos
        ] , 
        actoCotroller.newActo 
);

//End-Point - Consultar Acto 
/*
router.get('/get-acto',
      auth,  
      actoCotroller.getAccion
);
*/

//End-Point - Consultar Acto  por fecha 
/*router.get('/a-between-fecha',
      auth,  
      [
            check('fechaInicio',     'El campo fecha Inicio es obligatorio.').not().isEmpty(), //Valida vacio
            check('fechaFin',        'El campo fecha Fin es obligatorio.').not().isEmpty(), //Valida vacio
            check('activo',          'El campo activo es obligatorio.').not().isEmpty(), //Valida vacio
            check('tipo',            'El campo tipo es obligatorio.').not().isEmpty(), //Valida vacio
      ] ,      
      actoCotroller.getAccionBetweenFecha
);
*/

//End-Point - Editar Acto
/*
router.put('/edit-acto', 
      auth,
      actoCotroller.updateAccion
);
*/
//End-Point - Eliminar Acto

/*router.delete('/del-acto', 
      auth,
      actoCotroller.deleteAccion
);
*/
module.exports = router;