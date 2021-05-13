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