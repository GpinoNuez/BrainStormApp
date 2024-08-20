// middleware/errorHandler.js

module.exports = (err, req, res, next) => {
    console.error(err.stack); // Imprime el error completo en la consola

    const statusCode = err.statusCode || 500;
    const message = err.message || "Ocurrió un error en el servidor.";

    // Si estás en desarrollo, muestra el stack completo
    if (process.env.NODE_ENV === 'development') {
        return res.status(statusCode).json({
            error: message,
            stack: err.stack
        });
    }

    // En producción, muestra un mensaje genérico
    res.status(statusCode).json({
        error: "Ocurrió un error en el servidor."
    });
};