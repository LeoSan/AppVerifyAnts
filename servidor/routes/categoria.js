//Importamos la librerias de express
const express = require('express');
const {check} = require('express-validator');
//Importamos la Librerias  de Router 
const router  = express.Router();
//Controlador 
const categoriaCotroller = require('../controller/categoriaCotroller');  // Nueva Parte
//Importamos el validador de Token para ejecutar esta tarea 
const auth  = require('../middleware/auth');

//End-Point - Crear Categorias
router.post('/',
        auth, 
        [
            check('nomCate',  'El nombre de la categoria es obligatorio.').not().isEmpty(), //Valida vacio
            check('autor',    'El Autor es obligatorio.').not().isEmpty(), //Valida vacio
            check('nomCate',  'El nombre de la categoria debe ser de al menos 6 caracteres.').isLength({min:6}), //Valida minimo 6 caracteres
        ] , 
        categoriaCotroller.newCategoria 
);


//End-Point - Consultar Categoria
router.post('/get-cat',
      auth,  
      categoriaCotroller.getCategoria
);


//End-Point - Editar Categoria
router.post('/edit-cat', 
      auth,
      categoriaCotroller.updateCategoria
);

//End-Point - Aliminar Categoria
router.post('/del-cat', 
      auth,
      categoriaCotroller.deleteCategoria
);

module.exports = router;