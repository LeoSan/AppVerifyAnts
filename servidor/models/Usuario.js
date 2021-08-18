//Importamos  nuestra libreria mongo
const mongoose = require('mongoose');
 
//Importamos funcionalidad de mongo llamada Schema para genear las estructura de la  tabla en la  base de datos
const Schema = mongoose.Schema
 
// Creamos nuestra estructura que tedra nuestra tabla en la base de datos.
const usuariosSchema = new Schema({
	emailUsu: {
	   type:String,
	   required:[true, 'El  correo es Obligatorio.'],
	   unique:true,
	   lowercase:true,
	   trim:true,
	},
	nomUsu:{
	   type: String,
	   required:[true, 'El  nombre es Obligatorio.'],
	   lowercase:true,
	   trim:true,
	},	
	apeUsu:{
	   type: String,
	   default:null,
	   lowercase:true,
	   trim:true,
	},	
	sexo:{
	   type: String,
	   default:null,
	   lowercase:true,
	   trim:true,
	},
	pais:{
	   type: String,
	   default:null,
	   lowercase:true,
	   trim:true,
	},	
	fechaNac:{
	   type: Date,
	   default:null,
	   lowercase:true,
	   trim:true,
	},
	password:{
	   type: String,
	   required:[true, 'El password es Obligatorio.'],
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