//Importammos el controlador moogoose
const mongoose = require('mongoose');
//Importamos nuestro archivo de variables de entorno previamente creado
require('dotenv').config({ path :'./config/variables.env'});
 
//Creamos nuestra función que nos permitirá conectarnos
const conectarBD = async()=>{
 
   try {
       await mongoose.connect(process.env.DB_MONGO, {
           useNewUrlParser:true,
           useUnifiedTopology:true,
           useFindAndModify:false,
       } );
       console.log(`!!!BD Lista y en Linea!!! Estamos en ->  ${process.env.DB_NOMBRE}`);
      
   } catch (error) {
       console.log(error);
       process.exit(1);//en caso de error detener la app 
   }
 
}
//Por ultimo exportamos para poder usarlo en el index.js del servidor.
module.exports = conectarBD;