//Librerias 
const moment = require('moment');  
//Modelos 
const Acto = require('../models/Acto');
//Controladores 
const logsCotroller = require('./logsController'); 

require('dotenv').config({ path :'./config/variables.env'});

//Crear  Acto 
exports.newActo = async(req, res)=>{
    const {nomActo} = req.body; 
    try {
        //Vaidación 
        let  acto = await Acto.findOne({nomActo}); 
        if ( acto ) return  res.status(200).json({msg: `La actividad No la puedes repetir, ${nomActo}`, success:false});            
    //Creamos Acto si no esta duplicado 
        acto = new Acto(req.body);
        await acto.save();
        res.status(200).json({msg: `Tu Actividad con nombre ${nomActo},  fue creada Exitosamente!!`, success:true});
    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(200).json({msg: `Hubo un error en la comunicación !! `, success:false});
    }
}

//Obtener Acto  
exports.getActo = async (req, res) =>{
    //Extraer proyecto 
    try {
        //Distroccion 
        const { nomActo, autor, tipo } = req.body; //->Asi se usa cuando es un objeto 
        
        let existeVAl = await Acto.findOne({ autor }); 

        if(!existeVAl) return res.status(200).json({msg:`Tu acción con nombre ${ nomActo }, No existe en la base de datos.`, success:false});

        //Verificar el autor  
        if (existeVAl.autor.toString() !== autor ){
            return res.status(200).json({msg:'No autorizado', success:false});
        }

        if ( tipo === "1-M" ){
            //Obtener 1-M
            //const acto = await acto.find({ autor }).sort({autor:-1});
            const acto = await Acto.find({ autor }).populate({ path: 'categoria', model: 'Categoria', select: 'nomCate' }).sort({ nomActo: -1 });
            res.status(200).json({ acto, success:true });
       }else{
            //Obtener 1.1
            const acto = await Acto.find({ nomActo }).sort({autor:-1});
            res.status(200).json({ acto , success:true});
        }     
    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(200).json({msg: `Hubo un error en la comunicación !! `, success:false});
    }
}

//Eliminar Acto
exports.deleteActo = async (req, res)=>{
    //Extraer informacion del proyecto 
    try {
          //Extraer proyecto y comprobar si existe
          const {id, nomActo} = req.body;// Asi es cuando se pasa un objeto  es decir un json 
          console.log("body", req.body);
          //const {acto} = req.query;// Asi es cuando se pasa parametros 
  
          //Si la tarea existe o no
          let accionExiste = await Acto.findById(id); 
  
          if (!accionExiste) return res.status(200).json({msg:`Tu acto con nombre ${nomActo}, No existe en la base de datos.`, success:false});
          
          //Eliminar Acto 
          await Acto.findByIdAndRemove({ _id:id })
          res.status(200).json({msg:`Tu acción con nombre ${nomActo}, fue eliminado.`, success:true});
       
    } catch (error) {
        logsCotroller.logsCRUD(`Hubo un error en la comunicación !! -> ${error} `);
        res.status(200).json({msg: `Hubo un error en la comunicación !! `, success:false});
    }
}


