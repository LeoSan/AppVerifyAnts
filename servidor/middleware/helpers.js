const { stringify } = require('querystring');
const fetch = require('node-fetch');
//Controladores 
const logsCotroller = require('../controller/logsController'); 

const validarCaptcha = async (req)=>{
        /* Inicio  captcha */
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

        const promesa = new Promise( (resolve, reject)=>{
            //Cuerpo de la promesa
             // Make a request to verifyURL
             const result =  fetch(verifyURL).then(res => res.json());
    
            if (result.success === true ){ 
                resolve(true);
            }else{
                reject( false );
            }
    
        } );

        return promesa;
        /* Fin  captcha */

}

module.exports = {
    validarCaptcha
}