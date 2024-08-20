import pyaudio
import wave

def record_audio(output_file, record_seconds=60, sample_rate=44100, channels=2, chunk=1024):
    audio = pyaudio.PyAudio()

    stream = audio.open(format=pyaudio.paInt16,
                        channels=channels,
                        rate=sample_rate,
                        input=True,
                        frames_per_buffer=chunk)

    print("Grabando...")

    frames = []
    
    for _ in range(0, int(sample_rate / chunk * record_seconds)):
        data = stream.read(chunk)
        frames.append(data)

    print("Grabación finalizada")

    stream.stop_stream()
    stream.close()
    audio.terminate()

    with wave.open(output_file, "wb") as wave_file:
        wave_file.setnchannels(channels)
        wave_file.setsampwidth(audio.get_sample_size(pyaudio.paInt16))
        wave_file.setframerate(sample_rate)
        wave_file.writeframes(b''.join(frames))

# Ejemplo de uso
if __name__ == "__main__":
    record_audio("meeting_audio.wav", record_seconds=60)
