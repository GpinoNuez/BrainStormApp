// middleware/authorize.js

const db = require('../config/db');

const authorize = (requiredPermission) => {
    return async (req, res, next) => {
        try {
            const [permissions] = await db.query(
                `SELECT p.NOMBRE 
                 FROM PERMISOS p
                 JOIN ROL_PERMISO rp ON p.ID_PERMISO = rp.ID_PERMISO
                 JOIN USUARIOS_ROLES ur ON rp.ID_ROL = ur.ID_ROL
                 WHERE ur.ID_USUARIO = ?`, 
                 [req.user.id]
            );

            const userPermissions = permissions.map(p => p.NOMBRE);

            if (!userPermissions.includes(requiredPermission)) {
                return res.status(403).json({ error: 'Acceso denegado.' });
            }

            next();
        } catch (error) {
            res.status(500).json({ error: 'Error al verificar permisos.' });
        }
    };
};

module.exports = authorize;
