// models/roles.js

const db = require('../config/db');

const Roles = {};

Roles.getAll = () => {
    return db.query('SELECT * FROM ROLES');
};

Roles.create = (nombre, descripcion) => {
    return db.execute('INSERT INTO ROLES (NOMBRE, DESCRIPCION) VALUES (?, ?)', [nombre, descripcion]);
};

Roles.delete = (id) => {
    return db.execute('DELETE FROM ROLES WHERE ID_ROL = ?', [id]);
};

module.exports = Roles;
