const Actividad = require('../models/Actividad');
const bcrypt = require('bcrypt');

const {validationResult} = require('express-validator');

exports.newActividad = async(req, res)=>{
    //Mostrar mensaje de error de express-validator 
    const errores  = validationResult(req); 

    if (!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }
    
    //Es una forma de validar si esta llegando bien el json -> Externo generado por postman
    console.log(req.body);
    const {nomActi} = req.body; 

        try {

            // Anexo  Vaidación 
            let  actividad = await Actividad.findOne({nomActi}); 

            if ( actividad ){

                return  res.status(400).json({msg: `La actividad  ${nomActi} ya esta registrado`});

            }

        //Creamos usuario si no esta duplicado 
        actividad = new Actividad(req.body);

            await actividad.save();

            res.json({msj: 'Actividad Creada Exitosamente!!'});

        } catch (error) {
            res.json({msj: `Hubo un  error  en  la comunicación !! -> ${error} `});
        }
}

//Udadate Actividad 
exports.updateActividad = async (req, res)=>{
    
    //Revisar que que cumple con las reglas de validaciòn del routes 
    const errors = validationResult(req);
    if ( !errors.isEmpty() ){
        return res.status(400).json({errores: errors.array()})
    }

  //Extraer informacion para validacion 
  try {
 
        //Distroccion de Json que se envia 
        const {id, nomActi, desActi} = req.body;
        //Valido Actividad 
          let valExiste = await Actividad.findById(id); // Leo : Mucho ojo es la forma de obtener los parametros por post 
  
          if (!valExiste){
              return res.status(404).json({msg:`Tu actividad con nombre ${nomActi}, No existe en la base de datos.`});
          }
        //crear un objeto con la nueva informaciòn 
        const newObj = {}
        newObj.nomActi = nomActi; 
        newObj.desActi = desActi; 

        let nomOld = valExiste.nomActi; 
        
        //Guadar Edicción 
        valExiste = await Actividad.findByIdAndUpdate({ _id: id }, newObj, {new:true});
        res.json({msg:`Tu actividad con nombre ${nomOld}, fue editado.`});
     
  } catch (error) {
      console.log(error);
      res.status(500).send("Error en el servidor");
  }
}

//Delete Actividad
exports.deleteActividad = async (req, res)=>{
    //Extraer informacion del proyecto 
    try {
   
        const {id, nomActi} = req.body;// Asi es cuando se pasa un objeto  es decir un json 
        //Valido Actividad 
        let valExiste = await Actividad.findById(id); // Leo : Mucho ojo es la forma de obtener los parametros por post 
  
        if (!valExiste){
            return res.status(404).json({msg:`Tu actividad con nombre ${nomActi}, No existe en la base de datos.`});
        }

          //Eliminar Actividad 
          await Actividad.findByIdAndRemove( { _id:id } )
          res.json({msg:`Tu actividad con nombre ${nomActi}, fue eliminado.`});
       
    } catch (error) {
        console.log(error);
        res.status(500).send("Error en el servidor.");
    }
  }