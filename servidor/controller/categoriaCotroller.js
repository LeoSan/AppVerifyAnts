//Librerias
const {validationResult} = require('express-validator');
//Modelos 
const Categoria = require('../models/Categoria');
//Controladores 
const logsCotroller = require('../controller/logsController'); 

//Crear Categoria  
exports.newCategoria = async(req, res)=>{
    const {nomCate} = req.body; 
    try {
        // Anexo  Vaidación 
        let  categoria = await Categoria.findOne({nomCate}); 

        if ( categoria ) return  res.status(200).json({msg: `La categoria No la puedes repetir, ${nomCate}`, success:false});

    //Creamos Categoria si no esta duplicado 
        categoria = new Categoria(req.body);
        await categoria.save();
        res.status(201).json({msg: `¡ Tu Categoria  "${nomCate}", fue creada exitosamente !`, success:true});

    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(200).json({msg: `Hubo un error en la comunicación !! -> ${error} `, success:false});
    }
}

//Obtener Categoria  
exports.getCategoria = async (req, res) =>{
    //Extraer proyecto 
    try {
        //Distroccion 
        const { nomCate, autor, activo, tipo } = req.body; //->Asi se usa cuando es un objeto 
          

        if ( tipo == "1-M" ){
            //Obtener 1-M
            let existeVAl = await Categoria.findOne({ autor }); 

            if(!existeVAl) return res.status(200).json({msg:`No Existe categorias para este usuario.`, success:false});

            const categoria = await Categoria.find( { $and: [{autor:autor}, {activo: activo }] } ).populate({ path: 'actividad', model: 'Actividad', select: 'nomActi'}).sort({nomCate:-1});
            res.status(200).json({ categoria , success:true });

        }else{
            //Obtener 1.1
            let existeVAl = await Categoria.findOne({ nomCate }); 

            if(!existeVAl) return res.status(200).json({msg:`Tu categoria con nombre ${ nomCate }, No existe en la base de datos.`, success:false});

            const categoria = await Categoria.find({ nomCate }).populate({ path: 'actividad', model: 'Actividad', select: 'nomActi'});
            res.status(200).json({ categoria, success:true });
        }   

    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        //res.status(500).send('Hubo un error');
        res.status(200).json({msg: `Hubo un  error  en  la comunicación !!  `, success:false});
    }
}

//Udadate Categoria 
exports.updateCategoria = async (req, res)=>{
    
 
  //Extraer informacion para validacion 
  try {
        //Distroccion de Json que se envia 
        const {id, nomCate, desCate, actividad} = req.body;
        //Valido Categoria 
          let valExiste = await Categoria.findById(id); // Leo : Mucho ojo es la forma de obtener los parametros por post 
  
          if (!valExiste) return res.status(200).json({msg:`Tu Categoria con nombre ${nomCate}, No existe en la base de datos.`, success:false});
          
        //crear un objeto con la nueva informaciòn 
        const newObj     = {}
        newObj.nomCate   = nomCate; 
        newObj.desCate   = desCate; 
        newObj.actividad = actividad; 

        let nomOld = valExiste.nomCate; 
        
        //Guadar Edicción 
        valExiste = await Categoria.findByIdAndUpdate({ _id: id }, newObj, {new:true});
        res.status(200).json({msg:`Tu Categoria con nombre ${nomOld}, fue editada.`, success:true});
     
  } catch (error) {
      logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
      //res.status(500).send("Error en el servidor");
      res.status(200).json({msg: `Hubo un  error  en  la comunicación !!  `, success:false});
  }
}

//Delete Categoria
exports.deleteCategoria = async (req, res)=>{
    //Extraer informacion del proyecto 
    try {
        const {id, nomCate} = req.body;// Asi es cuando se pasa un objeto  es decir un json 
        //Valido Categoria 
        let valExiste = await Categoria.findById(id); // Leo : Mucho ojo es la forma de obtener los parametros por post 
  
        if (!valExiste)  return res.status(200).json({msg:`Tu Categoria con nombre ${nomCate}, No existe en la base de datos.`, success:false});
        
        //Eliminar Categoria 
        await Categoria.findByIdAndRemove( { _id:id } )
        res.status(200).json({msg:`Tu Categoria con nombre ${nomCate}, fue eliminado.`, success:true});
       
    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(200).json({msg: `Hubo un  error  en  la comunicación !!  `, success:false});
    }
}