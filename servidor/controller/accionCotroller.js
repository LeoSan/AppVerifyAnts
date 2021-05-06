const Accion = require('../models/Accion');

const {validationResult} = require('express-validator');

exports.newAccion = async(req, res)=>{
    //Mostrar mensaje de error de express-validator 
    const errores  = validationResult(req); 

    if (!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }
    
    //Es una forma de validar si esta llegando bien el json -> Externo generado por postman
    console.log(req.body);
    const {nomAccion} = req.body; 

        try {

            // Anexo  Vaidación 
            let  accion = await Accion.findOne({nomAccion}); 

            if ( accion ){

                return  res.status(400).json({msg: `La accion No la puedes repetir, ${nomAccion}`});

            }

        //Creamos Accion si no esta duplicado 
            accion = new Accion(req.body);
            await accion.save();
            res.json({msj: 'Accion Creada Exitosamente!!'});

        } catch (error) {
            res.json({msj: `Hubo un error en la comunicación !! -> ${error} `});
        }
}