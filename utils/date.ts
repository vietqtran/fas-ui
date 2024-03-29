const formatDateForMySQL = (date: Date): string => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
};

const getWeeks = (year: number) => {
  const firstMonday = getFirstMonday(year);
  const weeks = [];
  for (let weekNumber = 1; weekNumber <= 52; weekNumber++) {
    let from = new Date(firstMonday);
    from.setDate(from.getDate() + (weekNumber - 1) * 7);
    let to = new Date(from);
    to.setDate(from.getDate() + 6);

    let fromLabel = `${String(from.getDate()).padStart(2, "0")}/${String(
      from.getMonth() + 1
    ).padStart(2, "0")}`;
    let toLabel = `${String(to.getDate()).padStart(2, "0")}/${String(
      to.getMonth() + 1
    ).padStart(2, "0")}`;

    let label = `${fromLabel} To ${toLabel}`;
    weeks.push({ label, value: weekNumber });
  }
  return weeks;
};

const getFirstMonday = (year: number) => {
  const firstDayOfYear = new Date(year, 0, 1);
  if (firstDayOfYear.getDay() === 1) {
    return firstDayOfYear;
  }
  const offset =
    firstDayOfYear.getDay() === 0 ? 1 : 8 - firstDayOfYear.getDay();
  firstDayOfYear.setDate(firstDayOfYear.getDate() + offset);
  return firstDayOfYear;
};

function getWeek(now: Date): number {
  const startOfYear: Date = new Date(now.getFullYear(), 0, 0);
  const diff: number = now.getTime() - startOfYear.getTime();
  const oneWeek: number = 1000 * 60 * 60 * 24 * 7;
  const weekNumber: number = Math.floor(diff / oneWeek) + 1; // Adding 1 to start week count from 1
  return weekNumber;}

const scheduleDateToString = ({ day1, day2 }) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return `${days[day1 - 1]} - ${days[day2 - 1]}`;
};

const getWeekDayByDateString = (date: string) => {
  const dateObject: Date = new Date(date);
  const weekdayNumber: number = dateObject.getDay();
  return weekdayNumber;
};

export {
  formatDateForMySQL,
  getWeeks,
  getFirstMonday,
  getWeek,
  scheduleDateToString,
  getWeekDayByDateString,
};
