const Recurrente = require('../models/Recurrente');

const {validationResult} = require('express-validator');

exports.newRecurrente = async(req, res)=>{
    //Mostrar mensaje de error de express-validator 
    const errores  = validationResult(req); 

    if (!errores.isEmpty())  return res.status(400).json({errores: errores.array()});
    
    //Es una forma de validar si esta llegando bien el json -> Externo generado por postman
    console.log(req.body);
    const {nomRecu} = req.body; 

        try {

            // Anexo  Vaidación 
            let  recurrente = await Recurrente.findOne({nomRecu}); 

            if ( recurrente ) return  res.status(400).json({msg: `La categoria recurrente No la puedes repetir, ${nomRecu}`});

            //Creamos Categoria si no esta duplicado 
        recurrente = new Recurrente(req.body);
            await recurrente.save();
            res.json({msj: 'Categoria Recurrente Creada Exitosamente!!'});

        } catch (error) {
            res.json({msj: `Hubo un error en la comunicación !! -> ${error} `});
        }
}