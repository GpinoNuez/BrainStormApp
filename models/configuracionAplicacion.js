// models/configuracionAplicacion.js

const db = require('../config/db');

const ConfiguracionAplicacion = {};

ConfiguracionAplicacion.getAll = () => {
    return db.query('SELECT * FROM CONFIGURACION_APLICACION');
};

ConfiguracionAplicacion.update = (id, clave, valor, descripcion) => {
    return db.execute('UPDATE CONFIGURACION_APLICACION SET CLAVE = ?, VALOR = ?, DESCRIPCION = ? WHERE ID_CONFIGURACION = ?', 
                      [clave, valor, descripcion, id]);
};

module.exports = ConfiguracionAplicacion;
