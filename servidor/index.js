const express = require('express');
const connectarDB = require('./config/db'); // Importamos nuestro conector de BD // Debes crear la conexion antes
require('dotenv').config({ path :'config/variables.env'});

//Crear el servidor
const app = express();
 
console.log(`Iniciando nuestro servidor en node.js - express`);
 
// ejecutamos la función para conectar a la base de datos
 connectarDB(); // Debes crear la conexion antes
 
//Creamos el puerto para la app
 const port = process.env.DB_PORT || 5000;  // Debes instalar  y crear el env que son las variables de entorno
 
//Habilitar leer los valores de un body
app.use(express.json());
 
//Rutas de Accesos
//Crear usuario 
app.use('/api/usuarios', require('./routes/usuario'));  // esta  sentencia aun no se crear hasta que puedas generar los controladores 
 
//Crear Categoria - Proximo Desarrollo 
 
//Iniciamos nuestro  servidor
app.listen(port, '0.0.0.0', () => {
   console.log(`El servidor esta funcionando en el puerto -> ${port}`);
});
