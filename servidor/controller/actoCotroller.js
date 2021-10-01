//Librerias 
const { reponse } = require('express')
const moment = require('moment');
//Modelos 
const Acto = require('../models/Acto');
const Actoregistro = require('../models/Actoregistro');
//Controladores 
const logsCotroller = require('./logsController');

//Crear  Acto 
exports.newActo = async (req, res = reponse) => {
    const { nomActo } = req.body;
    try {
        //Vaidación 
        let acto = await Acto.findOne({ nomActo });
        if (acto) return res.status(200).json({ msg: `La actividad No la puedes repetir, ${nomActo}`, success: false });
        //Creamos Acto si no esta duplicado 
        acto = new Acto(req.body);
        await acto.save();
        res.status(200).json({ msg: `Tu Actividad con nombre ${nomActo},  fue creada Exitosamente!!`, success: true });
    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(200).json({ msg: `Hubo un error en la comunicación !! `, success: false });
    }
}

//Obtener Acto  
exports.getActo = async (req, res = reponse) => {
    //Extraer proyecto 
    try {
        //Distroccion 
        const { nomActo, autor, tipo } = req.body; //->Asi se usa cuando es un objeto 

        if (tipo === "1-M") {
            //Obtener 1-M
            const acto = await Acto.find({ autor }).populate({ path: 'categoria', model: 'Categoria', select: 'nomCate' }).sort({ categoria: -1 });
            res.status(200).json({ acto, success: true });
        } else {
            //Obtener 1.1
            const acto = await Acto.find({ nomActo }).sort({ autor: -1 });
            res.status(200).json({ acto, success: true });
        }
    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(200).json({ msg: `Hubo un error en la comunicación !! `, success: false });
    }
}


//Obtener Acto Check Semanal  
exports.getActoCheckSemanal = async (req, res = reponse) => {
    //Extraer proyecto 
    try {
        //Distroccion 
        const { autor, tipo, semana } = req.body; //->Asi se usa cuando es un objeto 

        if (tipo === "1-M") {
            //Obtener 1-M
            const acto = await Acto.find({ autor }).populate({ path: 'categoria', model: 'Categoria', select: 'nomCate' }).sort({ categoria: -1 });
            let ObjActo = {}
            let index = 0;
            /**INI**/
            //Nota:Recuerda Leonard que cada asyn await son promesas y cuando usas 
            //foreach estas no las captura hay que usarlo de esta manera para poder consultar await iterativos 
            for (const filas of acto){

                ObjActo[index] = {
                    _id: filas._id,
                    activo: filas.activo,
                    registro: filas.registro,
                    nomActo: filas.nomActo,
                    desActo: filas.desActo,
                    categoria: filas.categoria,
                    autor: filas.autor,
                    checkVals: {
                        'lunes': await getActoSemanaDia(autor, filas._id, 'Lunes', semana)
                        , 'martes': await getActoSemanaDia(autor, filas._id, 'martes', semana)
                        , 'miercoles': await getActoSemanaDia(autor, filas._id, 'miercoles', semana)
                        , 'jueves':  await getActoSemanaDia(autor, filas._id, 'jueves', semana)
                        , 'viernes':  await getActoSemanaDia(autor, filas._id, 'viernes', semana)
                        , 'sabado':  await getActoSemanaDia(autor, filas._id, 'sabado', semana)
                    }
                }

                index += 1;

            }
            /**FIN**/

            res.status(200).json({ ObjActo, success: true });
        }
    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(200).json({ msg: `Hubo un error en la comunicación !! ${error}`, success: false });
    }
}

//Eliminar Acto
exports.deleteActo = async (req, res = reponse) => {
    //Extraer informacion del proyecto 
    try {
        //Extraer proyecto y comprobar si existe
        const { id, nomActo } = req.body;// Asi es cuando se pasa un objeto  es decir un json 
        console.log("body", req.body);
        //const {acto} = req.query;// Asi es cuando se pasa parametros 

        //Si la tarea existe o no
        let accionExiste = await Acto.findById(id);

        if (!accionExiste) return res.status(200).json({ msg: `Tu acto con nombre ${nomActo}, No existe en la base de datos.`, success: false });

        //Eliminar Acto 
        await Acto.findByIdAndRemove({ _id: id })
        res.status(200).json({ msg: `Tu acción con nombre ${nomActo}, fue eliminado.`, success: true });

    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(200).json({ msg: `Hubo un error en la comunicación !! `, success: false });
    }
}

//Udadate Acto
exports.updateActo = async (req, res = reponse) => {

    //Extraer informacion para validacion 
    try {
        //Distroccion de Json que se envia 
        const { id, nomActo, desActo, categoria } = req.body;

        //Valido Acto 
        let accionActo = await Acto.findById(id); // Leo : Mucho ojo es la forma de obtener los parametros por post 

        if (!accionActo) return res.status(200).json({ msg: `Tu acto con nombre ${nomActo}, No existe en la base de datos.`, success: false });

        //crear un objeto con la nueva informaciòn 
        const nuevoActo = {}
        nuevoActo.nomActo = nomActo;
        nuevoActo.desActo = desActo;
        nuevoActo.categoria = categoria;

        let nomOld = accionActo.nomActo;

        //Guadar la Accion Editada 
        accionActo = await Acto.findByIdAndUpdate({ _id: id }, nuevoActo, { new: true });
        res.status(200).json({ msg: `Tu acto con nombre ${nomOld}, fue editado.`, success: true });

    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(200).json({ msg: `Hubo un error en la comunicación !! `, success: false });
    }
}

//Obtener Acto fechas Inicio y fin  
exports.getActoBetweenFecha = async (req, res = reponse) => {

    try {
        //Distroccion 
        const { fechaInicio, fechaFin, autor, categoria, activo, tipo } = req.body; //->Asi se usa cuando es un objeto 

        let start = moment().format(fechaInicio);
        let end = moment().format(fechaFin);

        let existeVAl = await Accion.findOne({ autor });

        if (!existeVAl) return res.status(200).json({ msg: `No Existe algun tipo de Acto para este usuario.`, success: false });

        //Consulta entre fechas 
        //Consulta solo por categoria 
        if (tipo === "categoria") {
            const acto = await Acto.find({ "registro": { "$gte": start, "$lt": end }, 'activo': activo, 'autor': autor, 'categoria': categoria }).populate({ path: 'categoria', model: 'Categoria', select: 'nomCate' }).exec();
            res.status(200).json({ acto, success: true });
        }
        //Consulta solo por Usuario
        if (tipo === "usuario") {
            const acto = await Acto.find({ "registro": { "$gte": start, "$lt": end }, 'activo': activo, 'autor': autor }).populate({ path: 'categoria', model: 'Categoria', select: 'nomCate' }).exec();
            res.status(200).json({ acto, success: true });
        }

    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(200).json({ msg: `Hubo un error en la comunicación !! `, success: false });
    }
}

//Obtener Acto fechas Inicio y fin  
exports.actoCheckSemana = async (req, res = reponse) => {

    try {
        //Distroccion 
        const { autor, acto, duracion, nota, dia, semana, checked } = req.body; //->Asi se usa cuando es un objeto 

        try {

            if (checked === false) {

                let objActoregistro = await Actoregistro.find({ 'autor': autor, 'acto': acto, "dia": dia, "semana": semana });
                if (objActoregistro) {
                    await Actoregistro.findByIdAndRemove({ _id: objActoregistro[0].id });//Recuerda que inplementamos un metodo en el modelo 
                    res.status(200).json({ msg: `Tu acto con fue removido de día ${dia} semana ${semana}.`, success: true });
                }

            } else {
                actoregistro = new Actoregistro(req.body);
                await actoregistro.save();
                res.status(200).json({ msg: `Tu Actividad con nota (${nota}), fue creada Exitosamente!!`, success: true });
            }


        } catch (error) {
            logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
            res.status(200).json({ msg: `Hubo un error en la comunicación !! `, success: false });
        }

    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(200).json({ msg: `Hubo un error en la comunicación !! `, success: false });
    }
}

//Obtener Acto por semanas 
exports.getActoSemana = async (req, res = reponse) => {

    try {
        //Distroccion 
        const { autor, semana } = req.body; //->Asi se usa cuando es un objeto 

        let objActoregistro = await Actoregistro.find({ 'autor': autor, 'semana': semana });

        if (!objActoregistro) return res.status(200).json({ msg: `No Existe algun tipo de Acto para este usuario.`, success: false });

        //Consulta 
        res.status(200).json({ objActoregistro, success: true });

    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(200).json({ msg: `Hubo un error en la comunicación !! `, success: false });
    }
}


//Obtener Acto por semanas 
const getActoSemanaDia = async (autor, acto, dia, semana) => {

    try {

        let objActoregistro = await Actoregistro.find({ 'autor': autor, acto: acto, 'dia': dia, 'semana': semana, 'dia': dia, 'semana': semana });
        if ( objActoregistro.length > 0 ) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en el bucle for ActoSemana.js Ln->246 !! -> ${error} `);
        return false;
    }
}


