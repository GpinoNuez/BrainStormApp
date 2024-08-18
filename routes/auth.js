// routes/auth.js

const express = require('express');
const { register, login } = require('../controllers/authController');
const { body } = require('express-validator');

const router = express.Router();

router.post('/register', 
    body('username').notEmpty().withMessage('El nombre de usuario es requerido.'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.'),
    register
);

router.post('/login', 
    body('username').notEmpty().withMessage('El nombre de usuario es requerido.'),
    body('password').notEmpty().withMessage('La contraseña es requerida.'),
    login
);

module.exports = router;
