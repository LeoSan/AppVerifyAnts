//Libreria
const { response,  request } = require('express');
//Modelo 
const Recurrente = require('../models/Recurrente');
//Controlador 
const logsCotroller = require('../controller/logsController'); 

//Crear recurrente
exports.newRecurrente = async(req = request, res = response)=>{
   //Es una forma de validar si esta llegando bien el json -> Externo generado por postman
    //console.log(req.body);
    const {nomRecu} = req.body; 

        try {
            // Anexo  Vaidación 
            let  recurrente = await Recurrente.findOne({nomRecu}); 

            if ( recurrente ) return  res.status(200).json({msg: `La categoria recurrente No la puedes repetir, ${nomRecu}`, success:false});

            //Creamos Categoria si no esta duplicado 
        recurrente = new Recurrente(req.body);
            await recurrente.save();
            res.status(201).json({msg: `¡ Tu Subcategoria  "${nomRecu}", fue creada exitosamente !`, success:true});

        } catch (error) {
            logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
            res.status(500).json({msg: `Hubo un error en la comunicación !! `, success:false});
        }
}

//Obtener Recurrente   
exports.getRecurrente = async (req = request, res = response) =>{
    try {
        //Distroccion 
        const { nomRecu, activo, tipo } = req.body; //->Asi se usa cuando es un objeto 

        if ( tipo === "1-M" ){
            //Obtener 1-M
            let existeVAl = await Recurrente.findOne({ activo }); 

            if(!existeVAl) return res.status(200).json({msg:`No Existe algun tipo de Recurrente activo.`, success:false});
            
             //Ejemplo Multiple de modelos 
            //const recurrente = await Recurrente.find( { $and: [{usuario:usuario}, {activo: activo }] } ).populate({ path: 'usuario', model: 'Usuario', select: 'nomUsu'}).populate({ path: 'usuario', model: 'Usuario', select: 'nomUsu'}).exec();
            const recurrente = await Recurrente.find( { $and: [{activo: activo }] } );
            res.status(200).json({ recurrente, success:true });
           
        }else{
            //Obtener 1.1
            let existeVAl = await Recurrente.findOne({ nomRecu }); 

            if(!existeVAl) return res.status(200).json({msg:`Tu Recurrencia con nombre ${ nomRecu }, No existe en la base de datos.`, success:false});
            
            const recurrente = await Recurrente.find( { nomRecu } ).exec();
            res.status(200).json({ recurrente , success:true});
        }   

    } catch (error) {
        
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(200).json({msg: `Hubo un error en la comunicación !! `, success:false});
    }
}

//Udadate Recurrente 
exports.updateRecurrente = async (req = request, res = response)=>{
 
  //Extraer informacion para validacion 
  try {
        //Distroccion de Json que se envia 
        const { id, nomRecu, desRecu, activo } = req.body; //->Asi se usa cuando es un objeto 
        //Valido Categoria 
          let valExiste = await Recurrente.findById( id ); 
  
        if (!valExiste) return res.status(200).json({msg:`Tu Recurrente con nombre ${nomRecu}, No existe en la base de datos.`, success:false});
        
        //crear un objeto con la nueva informaciòn 
        const newObj        = {}
        newObj.nomRecu   = nomRecu; 
        newObj.desRecu   = desRecu; 
        newObj.activo    = activo; 

        let nomOld = valExiste.nomRecu; 
        
        //Guadar Edicción 
        valExiste = await Recurrente.findByIdAndUpdate({ _id: id }, newObj, {new:true});
        res.status(200).json({msg:`Tu Recurrencia con nombre "${nomOld}", fue editado.`, success:true});
     
  } catch (error) {
      logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
      res.status(200).json({msg: `Hubo un error en la comunicación !! `, success:false});
  }
}

//Delete Recurrente
exports.deleteRecurrente = async (req = request, res = response)=>{

    try {
        const {id, nomRecu} = req.body;// Asi es cuando se pasa un objeto  es decir un json tienes param, query, body
        //Valido Recurrente 
        let valExiste = await Recurrente.findById(id); 
  
        if (!valExiste) return res.status(200).json({msg:`Tu Recurrencia con nombre ${nomRecu}, No existe en la base de datos.`, success:false});

        //Eliminar Recurrente 
        await Recurrente.findByIdAndRemove( { _id:id } )
        res.status(200).json({msg:`Tu Recurrencia con nombre ${nomRecu}, fue eliminado.`, success:true});
       
    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(200).json({msg: `Hubo un error en la comunicación !! `, success:false});
    }
}