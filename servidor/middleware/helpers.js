const { stringify } = require('querystring');
const fetch = require('node-fetch');
//Controladores 
const logsCotroller = require('../controller/logsController'); 

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
                return 'Fallo captcha verificación.';
            }else{
                return 'ok';
            }            
            
        } catch (error) {
            return `Fallo captcha verification.${error}`;
        }
}

module.exports = {
    validarCaptcha
}