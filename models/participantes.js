// models/participantes.js

const db = require('../config/db');

const Participantes = {};

// Obtener los correos electrónicos de los participantes de una reunión
Participantes.getEmailsByReunionId = (id_reunion) => {
    const sql = `
        select u.email 
        from brainstorm_bd.participantes p
        join brainstorm_bd.users u on p.id_usuario = u.id_usuario
        where p.id_reunion = ?
    `;
    return db.execute(sql, [id_reunion]);
};

// Método para crear un nuevo participante
Participantes.create = async ({ id_reunion, id_usuario, rol }) => {
    const sql = `
        insert into brainstorm_bd.participantes (id_reunion, id_usuario, rol) 
        values (?, ?, ?)
    `;
    const [result] = await db.execute(sql, [id_reunion, id_usuario, rol]);
    return { id_participante: result.insertId };
};

module.exports = Participantes;
