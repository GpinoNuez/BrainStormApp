// models/rolPermiso.js

const db = require('../config/db');

const RolPermiso = {};

RolPermiso.assign = (idRol, idPermiso) => {
    return db.execute('INSERT INTO ROL_PERMISO (ID_ROL, ID_PERMISO) VALUES (?, ?)', [idRol, idPermiso]);
};

RolPermiso.remove = (idRolPermiso) => {
    return db.execute('DELETE FROM ROL_PERMISO WHERE ID_ROL_PERMISO = ?', [idRolPermiso]);
};

module.exports = RolPermiso;
