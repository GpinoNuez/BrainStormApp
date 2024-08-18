// models/reuniones.js

const db = require('../config/db');

const Reuniones = {};

// Obtiene todas las reuniones
Reuniones.getAll = (callback) => {
    const query = 'SELECT * FROM REUNIONES';
    db.query(query, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, results);
    });
};

module.exports = Reuniones;
