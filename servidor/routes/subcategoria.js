//Importamos la librerias de express
const express = require('express');
const { check } = require('express-validator');
//Importamos la Librerias  de Router 
const router = express.Router();
//Controlador 
const subcategoriaCotroller = require('../controller/subcategoriaCotroller');  // Nueva Parte
//Importamos el validador de Token para ejecutar esta tarea 
const auth = require('../middleware/auth');

//importamos helper 
const { validaCampos } = require('../middleware/helpers');

//End-Point - Crear Categorias
router.post('/create',
      auth,
      [
            check('categoria', 'Debes Seleccionar una categoria.').not().isEmpty(), //Valida vacio
            check('nomCate', 'El nombre de la subcategoria es obligatorio.').not().isEmpty(), //Valida vacio
            check('autor', 'El Autor es obligatorio.').not().isEmpty(), //Valida vacio
            check('nomCate', 'El nombre de la categoria debe ser de al menos 6 caracteres.').isLength({ min: 6 }), //Valida minimo 6 caracteres
            validaCampos
      ],
      subcategoriaCotroller.createSubcategoria
);

//End-Point - Consultar Subcategoria
router.post('/get-subcat',
      auth,
      [
            check('tipo', 'Debes indicar que tipo de consulta deseas.').not().isEmpty(), //Valida vacio
            check('nomCate', 'El nombre de la subcategoria es obligatorio.').not().isEmpty(), //Valida vacio
            check('autor', 'El Autor es obligatorio.').not().isEmpty(), //Valida vacio
            check('nomCate', 'El nombre de la categoria debe ser de al menos 6 caracteres.').isLength({ min: 6 }), //Valida minimo 6 caracteres
            validaCampos
      ],
      subcategoriaCotroller.getSubcategoria
);

//End-Point - Editar SubCategoria
router.post('/edit-subcat',
      auth,
      [
            check('id', 'La clave PK es obligatoria.').not().isEmpty(), //Valida vacio
            check('categoria', 'La categoria es obligatoria.').not().isEmpty(), //Valida vacio
            validaCampos
      ],
      subcategoriaCotroller.updateSubCategoria
);


//End-Point - Eliminar SubCategoria
router.post('/del-subcat',
      auth,
      [
            check('id', 'Debes indicar que tipo de consulta deseas.').not().isEmpty(), //Valida vacio
            check('nomCate', 'El nombre de la subcategoria es obligatorio.').not().isEmpty(), //Valida vacio
            validaCampos
      ],
      subcategoriaCotroller.deleteSubCategoria
);

module.exports = router;