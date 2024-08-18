// controllers/reunionesController.js

const db = require('../config/db');

// Obtener todas las reuniones
exports.getAllReuniones = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM REUNIONES');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las reuniones.' });
    }
};

// Crear una nueva reunión
exports.createReunion = async (req, res) => {
    const { titulo, descripcion, fecha_hora_inicio, fecha_hora_fin, id_creador } = req.body;

    try {
        const [result] = await db.execute(
            'INSERT INTO REUNIONES (TITULO, DESCRIPCION, FECHA_HORA_INICIO, FECHA_HORA_FIN, ID_CREADOR) VALUES (?, ?, ?, ?, ?)',
            [titulo, descripcion, fecha_hora_inicio, fecha_hora_fin, id_creador]
        );
        res.status(201).json({ id_reunion: result.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la reunión.' });
    }
};
