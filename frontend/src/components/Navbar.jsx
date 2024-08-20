// src/components/Navbar.jsx

import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-white text-2xl font-bold">Brainstorming Daily App</h1>
                <ul className="flex space-x-4">
                    <li><a href="#" className="text-white">Inicio</a></li>
                    <li><a href="#" className="text-white">Reuniones</a></li>
                    <li><a href="#" className="text-white">Tareas</a></li>
                    <li><a href="#" className="text-white">Configuración</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
