// routes/roles.js

const express = require('express');
const { getAllRoles, createRole, assignPermisoToRole } = require('../controllers/rolesController');
const { body } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Ruta para obtener todos los roles
router.get('/', authMiddleware, getAllRoles);

// Ruta para crear un nuevo rol
router.post('/',
    authMiddleware,
    body('nombre').notEmpty().withMessage('El nombre del rol es requerido.'),
    createRole
);

// Ruta para asignar un permiso a un rol
router.post('/assign-permission',
    authMiddleware,
    body('id_rol').notEmpty().withMessage('El ID del rol es requerido.'),
    body('id_permiso').notEmpty().withMessage('El ID del permiso es requerido.'),
    assignPermisoToRole
);

module.exports = router;
