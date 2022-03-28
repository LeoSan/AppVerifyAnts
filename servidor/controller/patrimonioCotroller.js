//Libreria
const {validationResult} = require('express-validator');
const { response,  request } = require('express');
const moment = require('moment');  

//Modelo
const Patrimonio = require('../models/Patrimonio');
const Categoria = require('../models/Categoria');

//Controlador 
const logsCotroller = require('../controller/logsController'); 

//Crea Patrimonio 
exports.newPatrimonio = async(req = request, res = response )=>{
    //Mostrar mensaje de error de express-validator 
    const errores  = validationResult(req); 

    if (!errores.isEmpty()){
        return res.status(201).json({errores: errores.array()});
    }
    
    //Es una forma de validar si esta llegando bien el json -> Externo generado por postman
    const { nomPatrimonio } = req.body; 

        try {
            // Anexo  Vaidación 
            let  patrimonio = await Patrimonio.findOne({nomPatrimonio}); 
            if ( patrimonio ) return  res.status(201).json({msg: `El patrimonio con nombre: ${nomPatrimonio}, Ya existe.`,  success: false });

        //Creamos patrimonio si no esta duplicado 
        patrimonio = new Patrimonio(req.body);
            await patrimonio.save();
            res.status(201).json({ msg: `Tu Patrimonio con nombre ${nomPatrimonio},  fue creado Exitosamente!!`, success: true });

        } catch (error) {
            logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
            res.status(201).json({msg: `Hubo un error en la comunicación !!  `, success: false });
        }
    
}

//Obtener Patrimonio   
exports.getPatrimonio = async ( req = request, res = response ) =>{
    try {
        //Distroccion 
        const { nomPatrimonio, usuario, categoria, activo, tipo } = req.body; //->Asi se usa cuando es un objeto 

        if ( tipo === "1-M" ){
            //Obtener 1-M
            let existeVAl = await Patrimonio.findOne({ usuario }); 

            if(!existeVAl) return res.status(406).json({msg:`No Existe algun tipo de Patrimonio para este usuario.`});
            
             //Ejemplo Multiple de modelos 
            //const patrimonio = await Patrimonio.find( { $and: [{usuario:usuario}, {activo: activo }] } ).populate({ path: 'categoria', model: 'Categoria', select: 'nomCate'}).populate({ path: 'usuario', model: 'Usuario', select: 'nomUsu'}).exec();
            const patrimonio = await Patrimonio.find( { $and: [{usuario:usuario}, {activo: activo }] } ).populate({ path: 'categoria', model: 'Categoria', select: 'nomCate'}).sort({ categoria: -1 });
            res.status(200).json({ patrimonio, success: true });
           
        }else{
            //Obtener 1.1
            let existeVAl = await Patrimonio.findOne({ nomPatrimonio }); 

            if(!existeVAl) return res.status(406).json({msg:`Tu Patrimonio con nombre ${ nomPatrimonio }, No existe en la base de datos.`});
            
            const patrimonio = await Patrimonio.find( { nomPatrimonio } ).populate({ path: 'categoria', model: 'Categoria', select: 'nomCate'}).exec();
            res.status(200).json({ patrimonio, success: true });
        }   

    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(500).json({msg: `Hubo un error en la comunicación !!  `, success: false });
    }
}
//Obtener getPatrimonioCard   
exports.getPatrimonioCard = async ( req = request, res = response ) =>{
    try {
        //Distroccion 
        const {  nickID } = req.body; //->Asi se usa cuando es un objeto 
        
        //Primero Listo las categorias 

        //En la tabla patrimonio extraigo aquellos patrimonios que si tengan la categoria

        //Organizo el Arreglo aun no se como organizar el arreglo 

    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(500).json({msg: `Hubo un error en la comunicación !!  `});
    }
}

//Obtener Patrimonio por Fecha    
exports.getPatrimonioByFecha = async (req = request, res = response ) =>{
    
    const errores  = validationResult(req); 

    if (!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }
    
    try {
        //Distroccion 
        const { fechaConsultar, usuario, categoria, activo} = req.body; //->Asi se usa cuando es un objeto 

            //Valido si existe el usuario
            let existeVAl = await Patrimonio.findOne({ usuario }); 
            if(!existeVAl) return res.status(406).json({msg:`No Existe algun tipo de Patrimonio para este usuario.`});
            
           //Realizo mi query para filtrr fecha y por Usuario y Activo 
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
            //Realizo la consulta 
            const patrimonio = await Patrimonio.find( query  ).populate({ path: 'categoria', model: 'Categoria', select: 'nomCate'}).exec();
            res.status(200).json({ patrimonio });
    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(500).json({msg: `Hubo un error en la comunicación !!  `});
    }
}

//Obtener Patrimonio por Fecha    
exports.getPatrimonioSumaByFecha = async (req = request, res = response ) =>{
    
    const errores  = validationResult(req); 

    if (!errores.isEmpty()){
        return res.status(406).json({errores: errores.array()});
    }
    
    try {
        //Distroccion 
        const { fechaConsultar, usuario, categoria, activo} = req.body; //->Asi se usa cuando es un objeto 

            //Valido si existe el usuario
            let existeVAl = await Patrimonio.findOne({ usuario }); 
            if(!existeVAl) return res.status(406).json({msg:`No Existe algun tipo de Patrimonio para este usuario.`});
            
           //Realizo mi query para filtrr fecha y por Usuario y Activo 
            let today = new Date(fechaConsultar);

                const patrimonio = await Patrimonio.aggregate([
                    { $match:   {   "activo": parseInt(activo),  
                                    $expr: { // la siguiente es una expresión de agregación
                                             $and: [ // indica que cada comparación entre elementos del array se debe satisfacer
                                                        { $eq: [ { $year:       '$registro' }, { $year: today } ] },  // devuelve true si se cumple la igualdad de los elementos
                                                        { $eq: [ { $month:      '$registro' }, { $month: today } ] }
                                                    ] //Fin del and 
                                            }     
                                } 
                    },//Validacion Match 
                    
                    { $group: { _id: "$usuario", total: { $sum: "$montoPatrimonio" } } },
                    
                    { $sort: { total: -1 } }
                 
                ]).exec();                

            res.status(200).json({ patrimonio });
    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(500).json({msg: `Hubo un error en la comunicación !!  `});
    }
}

//Obtener Patrimonio entre fechas Inicio y fin  
exports.getPatrimonioBetweenFecha = async (req = request, res = response ) =>{
    
    const errores  = validationResult(req); 

    if (!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }
    
    try {
        //Distroccion 
        const { fechaInicio, fechaFin,  usuario, categoria, activo, tipo} = req.body; //->Asi se usa cuando es un objeto 

        let start = moment().format(fechaInicio);
        let end = moment().format(fechaFin);

            let existeVAl = await Patrimonio.findOne({ usuario }); 

            if(!existeVAl) return res.status(406).json({msg:`No Existe algun tipo de Patrimonio para este usuario.`});
            
        //Consulta entre fechas 
            //Consulta solo por categoria 
            if ( tipo === "categoria" ){
                const patrimonio = await Patrimonio.find( {"registro": {"$gte": start, "$lt": end }, 'activo': activo,  'usuario': usuario,  'categoria': categoria }).populate({ path: 'categoria', model: 'Categoria', select: 'nomCate'}).exec();
                res.status(200).json({ patrimonio });
            }
            //Consulta solo por Usuario
            if ( tipo === "usuario" ){ 
                const patrimonio = await Patrimonio.find( {"registro": {"$gte": start, "$lt": end }, 'activo': activo,  'usuario': usuario }).populate({ path: 'categoria', model: 'Categoria', select: 'nomCate'}).exec();
                res.status(200).json({ patrimonio });
             }
            
    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(500).json({msg: `Hubo un error en la comunicación !! `});
    }
}

//Udadate Patrimonio 
exports.updatePatrimonio = async (req = request, res = response )=>{
    
    //Revisar que que cumple con las reglas de validaciòn del routes 
    const errors = validationResult(req);
    if ( !errors.isEmpty() ){
        return res.status(406).json({errores: errors.array()})
    }

  //Extraer informacion para validacion 
  try {
        //Distroccion de Json que se envia 
        const { id, nomPatrimonio, desPatrimonio, montoPatrimonio,  idCategoria, activo } = req.body; //->Asi se usa cuando es un objeto 
        //Valido Categoria 
        let valExiste = await Patrimonio.findById( id ); 
  
        if (!valExiste) return res.status(406).json({msg:`Tu Patrimonio con nombre ${nomPatrimonio}, No existe en la base de datos.`, success: false});
        
        //crear un objeto con la nueva informaciòn 
        const newObj        = {}
        newObj.nomPatrimonio   = nomPatrimonio; 
        newObj.desPatrimonio   = desPatrimonio; 
        newObj.montoPatrimonio = montoPatrimonio; 
        newObj.categoria       = idCategoria; 
        newObj.activo          = activo; 

        let nomOld = valExiste.nomPatrimonio; 
        
        //Guadar Edicción 
        valExiste = await Patrimonio.findByIdAndUpdate({ _id: id }, newObj, {new:true});
        res.status(205).json({msg:`Tu Patrimonio con nombre ${nomOld}, fue editado.`, success: true});
  } catch (error) {
      logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
      res.status(500).json({msg: `Hubo un error en la comunicación !!  `, success: false});
  }
}

//Delete Patrimonio
exports.deletePatrimonio = async (req = request, res = response )=>{
    try {
        const {id, nomPatrimonio} = req.body;// Asi es cuando se pasa un objeto  es decir un json tienes param, query, body
        //Valido Patrimonio 
        let valExiste = await Patrimonio.findById(id); 
  
        if (!valExiste) return res.status(406).json({msg:`Tu Patrimonio con nombre ${nomPatrimonio}, No existe en la base de datos.`, success: false});

        //Eliminar Patrimonio 
        await Patrimonio.findByIdAndRemove( { _id:id } )
        res.status(200).json({msg:`Tu Patrimonio con nombre ${nomPatrimonio}, fue eliminado.`, success: true});
       
    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(500).json({msg: `Hubo un error en la comunicación !!  `, success: false});
    }
}