const { stringify } = require('querystring');
const fetch         = require('node-fetch');
//Controladores 
const logsCotroller = require('../controller/logsController'); 

//Modelos 
const Usuario = require('../models/Usuario');
const Acto = require('../models/Acto');

//importo librerias 
const { validationResult }  = require('express-validator');

const validarCaptcha = async (req)=>{
        //Revisar si envio captcha
        if (!req.body.captcha)
            return ('Por favor seleccionar el captcha.');
    
        // Secret key - De  mi cuenta Google 
        const secretKey = '6LdxEHIUAAAAAKaXkVCS8lF-yW2LXHAU3Z-BqW4V';

        // Verify URL
        const query = stringify({
            secret: secretKey,
            response: req.body.captcha,
            remoteip: req.connection.remoteAddress
        });
        
        const verifyURL = `https://google.com/recaptcha/api/siteverify?${query}`;
        try {

            // Make a request to verifyURL
            const result = await fetch(verifyURL).then(res => res.json());
           // console.log("Result capthaback desde helper",result);
            // If not successful
            if (result.success !== undefined && !result.success){
                logsCotroller.logsCRUD(`Resultado captcha !! -> ${ result.success } `);
                return 'Fallo recaptcha verificación.';
            }else{
                return 'ok';
            }            
            
        } catch (error) {
            return `Fallo captcha verification.${error}`;
        }
}

const validaCampos = (req, res, next )=>{

    const errors = validationResult(req);
    if ( !errors.isEmpty() ){
        console.log(errors);
        return res.status(200).json({msg:"Hubo un error de parametros!", success:false, listErrors:errors}); // bad request  
    }
    next();

}

const isUserId = async(req, res, next)=>{
    const { emailUsu } = req.body;
    const existeEmail = await Usuario.findOne({emailUsu}); 
    if (existeEmail){
        return res.status(200).json({msg:`Este usuario ya esta registrado con el correo ${emailUsu}!`, success:false}); // bad request  
        //throw new Error(`Este usuario ya esta registrado con el correo ${emailUsu}!`)
    }
    next();

}

const notIsUserId = async(req, res, next)=>{
    const { emailUsu } = req.body;
    const existeEmail = await Usuario.findOne({emailUsu}); 
    if (!existeEmail){
        return res.status(200).json({msg:`Este usuario con el correo  ${emailUsu}, No esta registrado!`, success:false}); // bad request  
    }
    next();

}

const validarActo = async(req, res, next)=>{
    const existeVal = await Acto.findOne({ autor:req }); 
    //Verificar el autor  
    if (!existeVal) return res.status(200).json({msg:'No autorizado', success:false});
}

module.exports = {
    validarActo,
    validarCaptcha,
    validaCampos,
    isUserId,
    notIsUserId,
    
}