//Importamos  nuestra libreria mongo
const mongoose = require('mongoose');
 
//Importamos funcionalidad de mongo llamada Schema para genear las estructura de la  tabla en la  base de datos
const Schema = mongoose.Schema
 
// Creamos nuestra estructura que tedra nuestra tabla en la base de datos.
const usuariosSchema = new Schema({
	emailUsu : {
	   type:String,
	   required:true,
	   unique:true,
	   lowercase:true,
	   trim:true,
	},
	nomUsu:{
	   type: String,
	   required:true,
	   lowercase:true,
	   trim:true,
	},
	password:{
	   type: String,
	   required:true,
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
module.exports = mongoose.model('Usuario', usuariosSchema);