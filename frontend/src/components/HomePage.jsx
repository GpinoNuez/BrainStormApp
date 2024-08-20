// src/components/HomePage.jsx

import React from 'react';
import portada from '../assets/PortadaBrainStorm.png'; // Asegúrate de que la ruta sea correcta

const HomePage = () => {
    return (
        <div>
            {/* Imagen de portada */}
            <img src={portada} alt="Portada" className="w-full h-auto" />

            {/* Contenido adicional debajo de la imagen */}
            <div className="p-4 text-center">
                <h1 className="text-4xl font-bold">Bienvenido a BrainStormingApp Daily</h1>
                <p>Aplicación para gestionar reuniones y tareas.</p>
            </div>
        </div>
    );
};

export default HomePage;
