//Libreria
const {validationResult} = require('express-validator');
//Modelo 
const Recurrente = require('../models/Recurrente');
//Controlador 
const logsCotroller = require('../controller/logsController'); 

//Crear recurrente
exports.newRecurrente = async(req, res)=>{
    //Mostrar mensaje de error de express-validator 
    const errores  = validationResult(req); 
    if (!errores.isEmpty())  return res.status(400).json({errores: errores.array()});
    
    //Es una forma de validar si esta llegando bien el json -> Externo generado por postman
    console.log(req.body);
    const {nomRecu} = req.body; 

        try {
            // Anexo  Vaidación 
            let  recurrente = await Recurrente.findOne({nomRecu}); 

            if ( recurrente ) return  res.status(400).json({msg: `La categoria recurrente No la puedes repetir, ${nomRecu}`});

            //Creamos Categoria si no esta duplicado 
        recurrente = new Recurrente(req.body);
            await recurrente.save();
            res.json({msj: 'Categoria Recurrente Creada Exitosamente!!'});

        } catch (error) {
            res.json({msj: `Hubo un error en la comunicación !! -> ${error} `});
        }
}

//Obtener Recurrente   
exports.getRecurrente = async (req, res) =>{
    try {
        //Distroccion 
        const { nomRecu, activo, tipo } = req.body; //->Asi se usa cuando es un objeto 

        if ( tipo === "1-M" ){
            //Obtener 1-M
            let existeVAl = await Recurrente.findOne({ activo }); 

            if(!existeVAl) return res.status(404).json({msg:`No Existe algun tipo de Recurrente activo.`});
            
             //Ejemplo Multiple de modelos 
            //const recurrente = await Recurrente.find( { $and: [{usuario:usuario}, {activo: activo }] } ).populate({ path: 'usuario', model: 'Usuario', select: 'nomUsu'}).populate({ path: 'usuario', model: 'Usuario', select: 'nomUsu'}).exec();
            const recurrente = await Recurrente.find( { $and: [{activo: activo }] } );
            res.status(200).json({ recurrente });
           
        }else{
            //Obtener 1.1
            let existeVAl = await Recurrente.findOne({ nomRecu }); 

            if(!existeVAl) return res.status(404).json({msg:`Tu Recurrencia con nombre ${ nomRecu }, No existe en la base de datos.`});
            
            const recurrente = await Recurrente.find( { nomRecu } ).exec();
            res.status(200).json({ recurrente });
        }   

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//Udadate Recurrente 
exports.updateRecurrente = async (req, res)=>{
    
    //Revisar que que cumple con las reglas de validaciòn del routes 
    const errors = validationResult(req);
    if ( !errors.isEmpty() ){
        return res.status(400).json({errores: errors.array()})
    }

  //Extraer informacion para validacion 
  try {
        //Distroccion de Json que se envia 
        const { id, nomRecu, desRecu, activo } = req.body; //->Asi se usa cuando es un objeto 
        //Valido Categoria 
          let valExiste = await Recurrente.findById( id ); 
  
        if (!valExiste) return res.status(404).json({msg:`Tu Recurrente con nombre ${nomRecu}, No existe en la base de datos.`});
        
        //crear un objeto con la nueva informaciòn 
        const newObj        = {}
        newObj.nomRecu   = nomRecu; 
        newObj.desRecu   = desRecu; 
        newObj.activo    = activo; 

        let nomOld = valExiste.nomRecu; 
        
        //Guadar Edicción 
        valExiste = await Recurrente.findByIdAndUpdate({ _id: id }, newObj, {new:true});
        res.status(200).json({msg:`Tu Recurrencia con nombre ${nomOld}, fue editado.`});
     
  } catch (error) {
      console.log(error);
      res.status(500).send("Error en el servidor");
  }
}

//Delete Recurrente
exports.deleteRecurrente = async (req, res)=>{
        //Revisar que que cumple con las reglas de validaciòn del routes 
        const errors = validationResult(req);
        if ( !errors.isEmpty() ){
            return res.status(400).json({errores: errors.array()})
        }
    
    try {
        const {id, nomRecu} = req.body;// Asi es cuando se pasa un objeto  es decir un json tienes param, query, body
        //Valido Recurrente 
        let valExiste = await Recurrente.findById(id); 
  
        if (!valExiste) return res.status(404).json({msg:`Tu Recurrencia con nombre ${nomRecu}, No existe en la base de datos.`});

        //Eliminar Recurrente 
        await Recurrente.findByIdAndRemove( { _id:id } )
        res.status(200).json({msg:`Tu Recurrencia con nombre ${nomRecu}, fue eliminado.`});
       
    } catch (error) {
        console.log(error);
        res.status(500).send("Error en el servidor.");
    }
}