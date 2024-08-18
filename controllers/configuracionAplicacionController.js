// controllers/configuracionAplicacionController.js

const ConfiguracionAplicacion = require('../models/configuracionAplicacion');

exports.getAllConfiguraciones = async (req, res) => {
    try {
        const [rows] = await ConfiguracionAplicacion.getAll();
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener configuraciones.' });
    }
};

exports.updateConfiguracion = async (req, res) => {
    const { id, clave, valor, descripcion } = req.body;

    try {
        await ConfiguracionAplicacion.update(id, clave, valor, descripcion);
        res.status(200).json({ message: 'Configuración actualizada correctamente.' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la configuración.' });
    }
};
