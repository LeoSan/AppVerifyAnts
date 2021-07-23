//Libreria
const { validationResult } = require('express-validator');
const bcrypt               = require('bcrypt');
const jwt                  = require('jsonwebtoken');

require('dotenv').config({path: '../config/variables.env'});  //LINEA IMPORTANTE
//Modelos
const Usuario    = require('../models/Usuario');
const Ingreso    = require('../models/Ingreso');
const Gasto      = require('../models/Gasto');
const Patrimonio = require('../models/Patrimonio');
const Categoria  = require('../models/Categoria');

//Controlador
const mailCotroller = require('../controller/mailCotroller'); 
const logsCotroller = require('../controller/logsController'); 

//Plantillas Controlador && Helpers 
const { mailCambioClave, mailRegistroUsuario } = require('../template/PlantillaMail');
const { validarCaptcha }       = require('../middleware/helpers');

//Crear usuario 
exports.nuevoUsuario = async(req, res)=>{
    //Mostrar mensaje de error de express-validator 
    const errores  = validationResult(req); 

    if (!errores.isEmpty()){
        logsCotroller.logsCRUD('[Validacion] - Crear usuario');
        return res.status(200).json({errores: errores.array(), success:false, msg: `Debes validar los campos, ${ errores.array(0) }` });
    }
    
    //Es una forma de validar si esta llegando bien el json -> Externo generado por postman
   // console.log(req.body);
    const {emailUsu, password} = req.body; 

        try {
            // Anexo  Vaidación 
            let  usuario = await Usuario.findOne({emailUsu}); 

            if ( usuario ) return  res.status(200).json({msg: `El usuario con este email, ${emailUsu} ya esta registrado.`, success:false} );

            //Valido Recaptcha 

            //Como me devuelve una promeso declaro en una variable
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


           //Creamos usuario si no esta duplicado 
            usuario = new Usuario(req.body);

            //Hashear  la clave con el salt
            //Creamos la instancias de bcrypt para el Hasheo de la  clave, con esto lo mandamos como parametro  
            const salt = await bcrypt.genSalt(10);
            usuario.password = await bcrypt.hash(password, salt)
            
            //Genero registro en la BD
            await usuario.save();
            
            //Envio de Correo 
            let mensaje = mailRegistroUsuario(usuario.nomUsu, );
            let subject = `Bienvenido, ${usuario.nomUsu}, Tu App para Reducir y controlar gastos - [AntVerify]`;
            mailCotroller.sendMailto( mensaje , emailUsu, subject );

            //Envio Respuesta al servidor 
            res.status(201).json({msg: 'Usuario Creado Exitosamente!! Puedes ingresar dando clic en el boton acceder.', success:true});

        } catch (error) {
            logsCotroller.logsCRUD(`Hubo un  error  en  la comunicación !! -> ${error} `);
            res.status(200).json({msg: `Hubo un  error  en  la comunicación !!  `,success:false});
        }
}

//Udadate Usuario  
exports.updateUsuario = async (req, res)=>{
    
    //Revisar que que cumple con las reglas de validaciòn del routes 
    const errors = validationResult(req);
    if ( !errors.isEmpty() ){
        return res.status(406).json({errores: errors.array()})
    }

  //Extraer informacion para validacion 
  try {
        //Distroccion de Json que se envia 
        const { id, emailUsu, nomUsu, activo } = req.body; //->Asi se usa cuando es un objeto 
        //Valido Categoria 
          let valExiste = await Usuario.findById( id ); 
  
        if (!valExiste) return res.status(406).json({msg:`Tu Usuario con nombre ${nomUsu}, No existe en la base de datos.`});
        
        //crear un objeto con la nueva informaciòn 
        const newObj     = {}
        newObj.emailUsu  = emailUsu; 
        newObj.nomUsu    = nomUsu; 
        newObj.activo    = activo; 

        let nomOld = valExiste.nomUsu; 
        
        //Guadar Edicción 
        valExiste = await Usuario.findByIdAndUpdate({ _id: id }, newObj, {new:true});
        res.status(205).json({msg:`Tu Usuario con nombre ${nomOld}, fue editado.`});
     
  } catch (error) {
      logsCotroller.logsCRUD(`Hubo un  error  en  la comunicación !! -> ${error} `);
      res.status(500).json({msg: `Hubo un  error  en  la comunicación !!  `});
  }
}

//Delete Usuario
exports.deleteUsuario = async (req, res)=>{
        //Revisar que que cumple con las reglas de validaciòn del routes 
        const errors = validationResult(req);
        if ( !errors.isEmpty() ){
            return res.status(406).json({errores: errors.array()})
        }
    
    try {
        const {id, emailUsu} = req.body;// Asi es cuando se pasa un objeto  es decir un json tienes param, query, body
        //Valido Usuario  
        let valExiste = await Usuario.findById(id); 
  
        if (!valExiste) return res.status(406).json({msg:`Tu Usuario con nombre ${emailUsu}, No existe en la base de datos.`});

        //Eliminar Usuario 
        await Usuario.findByIdAndRemove( { _id:id } ).exec(function (err, story) {
                    Ingreso.remove({usuario: this._id}).exec();
                    Gasto.remove({usuario: this._id}).exec();
                    Patrimonio.remove({usuario: this._id}).exec();
                    Categoria.remove({autor: this._id}).exec();
          });
        res.status(200).json({msg:`Tu Usuario con nombre ${emailUsu}, fue eliminado.`});
       
    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un  error  en  la comunicación !! -> ${error} `);
        res.status(500).json({msg: `Hubo un  error  en  la comunicación !!  `});
    }
}

//Udadate -> Cambio Clave Usuario  
exports.cambioClaveUsuario = async (req, res)=>{
    
    //Revisar que que cumple con las reglas de validaciòn del routes 
    const errors = validationResult(req);
    if ( !errors.isEmpty() ){
        return res.status(200).json({errores: errors.array(), msg:`Validar el siguiente error ${errors.array(0)}`, success:false })
    }

  //Extraer informacion para validacion 
  try {
        //Distroccion de Json que se envia 
        const { token, emailUsu, password, captcha } = req.body; //->Asi se usa cuando es un objeto 
        
        //Valido Token 
             //Puedo definir opciones para la verificacion 
            const options = { algorithms: process.env.TOKEN_CODE, typ: process.env.TOKEN_TYP };

            // Validar el token
            try {
                const cifrado = jwt.verify( token,  process.env.SECRETA, options  );
                const { id } = cifrado.usuario;

                //Valido Usuario 
                let valExiste = await Usuario.findById( id ); 
                
                if (!valExiste) return res.status(200).json({msg:`Este Usuario que nos porporcionaste no existe.`, success:false});
                
                    //Hashear  la clave con el salt
                    //Creamos la instancias de bcrypt para el Hasheo de la  clave, con esto lo mandamos como parametro  
                    const salt = await bcrypt.genSalt(10);
                    let NewPass = await bcrypt.hash(password, salt)

                    //crear un objeto con la nueva informaciòn 
                    const newObj     = {}
                    newObj.password    = NewPass; 
                
                    let nomOld = valExiste.nomUsu; 

                    //Guadar Edicción 
                    valExiste = await Usuario.findByIdAndUpdate({ _id: id }, newObj, {new:true});
                
                    //Mensaje de confirmación al correo 
                        let mensaje = mailCambioClave(nomOld);
                        let subject = `Hola, ${nomOld} Confirmación de Cambio de Clave - [AntVerify]`;
                        mailCotroller.sendMailto( mensaje , emailUsu, subject );
                
                res.status(200).json({msg:`Hola  ${nomOld}, Cambiaste la clave de manera segura.`, success:true});                
                
            } catch (error) {
              return  res.status(200).json({msg: `Token Expiro o no es correcto.`, success:false });
            }
     
  } catch (error) {
      logsCotroller.logsCRUD(`Hubo un  error  en  la comunicación !! -> ${error} `);
      res.status(200).json({msg: `Hubo un  error  en  la comunicación !!  `, success:false});
  }
}