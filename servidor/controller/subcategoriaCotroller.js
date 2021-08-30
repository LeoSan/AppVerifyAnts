//Librerias
const { validationResult } = require('express-validator');
//Modelos 
const Subcategoria = require('../models/Subcategoria');
//Controladores 
const logsCotroller = require('./logsController');

//Crear SubCategoria  
exports.createSubcategoria = async (req, res) => {

    //Es una forma de validar si esta llegando bien el json -> Externo generado por postman
    // console.log(req.body);
    const { nomCate } = req.body;

    try {
        // Anexo  Vaidación 
        let subcategoria = await Subcategoria.findOne({ nomCate });

        if (subcategoria) return res.status(200).json({ msg: `La Subcategoria No la puedes repetir, ${nomCate}`, success: false });

        //Creamos Categoria si no esta duplicado 
        subcategoria = new Subcategoria(req.body);
        await subcategoria.save();
        res.status(201).json({ msg: `¡ Tu Subcategoria  "${nomCate}", fue creada exitosamente !`, success: true });

    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(200).json({ msg: `Hubo un error en la comunicación !! -> ${error} `, success: false });
    }
}

//Obtener SubCategoria  
exports.getSubcategoria = async (req, res) => {

    //Extraer proyecto 
    try {
        //Distroccion 
        const { nomCate, autor, activo, tipo, categoria } = req.body; //->Asi se usa cuando es un objeto 


        if (tipo == "1-M-A") {// Uno a muchos por autor 
            //Obtener 1-M
            let existeVAl = await Subcategoria.findOne({ autor });

            if (!existeVAl) return res.status(200).json({ msg: `No Existe categorias para este usuario.`, success: false });

            const subcategoria = await Subcategoria.find({ $and: [{ autor: autor }, { activo: activo }] }).populate({ path: 'categoria', model: 'Categoria', select: 'nomCate' }).sort({ nomCate: -1 });
            res.status(200).json({ subcategoria, success: true });

        }
        if (tipo == "1-M-AC") {// Uno a muchos por Auto y Categoria
            //Obtener 1-M
            let existeVAl = await Subcategoria.findOne({ autor, categoria });

            if (!existeVAl) return res.status(200).json({ msg: `No Existe categorias para este usuario.`, success: false });

            const subcategoria = await Subcategoria.find({ $and: [{ autor: autor }, { activo: activo }] }).populate({ path: 'actividad', model: 'Actividad', select: 'nomActi' }).sort({ nomCate: -1 });
            res.status(200).json({ subcategoria, success: true });

        }
        if (tipo == "1-1") {//Buscar por nombre 
            //Obtener 1.1
            let existeVAl = await Subcategoria.findOne({ nomCate });

            if (!existeVAl) return res.status(200).json({ msg: `Tu categoria con nombre ${nomCate}, No existe en la base de datos.`, success: false });

            const subcategoria = await Subcategoria.find({ nomCate }).populate({ path: 'actividad', model: 'Actividad', select: 'nomActi' });
            res.status(200).json({ subcategoria, success: true });
        }


    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        //res.status(500).send('Hubo un error');
        res.status(200).json({ msj: `Hubo un  error  en  la comunicación !!  `, success: false });
    }
}

//Delete Categoria
exports.deleteSubCategoria = async (req, res) => {

    //Extraer informacion del proyecto 
    try {
        const { id, nomCate } = req.body;// Asi es cuando se pasa un objeto  es decir un json 
        //Valido Categoria 
        let valExiste = await Subcategoria.findById(id); // Leo : Mucho ojo es la forma de obtener los parametros por post 

        if (!valExiste) return res.status(200).json({ msg: `Tu Categoria con nombre ${nomCate}, No existe en la base de datos.`, success: false });

        //Eliminar Categoria 
        await Subcategoria.findByIdAndRemove({ _id: id })
        res.status(200).json({ msg: `Tu Categoria con nombre ${nomCate}, fue eliminado.`, success: true });

    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(200).json({ msg: `Hubo un  error  en  la comunicación !!  `, success: false });
    }
}

//Udadate Subcategoria 
exports.updateSubCategoria = async (req, res) => {

    //Extraer informacion para validacion 
    try {
        //Distroccion de Json que se envia 
        const { id, nomCate, desCate, categoria } = req.body;
        //Valido Subcategoria 
        let valExiste = await Subcategoria.findById(id); // Leo : Mucho ojo es la forma de obtener los parametros por post 

        if (!valExiste) return res.status(200).json({ msg: `Tu Subcategoria con nombre ${nomCate}, No existe en la base de datos.`, success: false });

        //crear un objeto con la nueva informaciòn 
        const newObj = {}
        newObj.nomCate = nomCate;
        newObj.desCate = desCate;
        newObj.categoria = categoria;

        let nomOld = valExiste.nomCate;

        //Guadar Edicción 
        valExiste = await Subcategoria.findByIdAndUpdate({ _id: id }, newObj, { new: true });
        res.status(200).json({ msg: `Tu Subcategoria con nombre ${nomOld}, fue editada.`, success: true });

    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        //res.status(500).send("Error en el servidor");
        res.status(200).json({ msg: `Hubo un  error  en  la comunicación !!  `, success: false });
    }
}
