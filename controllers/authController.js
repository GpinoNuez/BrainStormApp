// controllers/authController.js

const bcrypt = require('bcryptjs');
const { generateToken } = require('../config/jwt');
const db = require('../config/db');

// Registro de usuario
exports.register = async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.execute('INSERT INTO USUARIOS (username, password) VALUES (?, ?)', [username, hashedPassword]);
        const token = generateToken(result.insertId);
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Error en el registro de usuario.' });
    }
};

// Inicio de sesión
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const [rows] = await db.execute('SELECT * FROM USUARIOS WHERE username = ?', [username]);
        const user = rows[0];

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: 'Credenciales incorrectas.' });
        }

        const token = generateToken(user.ID_USUARIO);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Error en el inicio de sesión.' });
    }
};
