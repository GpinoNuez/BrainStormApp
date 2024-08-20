// models/reuniones.js

const db = require('../config/db');

const Reuniones = {};

// Método para encontrar una reunión por ID
Reuniones.findById = async (id) => {
    const [rows] = await db.execute('select * from brainstorm_bd.reuniones where id_reunion = ?', [id]);
    return rows[0];
};

// Método para crear una nueva reunión
Reuniones.create = async ({ titulo, descripcion, fecha_hora_inicio, fecha_hora_fin, id_creador, fecha_creacion }) => {
    // Agregar logs para verificar que se están recibiendo los valores correctos
    console.log('titulo recibido:', titulo);
    console.log('descripcion recibida:', descripcion);
    console.log('fecha_hora_inicio recibida:', fecha_hora_inicio);
    console.log('fecha_hora_fin recibida:', fecha_hora_fin);
    console.log('id_creador recibido:', id_creador);
    console.log('fecha_creacion recibida:', fecha_creacion);

    // Verificar si algún campo está undefined o vacío
    if (!titulo || !descripcion || !fecha_hora_inicio || !fecha_hora_fin || !id_creador || !fecha_creacion) {
        throw new Error('Todos los campos son obligatorios para crear una reunión.');
    }

    // Ejecutar la inserción en la base de datos
    const [result] = await db.execute(
        'insert into brainstorm_bd.reuniones (titulo, descripcion, fecha_hora_inicio, fecha_hora_fin, id_creador, fecha_creacion) values (?, ?, ?, ?, ?, ?)',
        [titulo, descripcion, fecha_hora_inicio, fecha_hora_fin, id_creador, fecha_creacion]
    );
    return { id_reunion: result.insertId };
};

module.exports = Reuniones;
