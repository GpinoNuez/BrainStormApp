//despues de pegar el codigo a probar, en bash pegar el siguiente codigo
// node pruebasCodigos.js

// pruebaAudioController.js

// Importar los modelos necesarios
const Actas = require('./models/actas');
const Reuniones = require('./models/reuniones');
const Participantes = require('./models/participantes');

async function testAudioControllerFlow() {
    let id_reunion = 1;  // Cambia este ID según sea necesario
    let id_usuario = 1;  // ID de usuario que participa en la reunión, ajusta según sea necesario

    try {
        // Verificar si la reunión existe, si no, crearla
        console.log('Verificando la existencia de la reunión...');
        let reunion = await Reuniones.findById(id_reunion);
        if (!reunion) {
            console.log('La reunión no existe, creando una nueva...');

            // Definir los datos para la nueva reunión
            const titulo = 'Reunión Automática de Prueba';
            const descripcion = 'Reunión creada automáticamente para pruebas';
            const fecha_hora_inicio = new Date().toISOString().slice(0, 19).replace('T', ' '); // Formato de fecha para MySQL
            const fecha_hora_fin = new Date(new Date().getTime() + 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' '); // Una hora después
            const id_creador = 1;  // Asegúrate de que este ID exista en tu tabla de USUARIOS
            const fecha_creacion = new Date().toISOString().slice(0, 19).replace('T', ' ');  // Fecha de creación

            // Crear la nueva reunión
            reunion = await Reuniones.create({
                titulo,
                descripcion,
                fecha_hora_inicio,
                fecha_hora_fin,
                id_creador,
                fecha_creacion
            });
            id_reunion = reunion.id_reunion;  // Actualiza el ID de la reunión con el nuevo ID creado
            console.log('Reunión creada con ID:', id_reunion);

            // Crear un participante en la reunión recién creada
            console.log('Creando un participante en la reunión...');
            const rol = 'Participante';  // Define el rol del participante
            await Participantes.create({
                id_reunion,
                id_usuario,
                rol
            });
            console.log('Participante creado en la reunión con id_reunion:', id_reunion);
        } else {
            console.log('Reunión existente encontrada con ID:', id_reunion);
        }

        // Simular grabación de audio
        console.log('Simulando grabación de audio...');
        // Aquí iría la llamada al script real de grabación si fuera necesario

        // Simular transcripción de audio
        console.log('Simulando transcripción de audio...');
        const transcription = "Esta es una transcripción simulada para pruebas.";
        console.log('Transcripción simulada recibida:', transcription);

        // Guardar la transcripción en la base de datos
        console.log('Guardando transcripción en la base de datos...');
        const result = await Actas.create({ id_reunion, contenido: transcription });
        console.log('Transcripción guardada en la base de datos:', result);

        // Obtener los correos de los participantes de la reunión (si es necesario)
        console.log('Obteniendo correos de los participantes...');
        const [participants] = await Participantes.getEmailsByReunionId(id_reunion);
        const emails = participants.map(p => p.email);
        console.log('Correos obtenidos:', emails);

        // Simular envío de correos (omitir Nodemailer en la prueba)
        console.log('Simulación completa. Correos que se enviarían:', emails);

    } catch (error) {
        console.error('Error en el flujo de prueba:', error);
    }
}

// Ejecutar el flujo de prueba
testAudioControllerFlow();
