// routes/audio.js

const express = require('express');
const { recordAndTranscribe } = require('../controllers/audioController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Ruta para grabar y transcribir audio
router.post('/record-and-transcribe', authMiddleware, recordAndTranscribe);

module.exports = router;
