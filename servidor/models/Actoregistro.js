//Importamos  nuestra libreria mongo
const mongoose = require('mongoose');
 
//Importamos funcionalidad de mongo llamada Schema para genear las estructura de la  tabla en la  base de datos
const Schema = mongoose.Schema
 
// Creamos nuestra estructura que tedra nuestra tabla en la base de datos.
const ActoregistroSchema = new Schema({
    autor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Usuario',
        required:true,
    },
    acto:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Acto',
        required:true,
    },	
	duracion:{
	   type: Number,
	   default:	1
	},	
	nota:{
		type:String,
		lowercase:true,
		trim:true,
	},	
	activo:{
	   type: Number,
	   default:	1
	},
	registro:{
		type:Date, 
		default:Date.now()
	}
	
});
//Esta  sentencia nos  permite eportar nuestro modelo  como vemos se pasa como parametros (NombreModelo, EstructuraModelo ) -> definidos previamente.
module.exports = mongoose.model('Actoregistro', ActoregistroSchema);