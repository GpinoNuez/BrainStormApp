// controllers/authController.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const connection = require('../config/db'); // Usa tu archivo db.js

// Función para registrar un nuevo usuario
exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, nombre, apellido, email } = req.body;

    try {
        // Verifica si el usuario ya existe
        const [results] = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
        if (results.length > 0) {
            return res.status(400).json({ error: 'El usuario ya existe.' });
        }

        // Cifra la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crea el nuevo usuario
        await connection.query(
            'INSERT INTO users (username, password, nombre, apellido, email) VALUES (?, ?, ?, ?, ?)',
            [username, hashedPassword, nombre, apellido, email]
        );

        res.status(201).json({ message: 'Usuario registrado exitosamente.' });
    } catch (error) {
        console.error('Error en el registro:', error);
        res.status(500).json({ error: 'Error en el servidor.' });
    }
};

// Función para iniciar sesión y obtener un token JWT
exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
        // Busca al usuario por su nombre de usuario
        const [results] = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
        if (results.length === 0) {
            return res.status(400).json({ error: 'Credenciales inválidas.' });
        }

        const user = results[0];
        console.log('Contraseña almacenada:', user.password); // Verifica el valor de user.password

        // Compara la contraseña proporcionada con la almacenada en la base de datos
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Credenciales inválidas.' });
        }

        // Genera el token JWT
        const payload = { id: user.id_usuario, username: user.username };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Devuelve el token al cliente
        res.json({ token });
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).json({ error: 'Error en el servidor.' });
    }
};
