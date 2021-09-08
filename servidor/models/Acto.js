//Importamos  nuestra libreria mongo
const mongoose = require('mongoose');
 
//Importamos funcionalidad de mongo llamada Schema para genear las estructura de la  tabla en la  base de datos
const Schema = mongoose.Schema
 
// Creamos nuestra estructura que tedra nuestra tabla en la base de datos.
const ActoSchema = new Schema({
	nomActo : {
	   type:String,
	   required:true,
	   unique:true,
	   lowercase:true,
	   trim:true,
	},
	desActo:{
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
	}
	
});

//Metodo para sobreescribir 
ActoSchema.methods.toJSON = function(){ //Tiene que ser una funcion normal para poder usar el this lo que no ()=> 
	const {__v, ...Acto } = this.toObject();
	//Acto.id = _id
	return Acto;
}

//Esta  sentencia nos  permite eportar nuestro modelo  como vemos se pasa como parametros (NombreModelo, EstructuraModelo ) -> definidos previamente.
module.exports = mongoose.model('Acto', ActoSchema);