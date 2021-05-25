//Librerias 
const {validationResult} = require('express-validator');
const moment = require('moment');  
//Modelos 
const Gasto = require('../models/Gasto');
//Logs - Controlador  
const logsCotroller = require('../controller/logsController'); 

// Crear gasto 
exports.newGasto = async(req, res)=>{
    //Mostrar mensaje de error de express-validator 
    const errores  = validationResult(req); 

    if (!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }
    
    //Es una forma de validar si esta llegando bien el json -> Externo generado por postman
   // console.log(req.body);
    const {nomGasto} = req.body; 

        try {

            // Anexo  Vaidación 
            let  gasto = await Gasto.findOne({nomGasto}); 

            if ( gasto ) return  res.status(400).json({msg: `el gasto No la puedes repetir, ${nomGasto}`});

        //Creamos Gasto si no esta duplicado 
        gasto = new Gasto(req.body);
            await gasto.save();
            res.json({msj: 'Gasto Creado Exitosamente!!'});

        } catch (error) {
            logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
            res.json({msj: `Hubo un error en la comunicación !! `});
        }
}

//Obtener Gastos   
exports.getGastos = async (req, res) =>{
    try {
        //Distroccion 
        const { nomGasto, usuario, categoria, activo, tipo } = req.body; //->Asi se usa cuando es un objeto 

        if ( tipo === "1-M" ){
            //Obtener 1-M
            let existeVAl = await Gasto.findOne({ usuario }); 

            if(!existeVAl) return res.status(404).json({msg:`No Existe algun tipo de gasto para este usuario.`});
            
             //Ejemplo Multiple de modelos 
            //const gasto = await Gasto.find( { $and: [{usuario:usuario}, {activo: activo }] } ).populate({ path: 'categoria', model: 'Categoria', select: 'nomCate'}).populate({ path: 'usuario', model: 'Usuario', select: 'nomUsu'}).exec();
            const gasto = await Gasto.find( { $and: [{usuario:usuario}, {activo: activo }] } ).populate({ path: 'usuario', model: 'Usuario', select: 'nomUsu'}).populate({ path: 'categoria', model: 'Categoria', select: 'nomCate'}).exec();
            res.status(200).json({ gasto });
           
        }else{
            //Obtener 1.1
            let existeVAl = await Gasto.findOne({ nomGasto }); 

            if(!existeVAl)  return res.status(404).json({msg:`Tu Gasto con nombre ${ nomGasto }, No existe en la base de datos.`});
            
            const gasto = await Gasto.find( { nomGasto } ).populate({ path: 'categoria', model: 'Categoria', select: 'nomCate'}).exec();
            res.status(200).json({ gasto });
        }   

    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(500).send('Hubo un error en la comunicación');
    }
}

//Obtener Gastos Por fecha  
exports.getGastosByFecha = async (req, res) =>{
    
    const errores  = validationResult(req); 

    if (!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }
    
    try {
        //Distroccion 
        const { fechaConsultar, usuario, categoria, activo} = req.body; //->Asi se usa cuando es un objeto 

            //Obtener 1-M
            let existeVAl = await Gasto.findOne({ usuario }); 

            if(!existeVAl) return res.status(404).json({msg:`No Existe algun tipo de gasto para este usuario.`});
            
             //Ejemplo Multiple de modelos 
            //const gasto = await Gasto.find( { $and: [{usuario:usuario}, {activo: activo }] } ).populate({ path: 'categoria', model: 'Categoria', select: 'nomCate'}).populate({ path: 'usuario', model: 'Usuario', select: 'nomUsu'}).exec();
            
            //const gasto = await Gasto.find( { $and: [{usuario:usuario}, {activo: activo }] } ).populate({ path: 'categoria', model: 'Categoria', select: 'nomCate'}).exec();
            
            //Consulta entre fechas 
            //import endOfDay from 'date-fns/endOfDay';
            //import startOfDay from 'date-fns/startOfDay';
            //const gasto = await Gasto.find(  {"registro": {"$gte": startOfDay(new Date('2021-01-01')), "$lt": endOfDay(new Date('2021-05-01')) }}) ).populate({ path: 'categoria', model: 'Categoria', select: 'nomCate'}).exec();
            
            //let today = new Date('2020-05-01');
            let today = new Date(fechaConsultar);
            let query = {
                'activo': activo,
                'usuario': usuario,
              $expr: { // la siguiente es una expresión de agregación
                $and: [ // indica que cada comparación entre elementos del array se debe satisfacer
                  { $eq: [ { $year:       '$registro' }, { $year: today } ] },  // devuelve true si se cumple la igualdad de los elementos
                  { $eq: [ { $month:      '$registro' }, { $month: today } ] },
                  //{ $eq: [ { $dayOfMonth: '$fecha' }, { $dayOfMonth: today } ] } 
                ] 
              }
            }            
            
            const gasto = await Gasto.find( query ).populate({ path: 'categoria', model: 'Categoria', select: 'nomCate'}).exec();
            res.status(200).json({ gasto });
    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(500).send(`Hubo un error en la comunicación !! ->  `);
    }
}

//Obtener Gasto Suma por Fecha    
exports.getGastoSumaByFecha = async (req, res) =>{
    
    const errores  = validationResult(req); 

    if (!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }
    
    try {
        //Distroccion 
        const { fechaConsultar, usuario, categoria, activo} = req.body; //->Asi se usa cuando es un objeto 

            //Valido si existe el usuario
            let existeVAl = await Gasto.findOne({ usuario }); 
            if(!existeVAl) return res.status(404).json({msg:`No Existe algun tipo de Gasto para este usuario.`});
            
           //Realizo mi query para filtrr fecha y por Usuario y Activo 
            let today = new Date(fechaConsultar);

                const gasto = await Gasto.aggregate([
                    { $match:   {   "activo": parseInt(activo),
                                    $expr: { // la siguiente es una expresión de agregación
                                             $and: [ // indica que cada comparación entre elementos del array se debe satisfacer
                                                        { $eq: [ { $year:       '$registro' }, { $year: today } ] },  // devuelve true si se cumple la igualdad de los elementos
                                                        { $eq: [ { $month:      '$registro' }, { $month: today } ] }
                                                    ] //Fin del and 
                                            }     
                                } 
                    },//Validacion Match 
                    
                    { $group: { _id: "$usuario", total: { $sum: "$montoGasto" } } },
                    
                    { $sort: { total: -1 } }
                 
                ]).exec();                

            res.status(200).json({ gasto });
    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(500).send(`Hubo un error en la comunicación !! -> `);
    }
}

//Obtener Gastos entre fechas de inicio y fin 
exports.getGastosBetweenFecha = async (req, res) =>{
    
    const errores  = validationResult(req); 

    if (!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }
    
    try {
        //Distroccion 
        const { fechaInicio, fechaFin,  usuario, categoria, activo, tipo} = req.body; //->Asi se usa cuando es un objeto 

        let start = moment().format(fechaInicio);
        let end = moment().format(fechaFin);

            let existeVAl = await Gasto.findOne({ usuario }); 

            if(!existeVAl) return res.status(404).json({msg:`No Existe algun tipo de gasto para este usuario.`});
            
        //Consulta entre fechas 
            //Consulta solo por categoria 
            if ( tipo === "categoria" ){
                const gasto = await Gasto.find( {"registro": {"$gte": start, "$lt": end }, 'activo': activo,  'usuario': usuario,  'categoria': categoria }).populate({ path: 'categoria', model: 'Categoria', select: 'nomCate'}).exec();
                res.status(200).json({ gasto });
            }
            //Consulta solo por Usuario
            if ( tipo === "usuario" ){ 
                const gasto = await Gasto.find( {"registro": {"$gte": start, "$lt": end }, 'activo': activo,  'usuario': usuario }).populate({ path: 'categoria', model: 'Categoria', select: 'nomCate'}).exec();
                res.status(200).json({ gasto });
             }
    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(500).send(`Hubo un error en la comunicación !! `);
    }
}



//Udadate Gasto 
exports.updateGasto = async (req, res)=>{
    
    //Revisar que que cumple con las reglas de validaciòn del routes 
    const errors = validationResult(req);
    if ( !errors.isEmpty() ){
        return res.status(400).json({errores: errors.array()})
    }

  //Extraer informacion para validacion 
  try {
        //Distroccion de Json que se envia 
        const {id, nomGasto, desGasto, montoGasto, idCategoria, idRecurrente, activo} = req.body;
        //Valido Categoria 
          let valExiste = await Gasto.findById( id ); 
  
          if (!valExiste) return res.status(404).json({msg:`Tu Gasto con nombre ${nomGasto}, No existe en la base de datos.`});
          
        //crear un objeto con la nueva informaciòn 
        const newObj     = {}
        newObj.nomGasto  = nomGasto; 
        newObj.desGasto   = desGasto; 
        newObj.montoGasto = montoGasto; 
        newObj.categoria  = idCategoria; 
        newObj.recurrente = idRecurrente; 
        newObj.activo     = activo; 

        let nomOld = valExiste.nomGasto; 
        
        //Guadar Edicción 
        valExiste = await Gasto.findByIdAndUpdate({ _id: id }, newObj, {new:true});
        res.status(200).json({msg:`Tu Gasto con nombre ${nomOld}, fue editado.`});
     
  } catch (error) {
      logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
      res.status(500).send("Error en el servidor");
  }
}

//Delete Gasto
exports.deleteGasto = async (req, res)=>{
    try {
        const {id, nomGasto} = req.body;// Asi es cuando se pasa un objeto  es decir un json tienes param, query, body
        //Valido Gasto 
        let valExiste = await Gasto.findById(id); 
  
        if (!valExiste)  return res.status(404).json({msg:`Tu Gasto con nombre ${nomGasto}, No existe en la base de datos.`});

        //Eliminar Gasto 
        await Gasto.findByIdAndRemove( { _id:id } )
        res.status(200).json({msg:`Tu Gasto con nombre ${nomGasto}, fue eliminado.`});
       
    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(500).send("Error en el servidor.");
    }
}