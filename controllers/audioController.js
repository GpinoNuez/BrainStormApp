// controllers/audioController.js

const nodemailer = require('nodemailer');
const { exec } = require('child_process');
const path = require('path');
const Actas = require('../models/actas');
const Reuniones = require('../models/reuniones');
const Participantes = require('../models/participantes'); // Importa el modelo de Participantes

// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Tu email
        pass: process.env.EMAIL_PASS  // Tu contraseña o app password
    }
});

exports.recordAndTranscribe = async (req, res) => {
    let { id_reunion } = req.body;

    if (!id_reunion) {
        return res.status(400).json({ error: 'ID de reunión es requerido.' });
    }

    console.log('Verificando la existencia de la reunión...');

    try {
        // Verifica si la reunión ya existe
        let reunion = await Reuniones.findById(id_reunion);
        if (!reunion) {
            console.log('La reunión no existe, creando una nueva...');
            reunion = await Reuniones.create({
                TITULO: 'Reunión Automática',
                DESCRIPCION: 'Reunión creada automáticamente',
                FECHA_HORA_INICIO: new Date(), 
                FECHA_HORA_FIN: new Date(new Date().getTime() + 60 * 60 * 1000), 
                ID_CREADOR: 1, 
                FECHA_CREACION: new Date()
            });
            id_reunion = reunion.ID_REUNION; // Actualiza el id_reunion con el nuevo ID creado
            console.log('Reunión creada con ID:', id_reunion);
        }

        console.log('Iniciando grabación...');

        // Paso 2: Grabar el audio
        exec(`python ${path.join(__dirname, '../scripts/record_audio.py')}`, (err, stdout, stderr) => {
            if (err) {
                console.error('Error al grabar el audio:', err);
                return res.status(500).json({ error: 'Error al grabar el audio.' });
            }

            console.log('Grabación completada, iniciando transcripción...');

            // Paso 3: Transcribir el audio
            exec(`python ${path.join(__dirname, '../scripts/transcribe_audio.py')}`, async (err, stdout, stderr) => {
                if (err) {
                    console.error('Error en la transcripción:', err);
                    return res.status(500).json({ error: 'Error al transcribir el audio.' });
                }

                const transcription = stdout.trim();
                if (!transcription) {
                    console.error('La transcripción está vacía.');
                    return res.status(500).json({ error: 'La transcripción está vacía.' });
                }

                console.log('Transcripción recibida:', transcription);

                try {
                    // Paso 4: Guardar la transcripción en la base de datos
                    console.log('Guardando transcripción en la base de datos...');
                    const result = await Actas.create({ id_reunion, contenido: transcription });
                    console.log('Transcripción guardada en la base de datos:', result);

                    // Paso 5: Obtener los correos de los participantes de la reunión
                    console.log('Obteniendo correos de los participantes...');
                    const [participants] = await Participantes.getEmailsByReunionId(id_reunion);
                    const emails = participants.map(p => p.EMAIL);
                    console.log('Correos obtenidos:', emails);

                    // Paso 6: Enviar la transcripción por correo a todos los participantes
                    console.log('Enviando transcripción por correo a los participantes...');
                    const mailOptions = {
                        from: process.env.EMAIL_USER,
                        to: emails,
                        subject: `Transcripción de la reunión ${id_reunion}`,
                        text: `Aquí tienes la transcripción de la reunión:\n\n${transcription}`
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.error('Error al enviar el correo:', error);
                            return res.status(500).json({ error: 'Error al enviar el correo.' });
                        }
                        console.log('Correo enviado:', info.response);
                        res.status(200).json({ message: 'Grabación, transcripción y envío de correos completados.', transcription });
                    });
                } catch (error) {
                    console.error('Error al guardar la transcripción en la base de datos:', error);
                    res.status(500).json({ error: 'Error al guardar la transcripción en la base de datos.' });
                }
            });
        });
    } catch (error) {
        console.error('Error en la verificación o creación de la reunión:', error);
        res.status(500).json({ error: 'Error al verificar o crear la reunión.' });
    }
};
