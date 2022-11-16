export const formatDate = (val: Date) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const d = new Date(val);
  const year = d.getFullYear();
  const date = d.getDate();
  const hours = d.getHours();
  const minutes = ('0' + d.getMinutes()).slice(-2);
  const seconds = ('0' + d.getSeconds()).slice(-2);
  const monthName = months[d.getMonth()];
  const formatted = `${monthName} ${date}, ${year} ${hours}:${minutes}:${seconds}`;
  return formatted.toString();
};
