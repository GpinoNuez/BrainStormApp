const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const db = require('../config/db');

const router = express.Router();

// Configuración de multer para manejar la subida de archivos
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('audio'), async (req, res) => {
    console.log(req.body);  // Verifica que el cuerpo de la solicitud contenga los datos esperados
    const { id_reunion } = req.body; 

    if (!id_reunion) {
        return res.status(400).json({ error: 'El ID de la reunión no ha sido proporcionado.' });
    }

    const audioPath = req.file.path;
    const wavPath = `${audioPath}.wav`;
    const scriptPath = path.join(__dirname, '../scripts/transcribe_audio.py');

    const escapedAudioPath = `"${audioPath.replace(/\\/g, '\\\\')}"`;
    const escapedWavPath = `"${wavPath.replace(/\\/g, '\\\\')}"`;
    const escapedScriptPath = `"${scriptPath.replace(/\\/g, '\\\\')}"`;

    const ffmpegPath = `"C:\\ffmpeg\\bin\\ffmpeg.exe"`;
    const command = `${ffmpegPath} -i ${escapedAudioPath} ${escapedWavPath}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al convertir el audio a WAV: ${stderr}`);
            return res.status(500).json({ error: 'Error al convertir el audio a WAV.' });
        }

        exec(`python ${escapedScriptPath} ${escapedWavPath}`, async (error, stdout, stderr) => {
            if (error) {
                console.error(`Error ejecutando el script de transcripción: ${stderr}`);
                return res.status(500).json({ error: 'Error al transcribir el audio.' });
            }

            fs.unlinkSync(audioPath);
            fs.unlinkSync(wavPath);

            const transcription = stdout.trim();

            if (!transcription) {
                console.error('La transcripción está vacía o no se ha podido generar.');
                return res.status(500).json({ error: 'La transcripción está vacía o no se ha podido generar.' });
            }

            try {
                await db.execute(
                    'INSERT INTO brainstorm_bd.actas (id_reunion, contenido, fecha_creacion) VALUES (?, ?, NOW())',
                    [id_reunion, transcription]
                );
                console.log('Transcripción guardada en la base de datos.');
                res.json({ transcription });
            } catch (dbError) {
                console.error('Error al guardar la transcripción en la base de datos:', dbError);
                return res.status(500).json({ error: 'Error al guardar la transcripción en la base de datos.' });
            }
        });
    });
});

module.exports = router;
