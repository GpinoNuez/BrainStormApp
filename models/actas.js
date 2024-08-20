// models/actas.js

const db = require('../config/db');

const Actas = {};

// Método para crear una nueva acta con la transcripción de la reunión
Actas.create = async ({ id_reunion, contenido }) => {
    const [result] = await db.execute(
        'insert into brainstorm_bd.actas (id_reunion, contenido, fecha_creacion) values (?, ?, now())',
        [id_reunion, contenido]
    );
    return result;
};

module.exports = Actas;
