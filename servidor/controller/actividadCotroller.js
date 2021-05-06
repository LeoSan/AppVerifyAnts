const Actividad = require('../models/Actividad');
const bcrypt = require('bcrypt');

const {validationResult} = require('express-validator');

exports.newActividad = async(req, res)=>{
    //Mostrar mensaje de error de express-validator 
    const errores  = validationResult(req); 

    if (!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }
    
    //Es una forma de validar si esta llegando bien el json -> Externo generado por postman
    console.log(req.body);
    const {nomActi} = req.body; 

        try {

            // Anexo  Vaidación 
            let  actividad = await Actividad.findOne({nomActi}); 

            if ( actividad ){

                return  res.status(400).json({msg: `La actividad  ${nomActi} ya esta registrado`});

            }

        //Creamos usuario si no esta duplicado 
        actividad = new Actividad(req.body);

            await actividad.save();

            res.json({msj: 'Actividad Creada Exitosamente!!'});

        } catch (error) {
            res.json({msj: `Hubo un  error  en  la comunicación !! -> ${error} `});
        }
}