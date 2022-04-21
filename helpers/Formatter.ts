const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

class Formatter {
  static formatDate(date: number | Date) {
    const newDate = new Date(date);
    const day = DAYS[newDate.getDay()];
    const month = MONTHS[newDate.getMonth()];
    const year = newDate.getFullYear();
    return `${day}, ${month} ${year}`;
  }
  static formatCurrency(num: number | string) {
    const newNumber = Number(num);
    if (typeof newNumber === "number") {
      const formatter = new Intl.NumberFormat("en-Us", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
      return formatter.format(newNumber);
    } else {
      throw new Error(`${num} is not a number`);
    }
  }
}
export default Formatter;
