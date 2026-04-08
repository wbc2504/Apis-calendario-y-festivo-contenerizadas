db = db.getSiblingDB("calendario_laboral");

db.calendario.deleteMany({});
db.festivos.deleteMany({});
db.usuarios.deleteMany({});
db.paises.deleteMany({});
db.tipos.deleteMany({});
db.tipos_festivo.deleteMany({});
db.counters.deleteMany({});

const tiposFestivo = [
  { id: 1, tipo: "Fijo" },
  { id: 2, tipo: "Ley Puente Festivo" },
  { id: 3, tipo: "Basado en Pascua" },
  { id: 4, tipo: "Basado en Pascua y Ley Puente Festivo" },
  { id: 5, tipo: "Ley Puente Festivo Viernes" },
];

const paises = [
  { id: 1, nombre: "COLOMBIA" },
  { id: 2, nombre: "ARGENTINA" },
  { id: 3, nombre: "BOLIVIA" },
  { id: 4, nombre: "BRASIL" },
  { id: 5, nombre: "CANADA" },
  { id: 6, nombre: "COSTA RICA" },
  { id: 7, nombre: "REPUBLICA DOMINICANA" },
  { id: 8, nombre: "CUBA" },
  { id: 9, nombre: "CHILE" },
  { id: 10, nombre: "ECUADOR" },
  { id: 11, nombre: "ESTADOS UNIDOS DE AMERICA" },
  { id: 12, nombre: "GUATEMALA" },
  { id: 13, nombre: "HONDURAS" },
  { id: 14, nombre: "MEXICO" },
  { id: 15, nombre: "NICARAGUA" },
  { id: 16, nombre: "PANAMA" },
  { id: 17, nombre: "PARAGUAY" },
  { id: 18, nombre: "PERU" },
  { id: 19, nombre: "URUGUAY" },
  { id: 20, nombre: "VENEZUELA" },
  { id: 21, nombre: "ESPANA" },
];

const festivos = [
  { id: 1, idPais: 1, dia: 1, mes: 1, nombre: "Ano nuevo", idTipo: 1, diasPascua: 0 },
  { id: 2, idPais: 1, dia: 6, mes: 1, nombre: "Santos Reyes", idTipo: 2, diasPascua: 0 },
  { id: 3, idPais: 1, dia: 19, mes: 3, nombre: "San Jose", idTipo: 2, diasPascua: 0 },
  { id: 4, idPais: 1, dia: 0, mes: 0, nombre: "Jueves Santo", idTipo: 3, diasPascua: -3 },
  { id: 5, idPais: 1, dia: 0, mes: 0, nombre: "Viernes Santo", idTipo: 3, diasPascua: -2 },
  { id: 6, idPais: 1, dia: 0, mes: 0, nombre: "Domingo de Pascua", idTipo: 3, diasPascua: 0 },
  { id: 7, idPais: 1, dia: 1, mes: 5, nombre: "Dia del Trabajo", idTipo: 1, diasPascua: 0 },
  { id: 8, idPais: 1, dia: 0, mes: 0, nombre: "Ascension del Senor", idTipo: 4, diasPascua: 40 },
  { id: 9, idPais: 1, dia: 0, mes: 0, nombre: "Corpus Christi", idTipo: 4, diasPascua: 61 },
  { id: 10, idPais: 1, dia: 0, mes: 0, nombre: "Sagrado Corazon de Jesus", idTipo: 4, diasPascua: 68 },
  { id: 11, idPais: 1, dia: 29, mes: 6, nombre: "San Pedro y San Pablo", idTipo: 2, diasPascua: 0 },
  { id: 12, idPais: 1, dia: 20, mes: 7, nombre: "Independencia Colombia", idTipo: 1, diasPascua: 0 },
  { id: 13, idPais: 1, dia: 7, mes: 8, nombre: "Batalla de Boyaca", idTipo: 1, diasPascua: 0 },
  { id: 14, idPais: 1, dia: 15, mes: 8, nombre: "Asuncion de la Virgen", idTipo: 2, diasPascua: 0 },
  { id: 15, idPais: 1, dia: 12, mes: 10, nombre: "Dia de la Raza", idTipo: 2, diasPascua: 0 },
  { id: 16, idPais: 1, dia: 1, mes: 11, nombre: "Todos los santos", idTipo: 2, diasPascua: 0 },
  { id: 17, idPais: 1, dia: 11, mes: 11, nombre: "Independencia de Cartagena", idTipo: 2, diasPascua: 0 },
  { id: 18, idPais: 1, dia: 8, mes: 12, nombre: "Inmaculada Concepcion", idTipo: 1, diasPascua: 0 },
  { id: 19, idPais: 1, dia: 25, mes: 12, nombre: "Navidad", idTipo: 1, diasPascua: 0 },
  { id: 20, idPais: 10, dia: 1, mes: 1, nombre: "Ano nuevo", idTipo: 1, diasPascua: 0 },
  { id: 21, idPais: 10, dia: 0, mes: 0, nombre: "Carnaval 1", idTipo: 3, diasPascua: -43 },
  { id: 22, idPais: 10, dia: 0, mes: 0, nombre: "Carnaval 2", idTipo: 3, diasPascua: -42 },
  { id: 23, idPais: 10, dia: 0, mes: 0, nombre: "Viernes Santo", idTipo: 3, diasPascua: -2 },
  { id: 24, idPais: 10, dia: 1, mes: 5, nombre: "Dia del Trabajo", idTipo: 5, diasPascua: 0 },
  { id: 25, idPais: 10, dia: 24, mes: 5, nombre: "Batalla de Pichincha", idTipo: 1, diasPascua: 0 },
  { id: 26, idPais: 10, dia: 10, mes: 8, nombre: "Primer Grito de Independencia", idTipo: 5, diasPascua: 0 },
  { id: 27, idPais: 10, dia: 9, mes: 10, nombre: "Independencia de Guayaquil", idTipo: 5, diasPascua: 0 },
  { id: 28, idPais: 10, dia: 2, mes: 11, nombre: "Dia de los Difuntos", idTipo: 5, diasPascua: 0 },
  { id: 29, idPais: 10, dia: 3, mes: 11, nombre: "Independencia de Cuenca", idTipo: 5, diasPascua: 0 },
  { id: 30, idPais: 10, dia: 25, mes: 12, nombre: "Navidad", idTipo: 5, diasPascua: 0 },
];

const tipos = [
  { id: 1, tipo: "Dia laboral" },
  { id: 2, tipo: "Fin de Semana" },
  { id: 3, tipo: "Dia festivo" },
];

const usuarios = [
  {
    id: 1,
    usuario: "frayosorio",
    nombre: "Fray Leon Osorio Rivera",
    clave: "123",
    activo: true,
    foto: null,
    roles: "",
  },
];

const counters = [
  { name: "pais", value: 21 },
  { name: "tipo", value: 3 },
  { name: "tipo_festivo", value: 5 },
  { name: "festivo", value: 30 },
  { name: "usuario", value: 1 },
  { name: "calendario", value: 0 },
];

db.tipos_festivo.insertMany(tiposFestivo);
db.paises.insertMany(paises);
db.festivos.insertMany(festivos);
db.tipos.insertMany(tipos);
db.usuarios.insertMany(usuarios);
db.counters.insertMany(counters);

print("Datos base insertados correctamente en MongoDB.");
