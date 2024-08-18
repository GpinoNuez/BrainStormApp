// middleware/errorHandler.js

const logger = require("../config/logger");

const errorHandler = (err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).json({ error: 'Ocurrió un error en el servidor.' });
};

module.exports = errorHandler;
