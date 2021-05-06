const Ingreso = require('../models/Ingreso');

const {validationResult} = require('express-validator');

exports.newIngreso = async(req, res)=>{
    //Mostrar mensaje de error de express-validator 
    const errores  = validationResult(req); 

    if (!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }
    
    //Es una forma de validar si esta llegando bien el json -> Externo generado por postman
    console.log(req.body);
    const {nomIngreso} = req.body; 

        try {

            // Anexo  Vaidación 
            let  ingreso = await Ingreso.findOne({nomIngreso}); 

            if ( ingreso ){

                return  res.status(400).json({msg: `El ingreso No la puedes repetir, ${nomIngreso}`});

            }

        //Creamos Ingreso si no esta duplicado 
        ingreso = new Ingreso(req.body);
            await ingreso.save();
            res.json({msj: 'Creado Exitosamente!!'});

        } catch (error) {
            res.json({msj: `Hubo un error en la comunicación !! -> ${error} `});
        }
}