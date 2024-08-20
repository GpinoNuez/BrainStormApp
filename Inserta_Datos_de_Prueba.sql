INSERT INTO Participantes (id_reunion, id_usuario, rol) VALUES
(1, 1, 'Moderador'),
(1, 2, 'Miembro'),
(1, 3, 'Miembro'),
(2, 2, 'Moderador'),
(2, 3, 'Miembro');

INSERT INTO Actas (id_reunion, contenido, fecha_creacion) VALUES
(1, 'Se discutieron los objetivos y plazos del nuevo proyecto.', '2023-07-05 11:00:00'),
(2, 'Se revisó el progreso de las tareas asignadas y se establecieron nuevas metas.', '2023-07-06 13:00:00');

INSERT INTO Notificaciones (id_usuario, mensaje, fecha_envio, leida) VALUES
(1, 'Nueva reunión programada: Planificación de Proyecto.', '2023-06-30 08:00:00', TRUE),
(2, 'Nueva reunión programada: Revisión de Tareas.', '2023-07-01 09:00:00', FALSE),
(3, 'Nueva tarea asignada en la reunión: Planificación de Proyecto.', '2023-07-05 09:30:00', FALSE);

INSERT INTO Tareas (id_reunion, id_asignado, descripcion, fecha_limite, completada) VALUES
(1, 2, 'Definir los objetivos del proyecto.', '2023-07-10 17:00:00', FALSE),
(1, 3, 'Crear el plan de trabajo inicial.', '2023-07-12 17:00:00', FALSE),
(2, 3, 'Actualizar el progreso de las tareas en el sistema.', '2023-07-15 17:00:00', TRUE);

INSERT INTO Mensajes_Chat (id_reunion, id_usuario, contenido, fecha_envio) VALUES
(1, 1, 'Iniciemos la reunión con los objetivos del proyecto.', '2023-07-05 09:05:00'),
(1, 2, 'Estoy de acuerdo con los plazos establecidos.', '2023-07-05 09:15:00'),
(2, 2, '¿Cómo va el progreso de las tareas?', '2023-07-06 11:10:00'),
(2, 3, 'Ya completé mi parte, actualicé el sistema.', '2023-07-06 11:20:00');

INSERT INTO Sentimientos (id_reunion, id_usuario, sentimiento, puntuacion, fecha_hora) VALUES
(1, 1, 'Positivo', 0.9, '2023-07-05 09:30:00'),
(1, 2, 'Neutral', 0.5, '2023-07-05 09:45:00'),
(2, 2, 'Negativo', 0.2, '2023-07-06 11:30:00'),
(2, 3, 'Positivo', 0.8, '2023-07-06 11:45:00');

INSERT INTO Configuracion_Aplicacion (clave, valor, descripcion) VALUES
('notificaciones_hora', '08:00', 'Hora en que se envían las notificaciones diarias.'),
('tema_color', 'azul', 'Color del tema de la aplicación.'),
('limite_participantes', '10', 'Número máximo de participantes en una reunión.');

INSERT INTO Roles (nombre, descripcion) VALUES
('Administrador', 'Tiene control total sobre la aplicación.'),
('Miembro', 'Puede participar en reuniones y ver contenido.');

INSERT INTO Permisos (nombre, descripcion) VALUES
('Crear Reunión', 'Permite crear nuevas reuniones.'),
('Editar Reunión', 'Permite editar reuniones existentes.'),
('Eliminar Reunión', 'Permite eliminar reuniones.'),
('Ver Reunión', 'Permite ver los detalles de las reuniones.');

INSERT INTO Rol_Permiso (id_rol, id_permiso) VALUES
(1, 1), -- Administrador puede Crear Reunión
(1, 2), -- Administrador puede Editar Reunión
(1, 3), -- Administrador puede Eliminar Reunión
(1, 4), -- Administrador puede Ver Reunión
(2, 4); -- Miembro puede Ver Reunión

INSERT INTO Logs_Actividad (id_usuario, accion, fecha_hora) VALUES
(1, 'Creó una nueva reunión: Planificación de Proyecto.', '2023-07-05 09:00:00'),
(2, 'Actualizó el progreso de las tareas.', '2023-07-06 11:15:00'),
(3, 'Comentó en el chat de la reunión: Planificación de Proyecto.', '2023-07-05 09:15:00');

INSERT INTO Feedback_Usuarios (id_usuario, comentario, puntuacion, fecha_creacion) VALUES
(1, 'La aplicación es muy útil para gestionar nuestras reuniones.', 5, '2023-07-07 08:00:00'),
(2, 'Sería genial tener más opciones de personalización.', 4, '2023-07-08 09:00:00'),
(3, 'Me gusta cómo organiza las tareas y el seguimiento.', 5, '2023-07-09 10:00:00');
