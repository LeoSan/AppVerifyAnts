//Librerias 
const {validationResult} = require('express-validator');
const moment             = require('moment');  
const { response,  request } = require('express');
//Modelos 
const Cumplida           = require('../models/Cumplida');
//Controladores 
const logsCotroller       = require('./logsController'); 

require('dotenv').config({ path :'./config/variables.env'});

//Crear  Cumplida 
exports.newCumplida = async(req = response, res = request)=>{
    //Mostrar mensaje de error de express-validator 
    const errores  = validationResult(req); 

    if (!errores.isEmpty()){
        return res.status(process.env.SFALLA).json({errores: errores.array()});
    }
    
    //Es una forma de validar si esta llegando bien el json -> Externo generado por postman
    // console.log(req.body);
    const {cumplida, usuario, accion, duracion, registro} = req.body; 

        try {
            //Vaidación 
            let  cumplida = await Cumplida.findOne({accion, registro, duracion}); 
            if ( cumplida ) return  res.status(process.env.SFALLA).json({msg: `Ya evaluaste esta acción`});            
        //Creamos cumplida si no esta duplicado 
            cumplida = new Cumplida(req.body);
            await cumplida.save();
            res.status(process.env.SCREATE).json({msg: 'Tu evaluación fue aceptada!!'});
        } catch (error) {
            logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
            res.status(process.env.SERROR).json({msg: `Hubo un error en la comunicación !! `});
        }
}

//Obtener Cumplida  
exports.getCumplida = async (req = response, res = request) =>{
    //Extraer proyecto 
    try {
        //Distroccion 
        const { accion, usuario } = req.body; //->Asi se usa cuando es un objeto 
        
        let existeVAl = await Cumplida.findOne({ accion, usuario }); 

        if(!existeVAl)return res.status(process.env.SFALLA).json({msg:`Tu evaluación no esta para este caso.`});

        //Verificar el usuario
        if (existeVAl.usuario.toString() !== usuario ){
            return res.status(process.env.SFALLA).json({msg:'No autorizado'});
        }

        //Obtener
        const cumplida = await Cumplida.find({ _id:existeVAl._id });
        res.status(process.env.SOK).json({ cumplida });

    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(process.env.SERROR).json({msg: `Hubo un error en la comunicación !! `});
    }
}

//Eliminar Cumplida
exports.deleteCumplida = async (req = response, res = request)=>{
    //Extraer informacion del proyecto 
    try {
          //Extraer proyecto y comprobar si existe
          const { accion, usuario } = req.body; //->Asi se usa cuando es un objeto 
          //const {accion} = req.query;// Asi es cuando se pasa parametros 
  
          //Si la tarea existe o no
          let accionExiste = await Cumplida.findById({ accion, usuario }); // Leo : Mucho ojo es la forma de obtener los parametros por post 
  
          if (!accionExiste) return res.status(process.env.SFALLA).json({msg:`No existe en la base de datos.`});
          
          //Eliminar Cumplida 
          await Cumplida.findByIdAndRemove({ _id:accionExiste._id })
          res.status(process.env.SDELETE).json({msg:`Tu evaluación fue eliminada.`});
       
    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(process.env.SERROR).json({msg: `Hubo un error en la comunicación !! `});
    }
}