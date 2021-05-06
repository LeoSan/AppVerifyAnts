//Importamos  nuestra libreria mongo
const mongoose = require('mongoose');
 
//Importamos funcionalidad de mongo llamada Schema para genear las estructura de la  tabla en la  base de datos
const Schema = mongoose.Schema
 
// Creamos nuestra estructura que tedra nuestra tabla en la base de datos.
const gastoSchema = new Schema({
	nomGasto : {
	   type:String,
	   required:true,
	   unique:true,
	   lowercase:true,
	   trim:true,
	},
	desGasto:{
	   type: String,
	   required:false,
	   lowercase:true,
	   trim:true,
	},
    montoGasto:{
        type:Number,
		required:true,
        default:0
    },	
    usuario:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    },
    categoria:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Categoria',
        required:true
    },    
	recurrente:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Recurrente',
        required:false
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
//Esta  sentencia nos  permite exportar nuestro modelo  como vemos se pasa como parametros (NombreModelo, EstructuraModelo ) -> definidos previamente.
module.exports = mongoose.model('Gasto', gastoSchema);