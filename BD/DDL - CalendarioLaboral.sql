--Ejecutar primero
DROP DATABASE CalendarioLaboral WITH (FORCE);
--Ejecutar segundo
CREATE DATABASE CalendarioLaboral; 

--Para las siguientes instrucciones, se debe cambiar la conexión

--Crear la tabla TIPO
CREATE TABLE TipoFestivo(
	Id SERIAL PRIMARY KEY,
	Tipo VARCHAR(100) NOT NULL
	);

CREATE UNIQUE INDEX ixTipoFestivo
	ON TipoFestivo(Tipo);

--Crear la tabla PAIS
CREATE TABLE Pais(
	Id SERIAL PRIMARY KEY,
	Nombre VARCHAR(100) NOT NULL
	);

--Crear la tabla FESTIVO
CREATE TABLE Festivo(
	Id SERIAL PRIMARY KEY,
	IdPais INT NOT NULL,
	CONSTRAINT fkFestivo_Pais FOREIGN KEY (IdPais) REFERENCES Pais(Id),
	Nombre VARCHAR(100) NOT NULL,
	Dia INT NOT NULL,
	Mes INT NOT NULL,
	DiasPascua INT NOT NULL,
	IdTipo INT NOT NULL,
	CONSTRAINT fkFestivo_Tipo FOREIGN KEY (IdTipo) REFERENCES TipoFestivo(Id)
	);

--Crear la tabla TIPO
CREATE TABLE Tipo(
	Id SERIAL PRIMARY KEY,
	Tipo VARCHAR(100) NOT NULL
	);

-- Crear indice para TIPO
CREATE UNIQUE INDEX ixTipo
	ON Tipo(Tipo);

--Crear la tabla CALENDARIO
CREATE TABLE Calendario(
	Id SERIAL PRIMARY KEY,
	Fecha DATE NOT NULL,
	IdTipo INT NOT NULL,
    CONSTRAINT fkCalendario_Tipo FOREIGN KEY (IdTipo) REFERENCES Tipo(Id),
    Descripcion VARCHAR(100) NULL,
	IdPais INT NOT NULL,
	CONSTRAINT fkCalendario_Pais FOREIGN KEY (IdPais) REFERENCES Pais(Id)
	);
    
/* Crear indice para CALENDARIO
	ordenado por FECHA */
CREATE UNIQUE INDEX ixCalendario
	ON Calendario(IdPais, Fecha);

/* Crear tabla USUARIO */
CREATE TABLE Usuario( 
	Id SERIAL PRIMARY KEY,
	Usuario VARCHAR(100) NOT NULL,
    Nombre VARCHAR(100) NOT NULL,
	Clave VARCHAR(100) NOT NULL,
    Activo BOOL DEFAULT(true) NOT NULL,
	Foto BYTEA NULL,
    Roles VARCHAR(100) NULL
	);
    
/* Crear indice para USUARIO
	ordenado por USUARIO */
CREATE UNIQUE INDEX ixUsuario_Usuario
	ON Usuario(Usuario);

--crear el secuenciador para la tabla PAIS
CREATE SEQUENCE secuencia_pais
    START WITH 1;

--asignar el secuenciador a la tabla PAIS
ALTER TABLE pais
    ALTER COLUMN id SET DEFAULT nextval('secuencia_pais');

--crear el secuenciador para la tabla TIPOFESTIVO
CREATE SEQUENCE secuencia_tipofestivo
    START WITH 1;

--asignar el secuenciador a la tabla TIPOFESTIVO
ALTER TABLE tipofestivo
    ALTER COLUMN id SET DEFAULT nextval('secuencia_tipofestivo');

--crear el secuenciador para la tabla FESTIVO
CREATE SEQUENCE secuencia_festivo
    START WITH 1;

--asignar el secuenciador a la tabla FESTIVO
ALTER TABLE festivo
    ALTER COLUMN id SET DEFAULT nextval('secuencia_festivo');


--crear el secuenciador para la tabla TIPO
CREATE SEQUENCE secuencia_tipo
    START WITH 1;

--asignar el secuenciador a la tabla TIPO
ALTER TABLE tipo
    ALTER COLUMN id SET DEFAULT nextval('secuencia_tipo');

--crear el secuenciador para la tabla CALENDARIO
CREATE SEQUENCE secuencia_calendario
    START WITH 1;

--asignar el secuenciador a la tabla CALENDARIO
ALTER TABLE calendario
    ALTER COLUMN id SET DEFAULT nextval('secuencia_calendario');

