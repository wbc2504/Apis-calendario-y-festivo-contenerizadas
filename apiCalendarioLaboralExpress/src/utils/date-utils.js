const DAY_NAMES = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
];

function pad(number) {
  return String(number).padStart(2, "0");
}

function formatDate(date) {
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(
    date.getUTCDate()
  )}`;
}

function createUtcDate(year, month, day) {
  return new Date(Date.UTC(year, month - 1, day));
}

function addDays(date, days) {
  const copy = new Date(date.getTime());
  copy.setUTCDate(copy.getUTCDate() + days);
  return copy;
}

function getDayName(date) {
  return DAY_NAMES[date.getUTCDay()];
}

function isWeekend(dayName) {
  return dayName === "Sabado" || dayName === "Domingo";
}

function getHolyWeekStart(year) {
  const a = year % 19;
  const b = year % 4;
  const c = year % 7;
  const d = (19 * a + 24) % 30;
  const days = d + ((2 * b + 4 * c + 6 * d + 5) % 7);

  let day = 15 + days;
  let month = 3;

  if (day > 31) {
    day -= 31;
    month = 4;
  }

  return createUtcDate(year, month, day);
}

function getEasterDate(year) {
  return addDays(getHolyWeekStart(year), 7);
}

function nextMonday(date) {
  const day = date.getUTCDay();
  const isoDay = day === 0 ? 7 : day;
  const daysUntilMonday = (8 - isoDay) % 7;
  return daysUntilMonday === 0 ? date : addDays(date, daysUntilMonday);
}

function applyEcuadorBridge(date) {
  const day = date.getUTCDay();

  if (day === 6) {
    return addDays(date, -1);
  }

  if (day === 0) {
    return addDays(date, 1);
  }

  if (day === 2) {
    return addDays(date, -1);
  }

  if (day === 3 || day === 4) {
    return addDays(date, 2);
  }

  return date;
}

function isValidDateParts(year, month, day) {
  const date = createUtcDate(year, month, day);
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

function getTotalDaysInYear(year) {
  if (year % 400 === 0) {
    return 366;
  }

  if (year % 100 === 0) {
    return 365;
  }

  return year % 4 === 0 ? 366 : 365;
}

module.exports = {
  addDays,
  applyEcuadorBridge,
  createUtcDate,
  formatDate,
  getDayName,
  getEasterDate,
  getTotalDaysInYear,
  isValidDateParts,
  isWeekend,
  nextMonday,
};
