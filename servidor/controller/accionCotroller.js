//Librerias 
const {validationResult} = require('express-validator');
const moment = require('moment');  
//Modelos 
const Accion = require('../models/Accion');
//Controladores 
const logsCotroller = require('../controller/logsController'); 

require('dotenv').config({ path :'./config/variables.env'});

//Crear  Accion 
exports.newAccion = async(req, res)=>{
    //Mostrar mensaje de error de express-validator 
    const errores  = validationResult(req); 

    if (!errores.isEmpty()){
        return res.status(process.env.SFALLA).json({errores: errores.array()});
    }
    
    //Es una forma de validar si esta llegando bien el json -> Externo generado por postman
    // console.log(req.body);
    const {nomAccion} = req.body; 

        try {
            //Vaidación 
            let  accion = await Accion.findOne({nomAccion}); 
            if ( accion )return  res.status(406).json({msg: `La accion No la puedes repetir, ${nomAccion}`});            
        //Creamos Accion si no esta duplicado 
            accion = new Accion(req.body);
            await accion.save();
            res.status(201).json({msg: 'Tu Acción fue creada Exitosamente!!'});
        } catch (error) {
            logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
            res.status(process.env.SERROR).json({msg: `Hubo un error en la comunicación !! `});
        }
}

//Obtener Accion  
exports.getAccion = async (req, res) =>{
    //Extraer proyecto 
    try {
        //Distroccion 
        const { nomAccion, autor, tipo } = req.body; //->Asi se usa cuando es un objeto 
        
        let existeVAl = await Accion.findOne({ nomAccion }); 

        if(!existeVAl)return res.status(406).json({msg:`Tu acción con nombre ${ nomAccion }, No existe en la base de datos.`});

        //Verificar el autor  
        if (existeVAl.autor.toString() !== autor ){
            return res.status(401).json({msg:'No autorizado'});
        }

        if ( tipo === "1-M" ){
            //Obtener 1-M
            //const accion = await Accion.find({ autor }).sort({autor:-1});
            const accion = await Accion.find({ autor });
            res.status(200).json({ accion });
       }else{
            //Obtener 1.1
            const accion = await Accion.find({ nomAccion }).sort({autor:-1});
            res.status(200).json({ accion });
        }     
    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(500).json({msg: `Hubo un error en la comunicación !! `});
    }
}


//Obtener Acciones entre fechas Inicio y fin  
exports.getAccionBetweenFecha = async (req, res) =>{
    
    const errores  = validationResult(req); 

    if (!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }
    
    try {
        //Distroccion 
        const { fechaInicio, fechaFin,  autor, categoria, activo, tipo} = req.body; //->Asi se usa cuando es un objeto 

        let start = moment().format(fechaInicio);
        let end = moment().format(fechaFin);

            let existeVAl = await Accion.findOne({autor}); 

            if(!existeVAl) return res.status(406).json({msg:`No Existe algun tipo de Accion para este usuario.`});
            
        //Consulta entre fechas 
            //Consulta solo por categoria 
            if ( tipo === "categoria" ){
                const accion = await Accion.find( {"registro": {"$gte": start, "$lt": end }, 'activo': activo,  'autor': autor,  'categoria': categoria }).populate({ path: 'categoria', model: 'Categoria', select: 'nomCate'}).exec();
                res.status(200).json({ accion });
            }
            //Consulta solo por Usuario
            if ( tipo === "usuario" ){ 
                const accion = await Accion.find( {"registro": {"$gte": start, "$lt": end }, 'activo': activo,  'autor': autor }).populate({ path: 'categoria', model: 'Categoria', select: 'nomCate'}).exec();
                res.status(200).json({ accion });
             }
            
    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(500).json({msg: `Hubo un error en la comunicación !! `});
    }
}

//Udadate Accion 
exports.updateAccion = async (req, res)=>{
    
    //Revisar que que cumple con las reglas de validaciòn del routes 
    const errors = validationResult(req);
    if ( !errors.isEmpty() ){
        return res.status(406).json({errores: errors.array()})
    }

  //Extraer informacion para validacion 
  try {
        //Distroccion de Json que se envia 
        const {id, nomAccion, desAccion, categoria} = req.body;
        
        //Valido Acción 
          let accionExiste = await Accion.findById(id); // Leo : Mucho ojo es la forma de obtener los parametros por post 
  
          if (!accionExiste)return res.status(406).json({msg:`Tu acción con nombre ${nomAccion}, No existe en la base de datos.`});
          
        //crear un objeto con la nueva informaciòn 
        const nuevaAccion = {}
        nuevaAccion.nomAccion = nomAccion; 
        nuevaAccion.desAccion = desAccion; 
        nuevaAccion.categoria = categoria; 

        let nomAccionOld = accionExiste.nomAccion; 
        
        //Guadar la Accion Editada 
        accionExiste = await Accion.findByIdAndUpdate({ _id: id }, nuevaAccion, {new:true});
        res.status(205).json({msg:`Tu acción con nombre ${nomAccionOld}, fue editado.`});
     
  } catch (error) {
      logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
      res.status(500).json({msg: `Hubo un error en la comunicación !! `});
  }
}

//Eliminar Accion
exports.deleteAccion = async (req, res)=>{
    //Extraer informacion del proyecto 
    try {
          //Extraer proyecto y comprobar si existe
          const {id, nomAccion} = req.body;// Asi es cuando se pasa un objeto  es decir un json 
          //const {accion} = req.query;// Asi es cuando se pasa parametros 
  
          //Si la tarea existe o no
          let accionExiste = await Accion.findById(id); // Leo : Mucho ojo es la forma de obtener los parametros por post 
  
          if (!accionExiste) return res.status(406).json({msg:`Tu acción con nombre ${nomAccion}, No existe en la base de datos.`});
          
          //Eliminar Accion 
          await Accion.findByIdAndRemove({ _id:id })
          res.status(205).json({msg:`Tu acción con nombre ${nomAccion}, fue eliminado.`});
       
    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(500).json({msg: `Hubo un error en la comunicación !! `});
        //res.status(500).send("Hubo un error en la comunicación");
    }
}