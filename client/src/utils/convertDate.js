export function getDate(mongoDate) {
  let date = new Date();
  if (mongoDate) {
    date = new Date(mongoDate);
  }
  return (
    date.getDate() +
    ' ' +
    getMonth(date.getMonth() + 1) +
    ' ' +
    date.getFullYear()
  );
}

export function getDateWithTime(mongoDate) {
  let date = new Date();
  if (mongoDate) {
    date = new Date(mongoDate);
  }
  return (
    date.getHours() +
    1 +
    ':' +
    date.getMinutes() +
    ' ' +
    date.getDate() +
    ' ' +
    getMonth(date.getMonth() + 1) +
    ' ' +
    date.getFullYear()
  );
}

export function getMonth(month) {
  const monthObj = {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'Jun',
    7: 'Jul',
    8: 'Aug',
    9: 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec',
  };

  return monthObj[month];
}
