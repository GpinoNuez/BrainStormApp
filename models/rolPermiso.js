// models/rolPermiso.js

const db = require('../config/db');

const RolPermiso = {};

RolPermiso.assign = (idRol, idPermiso) => {
    return db.execute('insert into brainstorm_bd.rol_permiso (id_rol, id_permiso) values (?, ?)', [idRol, idPermiso]);
};

RolPermiso.remove = (idRolPermiso) => {
    return db.execute('delete from brainstorm_bd.rol_permiso where id_rol_permiso = ?', [idRolPermiso]);
};

module.exports = RolPermiso;
