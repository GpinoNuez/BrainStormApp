import React from 'react';
import Navbar from './components/Navbar'; // Importa el componente Navbar
import AudioRecorder from './components/AudioRecorder'; // Importa el componente AudioRecorder
import './App.css';
import portada from './assets/portada.jpg'; // Importa la imagen de portada

function App() {
  return (
    <div className="App">
      {/* Incluye el componente Navbar */}
      <Navbar />

      {/* Imagen de portada con clase personalizada */}
      <img src={portada} alt="Portada" className="portada mb-0 items-center justify-center" /> {/* La clase 'mb-0' quita el margen inferior */}

      {/* Contenido principal centrado y con espaciado */}
      <main className="flex flex-col items-center justify-center p-4 bg-gray-900 text-white">
        <h1 className="text-4xl font-bold mb-4">Bienvenido a la aplicación Lluvia de ideas diaria</h1>
        <p className="text-xl mb-8">Esta es tu aplicación para gestionar reuniones y tareas.</p>

        {/* Botón de grabación */}
        <AudioRecorder />
      </main>
    </div>
  );
}

export default App;

