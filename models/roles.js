// models/roles.js

const db = require('../config/db');

const Roles = {};

Roles.getAll = () => {
    return db.query('select * from brainstorm_bd.roles');
};

Roles.create = (nombre, descripcion) => {
    return db.execute('insert into brainstorm_bd.roles (nombre, descripcion) values (?, ?)', [nombre, descripcion]);
};

Roles.delete = (id) => {
    return db.execute('delete from brainstorm_bd.roles where id_rol = ?', [id]);
};

module.exports = Roles;
