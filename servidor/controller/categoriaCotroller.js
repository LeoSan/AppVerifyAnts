const Categoria = require('../models/Categoria');

const {validationResult} = require('express-validator');

exports.newCategoria = async(req, res)=>{
    //Mostrar mensaje de error de express-validator 
    const errores  = validationResult(req); 

    if (!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }
    
    //Es una forma de validar si esta llegando bien el json -> Externo generado por postman
    console.log(req.body);
    const {nomCate} = req.body; 

        try {

            // Anexo  Vaidación 
            let  categoria = await Categoria.findOne({nomCate}); 

            if ( categoria ){

                return  res.status(400).json({msg: `La categoria No la puedes repetir, ${nomCate}`});

            }

        //Creamos Categoria si no esta duplicado 
            categoria = new Categoria(req.body);
            await categoria.save();
            res.json({msj: 'Categoria Creada Exitosamente!!'});

        } catch (error) {
            res.json({msj: `Hubo un error en la comunicación !! -> ${error} `});
        }
}

//Udadate Categoria 
exports.updateCategoria = async (req, res)=>{
    
    //Revisar que que cumple con las reglas de validaciòn del routes 
    const errors = validationResult(req);
    if ( !errors.isEmpty() ){
        return res.status(400).json({errores: errors.array()})
    }

  //Extraer informacion para validacion 
  try {
        //Distroccion de Json que se envia 
        const {id, nomCate, desCate, actividad} = req.body;
        //Valido Categoria 
          let valExiste = await Categoria.findById(id); // Leo : Mucho ojo es la forma de obtener los parametros por post 
  
          if (!valExiste){
              return res.status(404).json({msg:`Tu Categoria con nombre ${nomCate}, No existe en la base de datos.`});
          }
        //crear un objeto con la nueva informaciòn 
        const newObj     = {}
        newObj.nomCate   = nomCate; 
        newObj.desCate   = desCate; 
        newObj.actividad = actividad; 

        let nomOld = valExiste.nomCate; 
        
        //Guadar Edicción 
        valExiste = await Categoria.findByIdAndUpdate({ _id: id }, newObj, {new:true});
        res.json({msg:`Tu Categoria con nombre ${nomOld}, fue editado.`});
     
  } catch (error) {
      console.log(error);
      res.status(500).send("Error en el servidor");
  }
}

//Delete Categoria
exports.deleteCategoria = async (req, res)=>{
    //Extraer informacion del proyecto 
    try {
   
        const {id, nomCate} = req.body;// Asi es cuando se pasa un objeto  es decir un json 
        //Valido Categoria 
        let valExiste = await Categoria.findById(id); // Leo : Mucho ojo es la forma de obtener los parametros por post 
  
        if (!valExiste){
            return res.status(404).json({msg:`Tu Categoria con nombre ${nomCate}, No existe en la base de datos.`});
        }

        //Eliminar Categoria 
        await Categoria.findByIdAndRemove( { _id:id } )
        res.json({msg:`Tu Categoria con nombre ${nomCate}, fue eliminado.`});
       
    } catch (error) {
        console.log(error);
        res.status(500).send("Error en el servidor.");
    }
  }