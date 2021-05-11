//Importamos la librerias de express
const express = require('express');

const {check} = require('express-validator');

//llamamos al controlador 
const patrimonioCotroller = require('../controller/patrimonioCotroller');  // Nueva Parte

//Importamos la Librerias  de Router 
const router  = express.Router();

//Importamos el validador de Token para ejecutar esta tarea 
const auth  = require('../middleware/auth');

//End-Point - Crear Patrimonio
router.post('/',
        auth,
        [
            check('nomPatrimonio',   'El nombre del patrimonio es obligatorio.').not().isEmpty(), //Valida vacio
            check('montoPatrimonio', 'El Monto es obligatorio.').not().isEmpty(), //Valida vacio
            check('usuario',         'El usuario es obligatorio.').not().isEmpty(), //Valida vacio
            check('categoria',       'La Categoria es obligatorio.').not().isEmpty(), //Valida vacio
            check('nomPatrimonio',   'El nombre de la categoria debe ser de al menos 6 caracteres.').isLength({min:6}), //Valida minimo 6 caracteres
        ] , 
        patrimonioCotroller.newPatrimonio
);

//End-Point - Consultar Patrimonio 
router.get('/',
      auth,  
      patrimonioCotroller.getPatrimonio
);

//End-Point - Editar Patrimonio
router.put('/', 
      auth,
    [
        check('nomPatrimonio',   'El nombre del patrimonio es obligatorio.').not().isEmpty(), //Valida vacio
        check('montoPatrimonio', 'El Monto es obligatorio.').not().isEmpty(), //Valida vacio
        check('idCategoria',       'La Categoria es obligatorio.').not().isEmpty(), //Valida vacio
        check('nomPatrimonio',   'El nombre de la categoria debe ser de al menos 6 caracteres.').isLength({min:6}), //Valida minimo 6 caracteres
    ],       
      patrimonioCotroller.updatePatrimonio
);

//End-Point - Eliminar Patrimonio
router.delete('/', 
      auth,
      patrimonioCotroller.deletePatrimonio
);


module.exports = router;