//Librerias 
const bcryptjs             = require('bcrypt');
const jwt                  = require('jsonwebtoken');
const { response,  request } = require('express');
//Modelos 
const Usuario              = require('../models/Usuario');
//Controladores 
const logsCotroller = require('../controller/logsController'); 
const mailCotroller = require('../controller/mailCotroller'); 

//Importo implementos para el captcha
const fetch = require('node-fetch');
const { stringify } = require('querystring');

//Plantillas Controlador && Helpers 
const { mailEnvioCorreoToken } = require('../template/PlantillaMail');
const { validarCaptcha }       = require('../middleware/helpers');



//Permite autenticar el usuario 
exports.autenticarUsuario = async (req = request, res = response, next) => {
    //Extraer en  email  y password 
    const { emailUsu, password } = req.body; 

    try {
        //Revisar que el usuario sea unico 
        let usuario = await Usuario.findOne({emailUsu}); 
        if ( !usuario ){
            return res.status(200).json({msg:' ¡ El usuario no existe !', success:false});
        }

        //Revisar Password
        const passwordCorrecto = await bcryptjs.compare(password, usuario.password ); 
        if (!passwordCorrecto  ){
            return res.status(200).json({msg:' ¡ Contraseña incorrecta !', success:false});
        }

        //******Inicio ******//  Nota Leonard:  
            //Este metodo (autenticarUsuario) es un async y el metodo helper validarCaptcha es otro async,  da error  <pending> ya que no pueden estar dos metodos async anidados 
            // La manera de resolver esto es usando promesa y esta es la manera de como se implementa  

 /*        validarCaptcha(req).then(resultado => {  
                    console.log('Resultado del Recaptcha'.green, resultado);
                    if (resultado !== 'ok' ){
                        return res.status(200).json({msg: `Problemas con el captcha, Debes refrescar la pagina por favor` , success:false});
                    }
        } ) //Ejecuta el lado bueno 
         .catch(err=> {
            return res.status(200).json({msg: `Problemas de conexión!!` , success:false});
         } );//Ejecuta el lado reject 
*/
        //************Fin ******
        
        //Validar si el usurio esta activo 
        if ( usuario.activo === 1 ){
              //Crear payload
                    const payload = {
                        usuario:{
                            id:usuario.id, 
                            nomUsu:usuario.nomUsu, 
                        }
                    };

                    //firmar el jwt 
                    jwt.sign(payload, process.env.SECRETA,{ 
                        expiresIn:3600, // 1 hORA 
                        algorithm: process.env.TOKEN_CODE
                    }, (error, token)=>{
                        if( error ) throw error; 
                        //Mensaje de confirmación 
                        res.status(200).json({ token:token , success:true})
                    });
        }else{
            return res.status(200).json({msg:'El usuario no esta activo.', success:false}); 
        }//fin del usuario activo 
        
    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(200).json({msg: `Hubo un  error  en  la comunicación !!  `, success:false});
    }
}

//Permite obtener que usuario esta autenticado 
exports.usuarioAutenticado = async (req = request, res= response)=>{
    
    try {
        const usuario = await Usuario.findOne(req.emailUsu).select('-password');
        
        res.status(200).json({usuario});
        
    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(200).json({msg: "Hubo un error  - consulta"}) 
    }
}

//Permite autenticar el usuario con Token 
exports.autenticarUsuarioToken = async (req = request, res= response) => {

    //Extraer en  email  y password 
    const { emailUsu, password, captcha } = req.body; 

    try {
        //Revisar que el usuario sea unico 
        let usuario = await Usuario.findOne({emailUsu}); 

        //Revisar Password
        const passwordCorrecto = await bcryptjs.compare(password, usuario.password ); 
        if (!passwordCorrecto  ){
            return res.status(401).json({success: false, msg:'Contraseña incorrecto'});
        }



        //******Inicio ******//  Nota Leonard:  
            //Este metodo (autenticarUsuario) es un async y el metodo helper validarCaptcha es otro async,  da error  <pending> ya que no pueden estar dos metodos async anidados 
            // La manera de resolver esto es usando promesa y esta es la manera de como se implementa  

         validarCaptcha(req).then(resultado => {  
                    console.log('Resultado del Recaptcha'.green, resultado);
                    if (resultado !== 'ok' ){
                        return res.status(200).json({msg: `Problemas con el captcha, Debes refrescar la pagina por favor` , success:false});
                    }
        } ) //Ejecuta el lado bueno 
         .catch(err=> {
            return res.status(200).json({msg: `Problemas de conexión!!` , success:false});
         } );//Ejecuta el lado reject 

        //************Fin ******

        
        //Validar si el usurio esta activo 
        if ( usuario.activo === 1 ){
              //Crear payload
                    const payload = {
                        usuario:{
                            id:usuario.id, 
                            nomUsu:usuario.nomUsu, 
                        }
                    };

                    //firmar el jwt 
                    jwt.sign(payload, process.env.SECRETA,{ 
                        expiresIn:3600, // 1 hORA 
                        algorithm: process.env.TOKEN_CODE
                    }, (error, token)=>{
                        if( error ) throw error; 
                        //Mensaje de confirmación 
                        res.status(201).json({ token:token, success:true  })
                    });
        }else{
            return res.status(401).json({success: false, msg:'El usuario no esta activo.'}); 
        }//fin del usuario activo 
        
    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(500).json({msg: `Hubo un  error  en  la comunicación !!  `});
    }
}

//Permite obtener que usuario esta autenticado 
exports.olvidoClave = async (req = request, res= response)=>{
    try {

        //Extraer en  email  y password 
        const { emailUsu } = req.body; 

         //Revisar que el usuario sea unico 
         let usuario = await Usuario.findOne({emailUsu}); 

        //******Inicio ******//  Nota Leonard:  
            //Este metodo (autenticarUsuario) es un async y el metodo helper validarCaptcha es otro async,  da error  <pending> ya que no pueden estar dos metodos async anidados 
            // La manera de resolver esto es usando promesa y esta es la manera de como se implementa  

            validarCaptcha(req).then(resultado => {  
                console.log('Resultado del Recaptcha'.green, resultado);
                if (resultado !== 'ok' ){
                    return res.status(200).json({msg: `Problemas con el captcha, Debes refrescar la pagina por favor` , success:false});
                }
            } ) //Ejecuta el lado bueno 
            .catch(err=> {
                return res.status(200).json({msg: `Problemas de conexión!!` , success:false});
            } );//Ejecuta el lado reject 

        //************Fin ******         

        //Validar si el usurio esta activo 
        if ( usuario.activo === 1 ){
            //Crear payload
                const payload = {
                    usuario:{
                        id:usuario.id, 
                    }
                };

                //firmar el jwt 
                jwt.sign(payload, process.env.SECRETA,{ 
                    expiresIn:900, // 15 Minutos
                    algorithm: process.env.TOKEN_CODE
                }, (error, token)=>{
                    if( error ) throw error; 
                    //Mensaje de confirmación al correo 
                   
                    let mensaje = mailEnvioCorreoToken(usuario.nomUsu, token);  //`Debes acceder a este enlace para cambiar la contraseña <br><br> Enlace: [http://localhost:3000/cambio/${token}] , Solo tienes 15 minutos desde ahora para cambiar tu contraseña en caso deberas volver solicitar el cambio <br><br> Muchas gracias por su comprensión.`;
                    let subject = `Hola, ${usuario.nomUsu} - Olvido su Clave en [AntVerify]`; 
                    mailCotroller.sendMailto( mensaje , emailUsu, subject );
           
                    return res.status(200).json({msg:' ¡ Por favor valida tu correo  !', success:true});

                });
        }else{
            return res.status(200).json({msg:'El usuario no esta activo.', success:false}); 
        }//fin del usuario activo         
        
    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(500).json({msg: "Hubo un problema en el servidor", success:false}) 
    }
}

