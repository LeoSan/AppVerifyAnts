const Ingreso = require('../models/Ingreso');


const {validationResult} = require('express-validator');

//Crear Ingreso
exports.newIngreso = async(req, res)=>{
    //Mostrar mensaje de error de express-validator 
    const errores  = validationResult(req); 

    if (!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }
    
    //Es una forma de validar si esta llegando bien el json -> Externo generado por postman
    console.log(req.body);
    const {nomIngreso} = req.body; 

        try {
            // Anexo  Vaidación 
            let  ingreso = await Ingreso.findOne({nomIngreso}); 
            if ( ingreso ) return  res.status(400).json({msg: `El ingreso No la puedes repetir, ${nomIngreso}`});

        //Creamos Ingreso si no esta duplicado 
        ingreso = new Ingreso(req.body);
            await ingreso.save();
            res.json({msj: 'Creado Exitosamente!!'});
        } catch (error) {
            res.json({msj: `Hubo un error en la comunicación !! -> ${error} `});
        }
}

//Obtener Ingresos
exports.getIngreso = async (req, res) =>{
    try {
        //Distroccion 
        const { nomIngreso, usuario, categoria, activo, tipo } = req.body; //->Asi se usa cuando es un objeto 

        if ( tipo === "1-M" ){
            //Obtener 1-M
            let existeVAl = await Ingreso.findOne({ usuario }); 

            if(!existeVAl) return res.status(404).json({msg:`No Existe algun tipo de Ingreso para este usuario.`});
            
             //Ejemplo Multiple de modelos 
            //const ingreso = await Ingreso.find( { $and: [{usuario:usuario}, {activo: activo }] } ).populate({ path: 'categoria', model: 'Categoria', select: 'nomCate'}).populate({ path: 'usuario', model: 'Usuario', select: 'nomUsu'}).exec();
            const ingreso = await Ingreso.find( { $and: [{usuario:usuario}, {activo: activo }] } ).populate({ path: 'categoria', model: 'Categoria', select: 'nomCate'}).exec();
            res.status(200).json({ ingreso });
           
        }else{
            //Obtener 1.1
            let existeVAl = await Ingreso.findOne({ nomIngreso }); 

            if(!existeVAl) return res.status(404).json({msg:`Tu Ingreso con nombre ${ nomIngreso }, No existe en la base de datos.`});
            
            const ingreso = await Ingreso.find( { nomIngreso } ).populate({ path: 'categoria', model: 'Categoria', select: 'nomCate'}).exec();
            res.status(200).json({ ingreso });
        }   

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//Udadate Ingreso 
exports.updateIngreso = async (req, res)=>{
    
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
  
        if (!valExiste) return res.status(404).json({msg:`Tu Ingreso con nombre ${nomIngreso}, No existe en la base de datos.`});
        
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
        res.status(200).json({msg:`Tu Ingreso con nombre ${nomOld}, fue editado.`});
     
  } catch (error) {
      console.log(error);
      res.status(500).send("Error en el servidor");
  }
}

//Delete Ingreso
exports.deleteIngreso = async (req, res)=>{
    try {
        const {id, nomIngreso} = req.body;// Asi es cuando se pasa un objeto  es decir un json tienes param, query, body
        //Valido Ingreso 
        let valExiste = await Ingreso.findById(id); 
  
        if (!valExiste) return res.status(404).json({msg:`Tu Ingreso con nombre ${nomIngreso}, No existe en la base de datos.`});

        //Eliminar Ingreso 
        await Ingreso.findByIdAndRemove( { _id:id } )
        res.status(200).json({msg:`Tu Ingreso con nombre ${nomIngreso}, fue eliminado.`});
       
    } catch (error) {
        console.log(error);
        res.status(500).send("Error en el servidor.");
    }
}