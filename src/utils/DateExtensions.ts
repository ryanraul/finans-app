export function getMonthDescriptionByNumber(monthNumber?: number) {
  if (!monthNumber) return "";

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  monthNumber = monthNumber > 12 ? 12 : monthNumber < 1 ? 1 : monthNumber;

  return months[monthNumber - 1];
}
