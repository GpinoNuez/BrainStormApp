// models/configuracionAplicacion.js

const db = require('../config/db');

const ConfiguracionAplicacion = {};

ConfiguracionAplicacion.getAll = () => {
    return db.query('SELECT * FROM brainstorm_bd.configuracion_aplicacion');
};

ConfiguracionAplicacion.update = (id, clave, valor, descripcion) => {
    return db.execute('update brainstorm_bd.configuracion_aplicacion set clave = ?, valor = ?, descripcion = ? where id_configuracion = ?', 
                      [clave, valor, descripcion, id]);
};

module.exports = ConfiguracionAplicacion;
