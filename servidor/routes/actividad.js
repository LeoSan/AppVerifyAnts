//Importamos la librerias de express
const express = require('express');

const {check} = require('express-validator');

//llamamos al controlador 
const actividadCotroller = require('../controller/actividadCotroller');  // Nueva Parte

//Importamos la Librerias  de Router 
const router  = express.Router();

//Importamos el validador de Token para ejecutar esta tarea 
const auth  = require('../middleware/auth');

//End-Point - Crear Actividad
router.post('/',
        //Paso 2         
        auth, 
        [
            check('nomActi',  'El nombre de la actividad es obligatorio.').not().isEmpty(), //Valida vacio
            check('nomActi',  'El nombre de la actividad debe ser de al menos 6 caracteres.').isLength({min:6}), //Valida minimo 6 caracteres
        ] , 
        actividadCotroller.newActividad
);

//End-Point - Consultar Actividad
router.get('/',
      auth,  
      actividadCotroller.getActividad
);

//End-Point - Editar Actividad
router.put('/', 
      auth,
      actividadCotroller.updateActividad
);

//End-Point - Aliminar Actividad
router.delete('/', 
      auth,
      actividadCotroller.deleteActividad
);

module.exports = router;