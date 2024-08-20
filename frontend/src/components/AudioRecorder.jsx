import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AudioRecorder = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioBlob, setAudioBlob] = useState(null);
    const [transcription, setTranscription] = useState('');
    const [isTranscribing, setIsTranscribing] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);

    // Manejar el temporizador de grabación
    useEffect(() => {
        let interval;
        if (isRecording) {
            interval = setInterval(() => {
                setRecordingTime(prevTime => prevTime + 1);
            }, 1000);
        } else {
            clearInterval(interval);
            setRecordingTime(0);
        }

        return () => clearInterval(interval);
    }, [isRecording]);

    const handleStartRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });

            recorder.ondataavailable = (e) => {
                const blob = new Blob([e.data], { type: 'audio/webm' });
                setAudioBlob(blob);
            };

            recorder.start();
            setMediaRecorder(recorder);
            setIsRecording(true);
        } catch (error) {
            console.error("Error al iniciar la grabación:", error);
        }
    };

    const handleStopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            setIsRecording(false);
        } else {
            console.error("No hay ninguna grabadora activa para detener.");
        }
    };

    const handleTranscribeAudio = async () => {
        if (audioBlob) {
            setIsTranscribing(true);
            const formData = new FormData();
            formData.append('audio', audioBlob, 'meeting_audio.webm');
            formData.append('id_reunion', 1);  // Aquí debes reemplazar '1' con el ID real de la reunión
    
            try {
                const response = await axios.post('http://localhost:5000/api/transcribe', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
    
                setTranscription(response.data.transcription);
            } catch (error) {
                console.error('Error transcribing audio:', error);
            } finally {
                setIsTranscribing(false);
            }
        }
    };

    return (
        <div className="flex flex-col items-center">
            <button 
                onClick={isRecording ? handleStopRecording : handleStartRecording}
                className="bg-blue-500 text-white px-6 py-3 rounded mb-4 transition duration-300 ease-in-out transform hover:scale-105">
                {isRecording ? `Detener Grabación (${recordingTime}s)` : 'Iniciar Grabación'}
            </button>

            {audioBlob && (
                <button 
                    onClick={handleTranscribeAudio}
                    className="bg-green-500 text-white px-6 py-3 rounded mb-4 transition duration-300 ease-in-out transform hover:scale-105">
                    Transcribir Audio
                </button>
            )}

            {isTranscribing && (
                <p className="text-yellow-500 mt-4">Procesando la transcripción...</p>
            )}

            {transcription && (
                <textarea
                    className="mt-4 p-4 bg-gray-100 rounded w-full max-w-6xl text-black h-80 resize-none"
                    /** 
                     * w-full: Esto hace que el cuadro de texto ocupe el 100% del ancho disponible. 
                     *              Se puede cambiar a un porcentaje menor, como w-3/4 (75% del ancho) o w-1/2 (50% del ancho).
                        max-w-4xl: Esto define el ancho máximo del cuadro de texto. 
                                    Se puede cambiar a max-w-2xl, max-w-xl, etc., para hacer que el cuadro de texto sea más estrecho.
                        h-64: Esta clase controla la altura del cuadro de texto. 
                                    Se puede cambiar aumentar o disminuir este valor para cambiar la altura. Por ejemplo, 
                                    h-80 hará que el cuadro sea más alto, y h-48 lo hará más bajo. */
                    value={transcription}
                    readOnly
                />
            )}
        </div>
    );
};

export default AudioRecorder;
