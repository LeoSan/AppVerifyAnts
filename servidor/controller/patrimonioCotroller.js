const Patrimonio = require('../models/Patrimonio');

const {validationResult} = require('express-validator');

exports.newPatrimonio = async(req, res)=>{
    //Mostrar mensaje de error de express-validator 
    const errores  = validationResult(req); 

    if (!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }
    
    //Es una forma de validar si esta llegando bien el json -> Externo generado por postman
    console.log(req.body);
    const { nomPatrimonio } = req.body; 

        try {

            // Anexo  Vaidación 
            let  patrimonio = await Patrimonio.findOne({nomPatrimonio}); 

            if ( patrimonio ){

                return  res.status(400).json({msg: `El patrimonio No la puedes repetir, ${nomPatrimonio}`});

            }

        //Creamos patrimonio si no esta duplicado 
        patrimonio = new Patrimonio(req.body);
            await patrimonio.save();
            res.json({msj: 'Creado Exitosamente!!'});

        } catch (error) {
            res.json({msj: `Hubo un error en la comunicación !! -> ${error} `});
        }
}