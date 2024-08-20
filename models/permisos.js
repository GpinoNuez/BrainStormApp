// models/permisos.js

const db = require('../config/db');

const Permisos = {};

Permisos.getAll = () => {
    return db.query('select * from brainstorm_bd.permisos');
};

Permisos.create = (nombre, descripcion) => {
    return db.execute('insert into brainstorm_bd.permisos (nombre, descripcion) values (?, ?)', [nombre, descripcion]);
};

Permisos.delete = (id) => {
    return db.execute('delete from brainstorm_bd.permisos where id_permiso = ?', [id]);
};

module.exports = Permisos;
