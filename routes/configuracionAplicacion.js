// routes/configuracionAplicacion.js

const express = require('express');
const { getAllConfiguraciones, updateConfiguracion } = require('../controllers/configuracionAplicacionController');
const { body } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Ruta para obtener todas las configuraciones
router.get('/', authMiddleware, getAllConfiguraciones);

// Ruta para actualizar una configuración
router.put('/',
    authMiddleware,
    body('clave').notEmpty().withMessage('La clave es requerida.'),
    updateConfiguracion
);

module.exports = router;
