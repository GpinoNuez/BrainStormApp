// app.js
const express = require('express');
const transcriptionRouter = require('./routes/transcription');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors()); // Permitir conexiones desde otros orígenes, como el frontend
app.use(express.json());
app.use('/api/transcribe', transcriptionRouter);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
