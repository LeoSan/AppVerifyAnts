//Importamos la librerias de express
const express = require('express');

const {check} = require('express-validator');

//llamamos al controlador 
const recurrenteCotroller = require('../controller/recurrenteCotroller');  // Nueva Parte

//Importamos la Librerias  de Router 
const router  = express.Router();

//Importamos el validador de Token para ejecutar esta tarea 
const auth  = require('../middleware/auth');


//End-Point - Crear Categoria Recurrente
router.post('/',
        auth,
        [
            check('nomRecu',  'El nombre de la categoria recurrente es obligatorio.').not().isEmpty(), //Valida vacio
            check('nomRecu',  'El nombre de la categoria recurrente debe ser de al menos 6 caracteres.').isLength({min:6}), //Valida minimo 6 caracteres
        ] , 
        recurrenteCotroller.newRecurrente 
);

//End-Point - Consultar Recurrente 
router.get('/',
      auth,  
      recurrenteCotroller.getRecurrente
);

//End-Point - Editar Recurrente
router.put('/', 
      auth,
    [
        check('id',       'El identificador es obligatorio.').not().isEmpty(), //Valida vacio    
        check('nomRecu',  'El nombre de la categoria recurrente es obligatorio.').not().isEmpty(), //Valida vacio    
    ],       
    recurrenteCotroller.updateRecurrente
);

//End-Point - Eliminar Recurrente
router.delete('/', 
      auth,
      [
        check('id',       'El identificador es obligatorio.').not().isEmpty(), //Valida vacio    
        check('nomRecu',  'El nombre de la categoria recurrente es obligatorio.').not().isEmpty(), //Valida vacio    
      ],      
      recurrenteCotroller.deleteRecurrente
);


module.exports = router;