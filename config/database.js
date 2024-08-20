// config/database.js

const mysql = require('mysql2');

// Crear una conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',  // Cambia esto si es necesario
    user: 'tu_usuario_bd',
    password: 'tu_contraseña_bd',
    database: 'nombre_bd'
});

// Conectar a la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err.stack);
        return;
    }
    console.log('Conectado a la base de datos como ID ' + connection.threadId);
});

module.exports = connection;
