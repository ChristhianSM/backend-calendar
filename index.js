const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./database/config");
require("dotenv").config();

// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// Middlewares
app.use( express.static("public") ) // Directorio publico
app.use( express.json() ); // Lectura y parseo del body
app.use( cors() );

// Rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

// Escuchar peticiones
app.listen( process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`)
})