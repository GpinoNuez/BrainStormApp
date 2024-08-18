// controllers/rolesController.js

const Roles = require('../models/roles');
const RolPermiso = require('../models/rolPermiso');

exports.getAllRoles = async (req, res) => {
    try {
        const [rows] = await Roles.getAll();
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener roles.' });
    }
};

exports.createRole = async (req, res) => {
    const { nombre, descripcion } = req.body;

    try {
        const [result] = await Roles.create(nombre, descripcion);
        res.status(201).json({ id_rol: result.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el rol.' });
    }
};

exports.assignPermisoToRole = async (req, res) => {
    const { id_rol, id_permiso } = req.body;

    try {
        await RolPermiso.assign(id_rol, id_permiso);
        res.status(201).json({ message: 'Permiso asignado al rol exitosamente.' });
    } catch (error) {
        res.status(500).json({ error: 'Error al asignar permiso al rol.' });
    }
};
