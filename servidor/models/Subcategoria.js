//Importamos  nuestra libreria mongo
const mongoose = require('mongoose');
 
//Importamos funcionalidad de mongo llamada Schema para genear las estructura de la  tabla en la  base de datos
const Schema = mongoose.Schema
 
// Creamos nuestra estructura que tedra nuestra tabla en la base de datos.
const subcategoriaSchema = new Schema({
	nomCate : {
	   type:String,
	   required:true,
	   unique:true,
	   lowercase:true,
	   trim:true,
	},
	desCate:{
	   type: String,
	   required:true,
	   lowercase:true,
	   trim:true,
	},
    autor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Usuario',
        required:true,
    },
    categoria:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Subcategoria',
        required:true,
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
module.exports = mongoose.model('Subcategoria', subcategoriaSchema);