// middleware/authMiddleware.js
//con bearer
// const jwt = require('jsonwebtoken');
// const { verifyToken } = require('../config/jwt');

// const authMiddleware = (req, res, next) => {
//     const authHeader = req.header('Authorization');

//     // Verifica si el encabezado Authorization está presente
//     if (!authHeader) {
//         return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado.' });
//     }

//     // Verifica si el encabezado tiene el formato correcto (Bearer TOKEN)
//     const token = authHeader.startsWith('Bearer ') ? authHeader.replace('Bearer ', '') : null;

//     if (!token) {
//         return res.status(401).json({ error: 'Acceso denegado. Formato del token inválido.' });
//     }

//     try {
//         const decoded = verifyToken(token);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         console.error('Error al verificar el token:', error);
//         res.status(401).json({ error: 'Token inválido.' });
//     }
// };

// module.exports = authMiddleware;


// SIN BEARER
// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const { verifyToken } = require('../config/jwt');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');  // Obtiene el valor del encabezado 'Authorization'

    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado.' });
    }

    try {
        const decoded = verifyToken(token);  // Verifica el token directamente
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token inválido.' });
    }
};

module.exports = authMiddleware;
