//Libreria
const {validationResult} = require('express-validator');
//Modelo
const Patrimonio = require('../models/Patrimonio');
//Controlador 
const logsCotroller = require('../controller/logsController'); 

//Crea Patrimonio 
exports.newPatrimonio = async(req, res)=>{
    //Mostrar mensaje de error de express-validator 
    const errores  = validationResult(req); 

    if (!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }
    
    //Es una forma de validar si esta llegando bien el json -> Externo generado por postman
    console.log(req.body);
    const { nomPatrimonio } = req.body; 

        try {
            // Anexo  Vaidación 
            let  patrimonio = await Patrimonio.findOne({nomPatrimonio}); 

            if ( patrimonio ) return  res.status(400).json({msg: `El patrimonio No la puedes repetir, ${nomPatrimonio}`});

        //Creamos patrimonio si no esta duplicado 
        patrimonio = new Patrimonio(req.body);
            await patrimonio.save();
            res.json({msj: 'Creado Exitosamente!!'});

        } catch (error) {
            logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
            res.json({msj: `Hubo un error en la comunicación !! -> ${error} `});
        }
}

//Obtener Patrimonio   
exports.getPatrimonio = async (req, res) =>{
    try {
        //Distroccion 
        const { nomPatrimonio, usuario, categoria, activo, tipo } = req.body; //->Asi se usa cuando es un objeto 

        if ( tipo === "1-M" ){
            //Obtener 1-M
            let existeVAl = await Patrimonio.findOne({ usuario }); 

            if(!existeVAl) return res.status(404).json({msg:`No Existe algun tipo de Patrimonio para este usuario.`});
            
             //Ejemplo Multiple de modelos 
            //const patrimonio = await Patrimonio.find( { $and: [{usuario:usuario}, {activo: activo }] } ).populate({ path: 'categoria', model: 'Categoria', select: 'nomCate'}).populate({ path: 'usuario', model: 'Usuario', select: 'nomUsu'}).exec();
            const patrimonio = await Patrimonio.find( { $and: [{usuario:usuario}, {activo: activo }] } ).populate({ path: 'categoria', model: 'Categoria', select: 'nomCate'}).exec();
            res.status(200).json({ patrimonio });
           
        }else{
            //Obtener 1.1
            let existeVAl = await Patrimonio.findOne({ nomPatrimonio }); 

            if(!existeVAl) return res.status(404).json({msg:`Tu Patrimonio con nombre ${ nomPatrimonio }, No existe en la base de datos.`});
            
            const patrimonio = await Patrimonio.find( { nomPatrimonio } ).populate({ path: 'categoria', model: 'Categoria', select: 'nomCate'}).exec();
            res.status(200).json({ patrimonio });
        }   

    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(500).send('Hubo un error');
    }
}


//Obtener Patrimonio por Fecha    
exports.getPatrimonioByFecha = async (req, res) =>{
    
    const errores  = validationResult(req); 

    if (!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }
    
    try {
        //Distroccion 
        const { fechaConsultar, usuario, categoria, activo} = req.body; //->Asi se usa cuando es un objeto 

            //Valido si existe el usuario
            let existeVAl = await Patrimonio.findOne({ usuario }); 
            if(!existeVAl) return res.status(404).json({msg:`No Existe algun tipo de Patrimonio para este usuario.`});
            
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
        res.status(500).send(`Hubo un error en la comunicación !! -> ${error} `);
    }
}

//Udadate Patrimonio 
exports.updatePatrimonio = async (req, res)=>{
    
    //Revisar que que cumple con las reglas de validaciòn del routes 
    const errors = validationResult(req);
    if ( !errors.isEmpty() ){
        return res.status(400).json({errores: errors.array()})
    }

  //Extraer informacion para validacion 
  try {
        //Distroccion de Json que se envia 
        const { id, nomPatrimonio, desPatrimonio, montoPatrimonio,  idCategoria, activo } = req.body; //->Asi se usa cuando es un objeto 
        //Valido Categoria 
          let valExiste = await Patrimonio.findById( id ); 
  
        if (!valExiste) return res.status(404).json({msg:`Tu Patrimonio con nombre ${nomPatrimonio}, No existe en la base de datos.`});
        
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
        res.status(200).json({msg:`Tu Patrimonio con nombre ${nomOld}, fue editado.`});
     
  } catch (error) {
      logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
      res.status(500).send("Error en el servidor");
  }
}

//Delete Patrimonio
exports.deletePatrimonio = async (req, res)=>{
    try {
        const {id, nomPatrimonio} = req.body;// Asi es cuando se pasa un objeto  es decir un json tienes param, query, body
        //Valido Patrimonio 
        let valExiste = await Patrimonio.findById(id); 
  
        if (!valExiste) return res.status(404).json({msg:`Tu Patrimonio con nombre ${nomPatrimonio}, No existe en la base de datos.`});

        //Eliminar Patrimonio 
        await Patrimonio.findByIdAndRemove( { _id:id } )
        res.status(200).json({msg:`Tu Patrimonio con nombre ${nomPatrimonio}, fue eliminado.`});
       
    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(500).send("Error en el servidor.");
    }
}