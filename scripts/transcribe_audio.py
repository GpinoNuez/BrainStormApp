## dividir el audio en fragmentos más pequeños y luego transcribir cada fragmento:

# import os
# from google.cloud import speech
# import io
# import wave

# # Configura las credenciales de Google Cloud
# os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "config/google-credentials.json"

# def transcribe_audio(audio_file):
#     client = speech.SpeechClient()
    
#     with wave.open(audio_file, "rb") as wf:
#         sample_rate = wf.getframerate()
#         channels = wf.getnchannels()
#         chunk_size = 10 * 1024 * 1024  # 10 MB chunk size

#         frames = wf.readframes(wf.getnframes())
#         total_size = len(frames)
#         chunks = [frames[i:i + chunk_size] for i in range(0, total_size, chunk_size)]

#         full_transcription = []

#         for i, chunk in enumerate(chunks):
#             audio = speech.RecognitionAudio(content=chunk)
#             config = speech.RecognitionConfig(
#                 encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
#                 sample_rate_hertz=sample_rate,
#                 language_code="es-ES",
#                 audio_channel_count=channels,
#             )

#             try:
#                 response = client.recognize(config=config, audio=audio)
#                 for result in response.results:
#                     full_transcription.append(result.alternatives[0].transcript)
#                 print(f"Fragmento {i + 1}/{len(chunks)} transcrito correctamente.")
#             except Exception as e:
#                 print(f"Error durante la transcripción del fragmento {i + 1}: {e}")

#         return ' '.join(full_transcription)

# if __name__ == "__main__":
#     transcription = transcribe_audio("meeting_audio.wav")
#     print(transcription)



## utilizar el modo de streaming de la API de Google Cloud Speech-to-Text, que permite transcribir archivos de audio de mayor tamaño en tiempo real.
import os
import sys
from google.cloud import speech
import wave

# Configura las credenciales de Google Cloud
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "config/google-credentials.json"

def transcribe_audio_streaming(audio_file):
    client = speech.SpeechClient()
    
    with wave.open(audio_file, "rb") as wf:
        sample_rate = wf.getframerate()
        channels = wf.getnchannels()

        def generator():
            data = wf.readframes(1024)
            while data:
                yield speech.StreamingRecognizeRequest(audio_content=data)
                data = wf.readframes(1024)

        config = speech.RecognitionConfig(
            encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
            sample_rate_hertz=sample_rate,
            language_code="es-ES",
            audio_channel_count=channels,
        )

        streaming_config = speech.StreamingRecognitionConfig(config=config)

        requests = generator()
        responses = client.streaming_recognize(config=streaming_config, requests=requests)

        full_transcription = []
        for response in responses:
            for result in response.results:
                full_transcription.append(result.alternatives[0].transcript)

        return ' '.join(full_transcription)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Se requiere el nombre del archivo de audio.")
        sys.exit(1)

    # Obtener la ruta del archivo de audio desde los argumentos
    audio_file_path = sys.argv[1]
    
    # Llamar a la función de transcripción
    transcription = transcribe_audio_streaming(audio_file_path)
    
    # Imprimir la transcripción
    print(transcription)
