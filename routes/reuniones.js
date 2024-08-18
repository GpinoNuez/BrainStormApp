// routes/reuniones.js

const express = require('express');
const { getAllReuniones, createReunion } = require('../controllers/reunionesController');
const { body } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Ruta para obtener todas las reuniones (requiere autenticación)
router.get('/', authMiddleware, getAllReuniones);

// Ruta para crear una nueva reunión (requiere autenticación)
router.post('/',
    authMiddleware,
    body('titulo').notEmpty().withMessage('El título es requerido.'),
    body('fecha_hora_inicio').notEmpty().withMessage('La fecha y hora de inicio son requeridas.'),
    createReunion
);

module.exports = router;

