CREATE TABLE tipofestivo (
    id INT PRIMARY KEY,
    tipo VARCHAR(100) NOT NULL
);

CREATE UNIQUE INDEX ix_tipofestivo_tipo
    ON tipofestivo(tipo);

CREATE TABLE pais (
    id INT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE UNIQUE INDEX ix_pais_nombre
    ON pais(nombre);

CREATE TABLE festivo (
    id INT PRIMARY KEY,
    idpais INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    dia INT NOT NULL,
    mes INT NOT NULL,
    diaspascua INT NOT NULL,
    idtipo INT NOT NULL,
    CONSTRAINT fk_festivo_pais FOREIGN KEY (idpais) REFERENCES pais(id),
    CONSTRAINT fk_festivo_tipo FOREIGN KEY (idtipo) REFERENCES tipofestivo(id)
);

CREATE INDEX ix_festivo_idpais
    ON festivo(idpais);

CREATE TABLE tipo (
    id INT PRIMARY KEY,
    tipo VARCHAR(100) NOT NULL
);

CREATE UNIQUE INDEX ix_tipo_tipo
    ON tipo(tipo);

CREATE TABLE calendario (
    id INT PRIMARY KEY,
    fecha DATE NOT NULL,
    idtipo INT NOT NULL,
    descripcion VARCHAR(100),
    idpais INT NOT NULL,
    CONSTRAINT fk_calendario_tipo FOREIGN KEY (idtipo) REFERENCES tipo(id),
    CONSTRAINT fk_calendario_pais FOREIGN KEY (idpais) REFERENCES pais(id)
);

CREATE UNIQUE INDEX ix_calendario_idpais_fecha
    ON calendario(idpais, fecha);

CREATE TABLE usuario (
    id BIGINT PRIMARY KEY,
    usuario VARCHAR(100) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    clave VARCHAR(100) NOT NULL,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    foto BYTEA,
    roles VARCHAR(100)
);

CREATE UNIQUE INDEX ix_usuario_usuario
    ON usuario(usuario);

CREATE SEQUENCE secuencia_pais START WITH 22 INCREMENT BY 1;
CREATE SEQUENCE secuencia_tipofestivo START WITH 6 INCREMENT BY 1;
CREATE SEQUENCE secuencia_festivo START WITH 31 INCREMENT BY 1;
CREATE SEQUENCE secuencia_tipo START WITH 4 INCREMENT BY 1;
CREATE SEQUENCE secuencia_calendario START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE secuencia_usuario START WITH 2 INCREMENT BY 1;

ALTER TABLE pais ALTER COLUMN id SET DEFAULT nextval('secuencia_pais');
ALTER TABLE tipofestivo ALTER COLUMN id SET DEFAULT nextval('secuencia_tipofestivo');
ALTER TABLE festivo ALTER COLUMN id SET DEFAULT nextval('secuencia_festivo');
ALTER TABLE tipo ALTER COLUMN id SET DEFAULT nextval('secuencia_tipo');
ALTER TABLE calendario ALTER COLUMN id SET DEFAULT nextval('secuencia_calendario');
ALTER TABLE usuario ALTER COLUMN id SET DEFAULT nextval('secuencia_usuario');
