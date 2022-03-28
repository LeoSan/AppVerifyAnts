//Importamos  nuestra libreria mongo
const mongoose = require('mongoose');
 
//Importamos funcionalidad de mongo llamada Schema para genear las estructura de la  tabla en la  base de datos
const Schema = mongoose.Schema
 
// Creamos nuestra estructura que tedra nuestra tabla en la base de datos.
const patrimonioSchema = new Schema({
	nomPatrimonio : {
	   type:String,
	   required:true,
	   unique:true,
	   lowercase:true,
	   trim:true,
	},
	desPatrimonio:{
	   type: String,
	   required:false,
	   lowercase:true,
	   trim:true,
	},
    montoPatrimonio:{
        type:Number,
		required:true,
        default:0
    },
	fechaCompra:{
		type:Date, 
		required:false,
	},
	usuario: [{ type: Schema.Types.ObjectId, ref: 'Usuario', required:true }],    	
    categoria:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Categoria',
        required:true,
    },	    
	activo:{
	   type: Number,
	   default:	1
	},
	registro:{
		type:Date, 
		default:Date.now()
	},	
	tipoActivo:{
		type:String,
		required:true,
	}
	
});
//Esta  sentencia nos  permite exportar nuestro modelo  como vemos se pasa como parametros (NombreModelo, EstructuraModelo ) -> definidos previamente.
module.exports = mongoose.model('Patrimonio', patrimonioSchema);