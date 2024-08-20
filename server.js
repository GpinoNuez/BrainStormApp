// server.js
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const setupSwagger = require('./config/swagger'); // Mueve la importación de Swagger aquí, después de express
const logger = require('./config/logger');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/auth');
const reunionesRoutes = require('./routes/reuniones');
const audioRoutes = require('./routes/audio'); 

const app = express(); // Inicializa la app antes de usarla en cualquier configuración

const PORT = process.env.PORT || 3000;

// Configuración de Swagger (debe ir después de inicializar `app`)
setupSwagger(app);

// Middlewares
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/reuniones', reunionesRoutes);
app.use('/api/audio', audioRoutes); 

// Middleware de manejo de errores
app.use(errorHandler);

// Iniciar el servidor
app.listen(PORT, () => {
    logger.info(`Servidor corriendo en http://localhost:${PORT}`);
});
