const Gasto = require('../models/Gasto');

const {validationResult} = require('express-validator');

exports.newGasto = async(req, res)=>{
    //Mostrar mensaje de error de express-validator 
    const errores  = validationResult(req); 

    if (!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }
    
    //Es una forma de validar si esta llegando bien el json -> Externo generado por postman
    console.log(req.body);
    const {nomGasto} = req.body; 

        try {

            // Anexo  Vaidación 
            let  gasto = await Gasto.findOne({nomGasto}); 

            if ( gasto ){

                return  res.status(400).json({msg: `el gasto No la puedes repetir, ${nomGasto}`});

            }

        //Creamos Gasto si no esta duplicado 
        gasto = new Gasto(req.body);
            await gasto.save();
            res.json({msj: 'Gasto Creada Exitosamente!!'});

        } catch (error) {
            res.json({msj: `Hubo un error en la comunicación !! -> ${error} `});
        }
}