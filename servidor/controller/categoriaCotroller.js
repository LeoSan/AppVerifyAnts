const Categoria = require('../models/Categoria');

const {validationResult} = require('express-validator');

exports.newCategoria = async(req, res)=>{
    //Mostrar mensaje de error de express-validator 
    const errores  = validationResult(req); 

    if (!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }
    
    //Es una forma de validar si esta llegando bien el json -> Externo generado por postman
    console.log(req.body);
    const {nomCate} = req.body; 

        try {

            // Anexo  Vaidación 
            let  categoria = await Categoria.findOne({nomCate}); 

            if ( categoria ){

                return  res.status(400).json({msg: `La categoria No la puedes repetir, ${nomCate}`});

            }

        //Creamos Categoria si no esta duplicado 
            categoria = new Categoria(req.body);
            await categoria.save();
            res.json({msj: 'Categoria Creada Exitosamente!!'});

        } catch (error) {
            res.json({msj: `Hubo un error en la comunicación !! -> ${error} `});
        }
}