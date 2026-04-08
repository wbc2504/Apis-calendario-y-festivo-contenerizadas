INSERT INTO tipofestivo (id, tipo) VALUES
    (1, 'Fijo'),
    (2, 'Ley Puente Festivo'),
    (3, 'Basado en Pascua'),
    (4, 'Basado en Pascua y Ley Puente Festivo'),
    (5, 'Ley Puente Festivo Viernes');

INSERT INTO pais (id, nombre) VALUES
    (1, 'COLOMBIA'),
    (2, 'ARGENTINA'),
    (3, 'BOLIVIA'),
    (4, 'BRASIL'),
    (5, 'CANADA'),
    (6, 'COSTA RICA'),
    (7, 'REPUBLICA DOMINICANA'),
    (8, 'CUBA'),
    (9, 'CHILE'),
    (10, 'ECUADOR'),
    (11, 'ESTADOS UNIDOS DE AMERICA'),
    (12, 'GUATEMALA'),
    (13, 'HONDURAS'),
    (14, 'MEXICO'),
    (15, 'NICARAGUA'),
    (16, 'PANAMA'),
    (17, 'PARAGUAY'),
    (18, 'PERU'),
    (19, 'URUGUAY'),
    (20, 'VENEZUELA'),
    (21, 'ESPANA');

INSERT INTO festivo (id, idpais, dia, mes, nombre, idtipo, diaspascua) VALUES
    (1, 1, 1, 1, 'Ano nuevo', 1, 0),
    (2, 1, 6, 1, 'Santos Reyes', 2, 0),
    (3, 1, 19, 3, 'San Jose', 2, 0),
    (4, 1, 0, 0, 'Jueves Santo', 3, -3),
    (5, 1, 0, 0, 'Viernes Santo', 3, -2),
    (6, 1, 0, 0, 'Domingo de Pascua', 3, 0),
    (7, 1, 1, 5, 'Dia del Trabajo', 1, 0),
    (8, 1, 0, 0, 'Ascension del Senor', 4, 40),
    (9, 1, 0, 0, 'Corpus Christi', 4, 61),
    (10, 1, 0, 0, 'Sagrado Corazon de Jesus', 4, 68),
    (11, 1, 29, 6, 'San Pedro y San Pablo', 2, 0),
    (12, 1, 20, 7, 'Independencia Colombia', 1, 0),
    (13, 1, 7, 8, 'Batalla de Boyaca', 1, 0),
    (14, 1, 15, 8, 'Asuncion de la Virgen', 2, 0),
    (15, 1, 12, 10, 'Dia de la Raza', 2, 0),
    (16, 1, 1, 11, 'Todos los santos', 2, 0),
    (17, 1, 11, 11, 'Independencia de Cartagena', 2, 0),
    (18, 1, 8, 12, 'Inmaculada Concepcion', 1, 0),
    (19, 1, 25, 12, 'Navidad', 1, 0),
    (20, 10, 1, 1, 'Ano nuevo', 1, 0),
    (21, 10, 0, 0, 'Carnaval 1', 3, -43),
    (22, 10, 0, 0, 'Carnaval 2', 3, -42),
    (23, 10, 0, 0, 'Viernes Santo', 3, -2),
    (24, 10, 1, 5, 'Dia del Trabajo', 5, 0),
    (25, 10, 24, 5, 'Batalla de Pichincha', 1, 0),
    (26, 10, 10, 8, 'Primer Grito de Independencia', 5, 0),
    (27, 10, 9, 10, 'Independencia de Guayaquil', 5, 0),
    (28, 10, 2, 11, 'Dia de los Difuntos', 5, 0),
    (29, 10, 3, 11, 'Independencia de Cuenca', 5, 0),
    (30, 10, 25, 12, 'Navidad', 5, 0);

INSERT INTO tipo (id, tipo) VALUES
    (1, 'Dia laboral'),
    (2, 'Fin de Semana'),
    (3, 'Dia festivo');

INSERT INTO usuario (id, usuario, nombre, clave, activo, roles) VALUES
    (1, 'frayosorio', 'Fray Leon Osorio Rivera', '123', TRUE, '');

SELECT setval('secuencia_tipofestivo', 5, true);
SELECT setval('secuencia_pais', 21, true);
SELECT setval('secuencia_festivo', 30, true);
SELECT setval('secuencia_tipo', 3, true);
SELECT setval('secuencia_usuario', 1, true);
