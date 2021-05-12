const express = require('express');
const connectarDB = require('./config/db'); // Importamos nuestro conector de BD // Debes crear la conexion antes
const cors = require('cors');
require('dotenv').config({ path :'config/variables.env'});

//Crear el servidor
const app = express();
 
console.log(`Iniciando nuestro servidor en node.js - express`);
 
// ejecutamos la función para conectar a la base de datos
 connectarDB(); // Debes crear la conexion antes
 
//Habilitar cors 
app.use(cors());


//Creamos el puerto para la app
 const port = process.env.DB_PORT || 5000;  // Debes instalar  y crear el env que son las variables de entorno
 
//Habilitar leer los valores de un body
app.use(express.json());
 
//Rutas de Accesos
//Crear Acción
app.use('/api/accion',    require('./routes/accion'));

//Crear Actividad  
app.use('/api/actividad', require('./routes/actividad'));

//Validar Autenticación 
app.use('/api/auth',      require('./routes/auth'));

//Crear Categoria  
app.use('/api/categoria', require('./routes/categoria'));

//Crear Gasto
app.use('/api/gasto',     require('./routes/gasto'));

//Crear Ingreso
app.use('/api/ingreso',   require('./routes/ingreso'));

//Crear Patrimonio
app.use('/api/patrimonio', require('./routes/patrimonio'));

//Crear Recurrente  
app.use('/api/recurrente', require('./routes/recurrente'));

//Crear usuario 
app.use('/api/usuarios',   require('./routes/usuario')); 

//Iniciamos nuestro  servidor
app.listen(port, '0.0.0.0', () => {
 
   console.log(`El servidor esta funcionando en el puerto -> ${port}`);
   
});
