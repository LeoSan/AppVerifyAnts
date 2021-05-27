//Librerias 
const bcryptjs             = require('bcrypt');
const { validationResult } = require('express-validator'); 
const jwt                  = require('jsonwebtoken');
//Modelos 
const Usuario              = require('../models/Usuario');
//Controladores 
const logsCotroller = require('../controller/logsController'); 

//Importo implementos para el captcha
const bodyParser  = require('body-parser');
const fetch = require('node-fetch');
const { stringify } = require('querystring');


//Permite autenticar el usuario 
exports.autenticarUsuario = async (req, res) => {
    //Revisar si hay errores (Nuevo)
        const errors = validationResult(req);
        if ( !errors.isEmpty() ){
            return res.status(406).json({errores: errors.array()})
        }

    //Extraer en  email  y password 
    const { emailUsu, password } = req.body; 

    try {
        //Revisar que el usuario sea unico 
        let usuario = await Usuario.findOne({emailUsu}); 
        if ( !usuario ){
            return res.status(406).json({msg:'El usuario no existe'});
        }

        //Revisar Password
        const passwordCorrecto = await bcryptjs.compare(password, usuario.password ); 
        if (!passwordCorrecto  ){
            return res.status(401).json({msg:'Contraseña incorrecto'});
        }
        
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
                        res.status(201).json({ token:token })
                    });
        }else{
            return res.status(401).json({msg:'El usuario no esta activo.'}); 
        }//fin del usuario activo 
        
    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(500).json({msj: `Hubo un  error  en  la comunicación !!  `});
    }
}

//Permite obtener que usuario esta autenticado 
exports.autenticarAutenticado = async (req, res)=>{
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        res.status(200).json({usuario});
        
    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(500).json({msg: "Hubo un error  - autenticacion"}) 
    }
}


//Permite autenticar el usuario con Token 
exports.autenticarUsuarioToken = async (req, res) => {
    //Revisar si hay errores (Nuevo)
        const errors = validationResult(req);
        if ( !errors.isEmpty() ){
            return res.status(406).json({errores: errors.array()})
        }

    //Extraer en  email  y password 
    const { emailUsu, password, captcha } = req.body; 

    try {
        //Revisar que el usuario sea unico 
        let usuario = await Usuario.findOne({emailUsu}); 
        if ( !usuario ){
            return res.status(406).json({success: false, msg:'El usuario no existe'});
        }

        //Revisar Password
        const passwordCorrecto = await bcryptjs.compare(password, usuario.password ); 
        if (!passwordCorrecto  ){
            return res.status(401).json({success: false, msg:'Contraseña incorrecto'});
        }

        /* Inicio  captcha */
        //Revisar si envio captcha
        if (!captcha)
            return res.status(401).json({ success: false, msg: 'Por favor seleccionar el captcha.' });
    
        // Secret key - De  mi cuenta Google 
        const secretKey = '6LdxEHIUAAAAAKaXkVCS8lF-yW2LXHAU3Z-BqW4V';

        // Verify URL
        const query = stringify({
            secret: secretKey,
            response: req.body.captcha,
            remoteip: req.connection.remoteAddress
        });
        
        const verifyURL = `https://google.com/recaptcha/api/siteverify?${query}`;
 
        // Make a request to verifyURL
        const result = await fetch(verifyURL).then(res => res.json());
        
        logsCotroller.logsCRUD(`Resultado captcha !! -> ${ result.success } `);

        // If not successful
        if (result.success !== undefined && !result.success)
            return res.status(401).json({ success: false, msg: 'Fallo captcha verification.' });

        /* Fin  captcha */

        
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
                        res.status(201).json({ token:token })
                    });
        }else{
            return res.status(401).json({success: false, msg:'El usuario no esta activo.'}); 
        }//fin del usuario activo 
        
    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(500).json({msj: `Hubo un  error  en  la comunicación !!  `});
    }
}
