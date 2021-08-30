//Librerias 
const {validationResult} = require('express-validator');
const moment = require('moment');  
//Modelos 
const Acto = require('../models/Acto');
//Controladores 
const logsCotroller = require('./logsController'); 

require('dotenv').config({ path :'./config/variables.env'});

//Crear  Accion 
exports.newActo = async(req, res)=>{
    const {nomActo} = req.body; 
    try {
        //Vaidación 
        let  acto = await Acto.findOne({nomActo}); 
        if ( acto ) return  res.status(200).json({msg: `La actividad No la puedes repetir, ${nomActo}`, success:false});            
    //Creamos Acto si no esta duplicado 
        acto = new Acto(req.body);
        await acto.save();
        res.status(200).json({msg: `Tu Actividad con nombre ${nomActo},  fue creada Exitosamente!!`, success:true});
    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(200).json({msg: `Hubo un error en la comunicación !! `, success:false});
    }
}

