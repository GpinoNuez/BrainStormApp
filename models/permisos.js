// models/permisos.js

const db = require('../config/db');

const Permisos = {};

Permisos.getAll = () => {
    return db.query('SELECT * FROM PERMISOS');
};

Permisos.create = (nombre, descripcion) => {
    return db.execute('INSERT INTO PERMISOS (NOMBRE, DESCRIPCION) VALUES (?, ?)', [nombre, descripcion]);
};

Permisos.delete = (id) => {
    return db.execute('DELETE FROM PERMISOS WHERE ID_PERMISO = ?', [id]);
};

module.exports = Permisos;
