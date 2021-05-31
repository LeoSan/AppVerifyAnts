//Importamos  nuestra libreria mongo
const mongoose = require('mongoose');
 
//Importamos funcionalidad de mongo llamada Schema para genear las estructura de la  tabla en la  base de datos
const Schema = mongoose.Schema
 
// Creamos nuestra estructura que tedra nuestra tabla en la base de datos.
const cumplidaSchema = new Schema({
	cumplida : {
	   type:Boolean,
	   required:true,
	},
	usuario: [{ type: Schema.Types.ObjectId, ref: 'Usuario', required:true }],    
	accion: [{ type: Schema.Types.ObjectId, ref: 'Accion', required:true }],    
    duracion:{
        type:Number,
		required:true,
        default:0
    },	
	registro:{
		type:Date, 
		default:Date.now()
	}
	
});
//Esta  sentencia nos  permite exportar nuestro modelo  como vemos se pasa como parametros (NombreModelo, EstructuraModelo ) -> definidos previamente.
module.exports = mongoose.model('Cumplida', cumplidaSchema);