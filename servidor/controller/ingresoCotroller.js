//Libreria
const {validationResult} = require('express-validator');
const { response,  request } = require('express');
const moment = require('moment');  
//Modelo 
const Ingreso = require('../models/Ingreso');
//Logs - Controlador 
const logsCotroller = require('../controller/logsController'); 

//Crear Ingreso
exports.newIngreso = async(req = request, res = response)=>{
    //Mostrar mensaje de error de express-validator 
    const errores  = validationResult(req); 

    if (!errores.isEmpty()){
        return res.status(406).json({errores: errores.array()});
    }
    
    //Es una forma de validar si esta llegando bien el json -> Externo generado por postman
   // console.log(req.body);
    const {nomIngreso} = req.body; 

        try {
            // Anexo  Vaidación 
            let  ingreso = await Ingreso.findOne({nomIngreso}); 
            if ( ingreso ) return  res.status(406).json({msg: `El ingreso No la puedes repetir, ${nomIngreso}`});

        //Creamos Ingreso si no esta duplicado 
        ingreso = new Ingreso(req.body);
            await ingreso.save();
            res.status(201).json({msg: 'Creado Exitosamente!!'});
        } catch (error) {
            logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
            res.status(406).json({msg: `Hubo un error en la comunicación !! `});
        }
}

//Obtener Ingresos
exports.getIngreso = async (req = request, res = response) =>{
    try {
        //Distroccion 
        const { nomIngreso, usuario, categoria, activo, tipo } = req.body; //->Asi se usa cuando es un objeto 

        if ( tipo === "1-M" ){
            //Obtener 1-M
            let existeVAl = await Ingreso.findOne({ usuario }); 

            if(!existeVAl) return res.status(406).json({msg:`No Existe algun tipo de Ingreso para este usuario.`});
            
             //Ejemplo Multiple de modelos 
            //const ingreso = await Ingreso.find( { $and: [{usuario:usuario}, {activo: activo }] } ).populate({ path: 'categoria', model: 'Categoria', select: 'nomCate'}).populate({ path: 'usuario', model: 'Usuario', select: 'nomUsu'}).exec();
            const ingreso = await Ingreso.find( { $and: [{usuario:usuario}, {activo: activo }] } ).populate({ path: 'categoria', model: 'Categoria', select: 'nomCate'}).exec();
            res.status(200).json({ ingreso });
           
        }else{
            //Obtener 1.1
            let existeVAl = await Ingreso.findOne({ nomIngreso }); 

            if(!existeVAl) return res.status(406).json({msg:`Tu Ingreso con nombre ${ nomIngreso }, No existe en la base de datos.`});
            
            const ingreso = await Ingreso.find( { nomIngreso } ).populate({ path: 'categoria', model: 'Categoria', select: 'nomCate'}).exec();
            res.status(200).json({ ingreso });
        }   

    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(500).json({msg: `Hubo un error en la comunicación !! `});
    }
}

//Obtener Ingreso   
exports.getIngresoByFecha = async (req = request, res = response) =>{
    
    const errores  = validationResult(req); 

    if (!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }
    
    try {
        //Distroccion 
        const { fechaConsultar, usuario, categoria, activo} = req.body; //->Asi se usa cuando es un objeto 

            //Obtener 1-M
            let existeVAl = await Ingreso.findOne({ usuario }); 

            if(!existeVAl) return res.status(406).json({msg:`No Existe algun tipo de ingreso para este usuario.`});
            
            let today = new Date(fechaConsultar);
            let query = {
             'activo': activo,
             'usuario': usuario,
              $expr: { // la siguiente es una expresión de agregación
                $and: [ // indica que cada comparación entre elementos del array se debe satisfacer
                  { $eq: [ { $year:       '$registro' }, { $year: today } ] },  // devuelve true si se cumple la igualdad de los elementos
                  { $eq: [ { $month:      '$registro' }, { $month: today } ] }
                  //{ $eq: [ { $dayOfMonth: '$fecha' }, { $dayOfMonth: today } ] } 
                ] 
              }
            }     
            
            const ingreso = await Ingreso.find( query  ).populate({ path: 'categoria', model: 'Categoria', select: 'nomCate'}).exec();
            res.status(200).json({ ingreso });
    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(500).json({msg: `Hubo un error en la comunicación !! `});
    }
}

//Obtener Ingreso Suma por Fecha    
exports.getIngresoSumaByFecha = async (req = request, res = response) =>{
    
    const errores  = validationResult(req); 

    if (!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }
    
    try {
        //Distroccion 
        const { fechaConsultar, usuario, categoria, activo} = req.body; //->Asi se usa cuando es un objeto 

            //Valido si existe el usuario
            let existeVAl = await Ingreso.findOne({ usuario }); 
            if(!existeVAl) return res.status(406).json({msg:`No Existe algun tipo de Ingreso para este usuario.`});
            
           //Realizo mi query para filtrr fecha y por Usuario y Activo 
            let today = new Date(fechaConsultar);

                const ingreso = await Ingreso.aggregate([
                    { $match:   {   "activo": parseInt(activo),
                                    $expr: { // la siguiente es una expresión de agregación
                                             $and: [ // indica que cada comparación entre elementos del array se debe satisfacer
                                                        { $eq: [ { $year:       '$registro' }, { $year: today } ] },  // devuelve true si se cumple la igualdad de los elementos
                                                        { $eq: [ { $month:      '$registro' }, { $month: today } ] }
                                                    ] //Fin del and 
                                            }     
                                } 
                    },//Validacion Match 
                    
                    { $group: { _id: "$usuario", total: { $sum: "$montoIngreso" } } },
                    
                    { $sort: { total: -1 } }
                 
                ]).exec();                

            res.status(200).json({ ingreso });
    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(500).send(`Hubo un error en la comunicación !!  `);
    }
}

//Obtener Ingreso entre fechas Inicio y fin  
exports.getIngresoBetweenFecha = async (req = request, res = response) =>{
    
    const errores  = validationResult(req); 

    if (!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }
    
    try {
        //Distroccion 
        const { fechaInicio, fechaFin,  usuario, categoria, activo, tipo} = req.body; //->Asi se usa cuando es un objeto 

        let start = moment().format(fechaInicio);
        let end = moment().format(fechaFin);

            let existeVAl = await Ingreso.findOne({ usuario }); 

            if(!existeVAl) return res.status(406).json({msg:`No Existe algun tipo de Ingreso para este usuario.`});
            
        //Consulta entre fechas 
            //Consulta solo por categoria 
            if ( tipo === "categoria" ){
                const ingreso = await Ingreso.find( {"registro": {"$gte": start, "$lt": end }, 'activo': activo,  'usuario': usuario,  'categoria': categoria }).populate({ path: 'categoria', model: 'Categoria', select: 'nomCate'}).exec();
                res.status(200).json({ ingreso });
            }
            //Consulta solo por Usuario
            if ( tipo === "usuario" ){ 
                const ingreso = await Ingreso.find( {"registro": {"$gte": start, "$lt": end }, 'activo': activo,  'usuario': usuario }).populate({ path: 'categoria', model: 'Categoria', select: 'nomCate'}).exec();
                res.status(200).json({ ingreso });
             }
            
    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(500).json({msg: `Hubo un error en la comunicación !! `});
    }
}

//Udadate Ingreso 
exports.updateIngreso = async (req = request, res = response)=>{
    
    //Revisar que que cumple con las reglas de validaciòn del routes 
    const errors = validationResult(req);
    if ( !errors.isEmpty() ){
        return res.status(400).json({errores: errors.array()})
    }

  //Extraer informacion para validacion 
  try {
        //Distroccion de Json que se envia 
        const {id, nomIngreso, desIngreso, montoIngreso, idCategoria, idRecurrente, activo} = req.body;
        //Valido Categoria 
          let valExiste = await Ingreso.findById( id ); 
  
        if (!valExiste) return res.status(406).json({msg:`Tu Ingreso con nombre ${nomIngreso}, No existe en la base de datos.`});
        
        //crear un objeto con la nueva informaciòn 
        const newObj        = {}
        newObj.nomIngreso   = nomIngreso; 
        newObj.desIngreso   = desIngreso; 
        newObj.montoIngreso = montoIngreso; 
        newObj.categoria    = idCategoria; 
        newObj.recurrente   = idRecurrente; 
        newObj.activo       = activo; 

        let nomOld = valExiste.nomIngreso; 
        
        //Guadar Edicción 
        valExiste = await Ingreso.findByIdAndUpdate({ _id: id }, newObj, {new:true});
        res.status(205).json({msg:`Tu Ingreso con nombre ${nomOld}, fue editado.`});
     
  } catch (error) {
      logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
      res.status(500).json({msg: `Hubo un error en la comunicación !! `});
  }
}

//Delete Ingreso
exports.deleteIngreso = async (req = request, res = response)=>{
    try {
        const {id, nomIngreso} = req.body;// Asi es cuando se pasa un objeto  es decir un json tienes param, query, body
        //Valido Ingreso 
        let valExiste = await Ingreso.findById(id); 
  
        if (!valExiste) return res.status(406).json({msg:`Tu Ingreso con nombre ${nomIngreso}, No existe en la base de datos.`});

        //Eliminar Ingreso 
        await Ingreso.findByIdAndRemove( { _id:id } )
        res.status(205).json({msg:`Tu Ingreso con nombre ${nomIngreso}, fue eliminado.`});
       
    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(500).json({msg: `Hubo un error en la comunicación !! `});
    }
}