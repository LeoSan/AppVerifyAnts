//Librerias 
const {validationResult} = require('express-validator');
const { reponse, request } = require('express');
//Modelos 
const Actividad = require('../models/Actividad');
//Controladores 
const logsCotroller = require('../controller/logsController'); 

//Crear Actividad
exports.newActividad = async(req = request, res = reponse)=>{
    //Mostrar mensaje de error de express-validator 
    const errores  = validationResult(req); 

    if (!errores.isEmpty()){
        return res.status(406).json({errores: errores.array()});
    }
    
    //Es una forma de validar si esta llegando bien el json -> Externo generado por postman
    //console.log(req.body);
    const {nomActi} = req.body; 

        try {

            // Anexo  Vaidación 
            let  actividad = await Actividad.findOne({nomActi}); 

            if ( actividad ) return  res.status(406).json({msg: `La actividad  ${nomActi},  no se puede repetir.`});

        //Creamos usuario si no esta duplicado 
        actividad = new Actividad(req.body);

            await actividad.save();

            res.status(201).json({msg: 'Actividad creada Exitosamente!!'});

        } catch (error) {
            logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
            res.status(500).json({msg: `Hubo un  error  en  la comunicación !!  `});
            
        }
}

//Obtener Actividd  
exports.getActividad = async (req = request, res = reponse) =>{
    //Extraer proyecto 
    try {
        //Distroccion 
        const { nomActi, activo, tipo } = req.body; //->Asi se usa cuando es un objeto 
        
        let existeVAl = await Actividad.findOne({ nomActi }); 

        if(!existeVAl)return res.status(406).json({msg:`Tu acción con nombre ${ nomActi }, No existe en la base de datos.`});

        if ( tipo === "1-M" ){
            //Obtener 1-M
            const actividad = await Actividad.find({ activo }).sort({nomActi:-1});
            res.status(200).json({ actividad });
       }else{
            //Obtener 1.1
            const actividad = await Actividad.find({ nomActi });
            res.status(200).json({ actividad });
        }   

    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(500).json({msg: `Hubo un  error  en  la comunicación !!  `});
    }
}

//Udadate Actividad 
exports.updateActividad = async (req = request, res = reponse)=>{
    
    //Revisar que que cumple con las reglas de validaciòn del routes 
    const errors = validationResult(req);
    if ( !errors.isEmpty() ){
        return res.status(406).json({errores: errors.array()})
    }

  //Extraer informacion para validacion 
  try {
 
        //Distroccion de Json que se envia 
        const {id, nomActi, desActi} = req.body;
        //Valido Actividad 
          let valExiste = await Actividad.findById(id); // Leo : Mucho ojo es la forma de obtener los parametros por post 
  
          if (!valExiste) return res.status(406).json({msg:`Tu actividad con nombre ${nomActi}, No existe en la base de datos.`});
          
        //crear un objeto con la nueva informaciòn 
        const newObj = {}
        newObj.nomActi = nomActi; 
        newObj.desActi = desActi; 

        let nomOld = valExiste.nomActi; 
        
        //Guadar Edicción 
        valExiste = await Actividad.findByIdAndUpdate({ _id: id }, newObj, {new:true});
        res.status(205).json({msg:`Tu actividad con nombre ${nomOld}, fue editado.`});
     
  } catch (error) {
      logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
      //res.status(500).send("Error en el servidor");
      res.status(500).json({msg: `Hubo un  error  en  la comunicación !!  `});
  }
}

//Delete Actividad
exports.deleteActividad = async (req = request, res = reponse)=>{
    //Extraer informacion del proyecto 
    try {
        const {id, nomActi} = req.body;// Asi es cuando se pasa un objeto  es decir un json 
        //Valido Actividad 
        let valExiste = await Actividad.findById(id); // Leo : Mucho ojo es la forma de obtener los parametros por post 
  
        if (!valExiste) return res.status(406).json({msg:`Tu actividad con nombre ${nomActi}, No existe en la base de datos.`});

        //Eliminar Actividad 
        await Actividad.findByIdAndRemove( { _id:id } )
        res.status(205).json({msg:`Tu actividad con nombre ${nomActi}, fue eliminado.`});
       
    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        //res.status(500).send("Error en el servidor.");
        res.status(500).json({msg: `Hubo un  error  en  la comunicación !!  `});
    }
}