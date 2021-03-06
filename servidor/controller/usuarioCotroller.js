//Libreria

const { response,  request } = require('express');
const bcrypt               = require('bcrypt');
const jwt                  = require('jsonwebtoken');

require('dotenv').config({path: '../config/variables.env'});  //LINEA IMPORTANTE

//Modelos
const {Usuario, Ingreso, Gasto, Patrimonio,Categoria }  = require('../models');

//Controlador
const mailCotroller = require('../controller/mailCotroller'); 
const logsCotroller = require('../controller/logsController'); 

//Plantillas Controlador && Helpers 
const { mailCambioClave, mailRegistroUsuario } = require('../template/PlantillaMail');
const { validarCaptcha }       = require('../middleware/helpers');

//Crear usuario 
exports.nuevoUsuario = async(req=request, res=response)=>{
    
    //Es una forma de validar si esta llegando bien el json -> Externo generado por postman
   // console.log(req.body);
    const {emailUsu, password} = req.body; 

        try {
            //Valido Recaptcha 
            //Como me devuelve una promesa declaro en una variable
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
            res.status(200).json({msg: error ,success:false});
        }
}

//Udadate Usuario  
exports.updateUsuario = async(req=request, res=response)=>{
    
  //Extraer informacion para validacion 
  try {
        //Distroccion de Json que se envia 
        const { emailUsu, nomUsu, apeUsu, sexo, pais, fechaNac } = req.body; //->Asi se usa cuando es un objeto 
        //Valido Categoria 
          let valExiste = await Usuario.findOne( {emailUsu} ); 
  
        if (!valExiste) return res.status(200).json({msg:`Tu Usuario con nombre ${nomUsu}, No existe en la base de datos.`});
        
       // console.log("Desde Editar->",valExiste);
        //crear un objeto con la nueva informaciòn 
        const newObj     = {}
        newObj.nomUsu    = nomUsu; 
        newObj.apeUsu    = apeUsu; 
        newObj.sexo      = sexo; 
        newObj.pais      = pais; 
        newObj.fechaNac  = fechaNac; 
        
        //Guadar Edicción 
        valExiste = await Usuario.findByIdAndUpdate({ _id: valExiste._id }, newObj, {new:true});
        res.status(200).json({msg:`Tu Usuario con correo ${emailUsu}, fue editado.`});
     
  } catch (error) {
      logsCotroller.logsCRUD(`Hubo un  error  en  la comunicación !! -> ${error} `);
      res.status(200).json({msg: `Hubo un  error  en  la comunicación !! parte 2  `});
  }
}

//Delete Usuario
exports.deleteUsuario = async(req=request, res=response)=>{

    try {
        const {id, emailUsu} = req.body;// Asi es cuando se pasa un objeto  es decir un json tienes param, query, body
        //Valido Usuario  
        let valExiste = await Usuario.findById(id); 
  
        if (!valExiste) return res.status(200).json({msg:`Tu Usuario con nombre ${emailUsu}, No existe en la base de datos.`});

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
        res.status(200).json({msg: `Hubo un  error  en  la comunicación !!  `});
    }
}

//Udadate -> Cambio Clave Usuario  
exports.cambioClaveUsuario = async(req=request, res=response)=>{
    
  //Extraer informacion para validacion 
  try {
        //Distroccion de Json que se envia 
        const { token, emailUsu, password } = req.body; //->Asi se usa cuando es un objeto 
        
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