//Libreria
const { validationResult } = require('express-validator');
const bcrypt     = require('bcrypt');
//Modelos
const Usuario    = require('../models/Usuario');
const Ingreso    = require('../models/Ingreso');
const Gasto      = require('../models/Gasto');
const Patrimonio = require('../models/Patrimonio');
const Categoria  = require('../models/Categoria');

//Controlador
const mailCotroller = require('../controller/mailCotroller'); 
const logsCotroller = require('../controller/logsController'); 

//Crear usuario 
exports.nuevoUsuario = async(req, res)=>{
    //Mostrar mensaje de error de express-validator 
    const errores  = validationResult(req); 

    if (!errores.isEmpty()){
        logsCotroller.logsCRUD('[Validacion] - Crear usuario');
        return res.status(400).json({errores: errores.array()});
    }
    
    //Es una forma de validar si esta llegando bien el json -> Externo generado por postman
   // console.log(req.body);
    const {emailUsu, password} = req.body; 

        try {
            // Anexo  Vaidación 
            let  usuario = await Usuario.findOne({emailUsu}); 

            if ( usuario ) return  res.status(400).json({msg: `El usuario con este email, ${emailUsu} ya esta registrado`});

        //Creamos usuario si no esta duplicado 
            usuario = new Usuario(req.body);

            //Hashear  la clave con el salt
            //Creamos la instancias de bcrypt para el Hasheo de la  clave, con esto lo mandamos como parametro  
            const salt = await bcrypt.genSalt(10);
            usuario.password = await bcrypt.hash(password, salt)

            await usuario.save();

            res.json({msj: 'Usuario Creado Exitosamente!!'});
            
            let mensaje = " Primera prueba de envio de correos";
            mailCotroller.sendMailto( mensaje );

        } catch (error) {
            logsCotroller.logsCRUD(`Hubo un  error  en  la comunicación !! -> ${error} `);
            res.json({msj: `Hubo un  error  en  la comunicación !! -> ${error} `});
        }
}

//Udadate Usuario  
exports.updateUsuario = async (req, res)=>{
    
    //Revisar que que cumple con las reglas de validaciòn del routes 
    const errors = validationResult(req);
    if ( !errors.isEmpty() ){
        return res.status(400).json({errores: errors.array()})
    }

  //Extraer informacion para validacion 
  try {
        //Distroccion de Json que se envia 
        const { id, emailUsu, nomUsu, activo } = req.body; //->Asi se usa cuando es un objeto 
        //Valido Categoria 
          let valExiste = await Usuario.findById( id ); 
  
        if (!valExiste) return res.status(404).json({msg:`Tu Usuario con nombre ${nomUsu}, No existe en la base de datos.`});
        
        //crear un objeto con la nueva informaciòn 
        const newObj     = {}
        newObj.emailUsu  = emailUsu; 
        newObj.nomUsu    = nomUsu; 
        newObj.activo    = activo; 

        let nomOld = valExiste.nomUsu; 
        
        //Guadar Edicción 
        valExiste = await Usuario.findByIdAndUpdate({ _id: id }, newObj, {new:true});
        res.status(200).json({msg:`Tu Usuario con nombre ${nomOld}, fue editado.`});
     
  } catch (error) {
      logsCotroller.logsCRUD(`Hubo un  error  en  la comunicación !! -> ${error} `);
      res.status(500).send("Error en el servidor");
  }
}

//Delete Usuario
exports.deleteUsuario = async (req, res)=>{
        //Revisar que que cumple con las reglas de validaciòn del routes 
        const errors = validationResult(req);
        if ( !errors.isEmpty() ){
            return res.status(400).json({errores: errors.array()})
        }
    
    try {
        const {id, emailUsu} = req.body;// Asi es cuando se pasa un objeto  es decir un json tienes param, query, body
        //Valido Usuario  
        let valExiste = await Usuario.findById(id); 
  
        if (!valExiste) return res.status(404).json({msg:`Tu Usuario con nombre ${emailUsu}, No existe en la base de datos.`});

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
        res.status(500).send("Error en el servidor.");
    }
}

//Udadate -> Cambio Clave Usuario  
exports.cambioClaveUsuario = async (req, res)=>{
    
    //Revisar que que cumple con las reglas de validaciòn del routes 
    const errors = validationResult(req);
    if ( !errors.isEmpty() ){
        return res.status(400).json({errores: errors.array()})
    }

  //Extraer informacion para validacion 
  try {
        //Distroccion de Json que se envia 
        const { id, emailUsu, password } = req.body; //->Asi se usa cuando es un objeto 
        //Valido Categoria 
          let valExiste = await Usuario.findById( id ); 
  
        if (!valExiste) return res.status(404).json({msg:`Tu Usuario con nombre ${nomUsu}, No existe en la base de datos.`});
        
            //Hashear  la clave con el salt
            //Creamos la instancias de bcrypt para el Hasheo de la  clave, con esto lo mandamos como parametro  
            const salt = await bcrypt.genSalt(10);
            let NewPass = await bcrypt.hash(password, salt)

            //crear un objeto con la nueva informaciòn 
            const newObj     = {}
            newObj.password    = NewPass; 
        
            let nomOld = valExiste.nomUsu; 
        
        //Proceso envio de correo  //todo 

        //Guadar Edicción 
        valExiste = await Usuario.findByIdAndUpdate({ _id: id }, newObj, {new:true});
        res.status(200).json({msg:`Tu Usuario con nombre ${nomOld}, cambio del password exitoso.`});
     
  } catch (error) {
      logsCotroller.logsCRUD(`Hubo un  error  en  la comunicación !! -> ${error} `);
      res.status(500).send("Error en el servidor");
  }
}