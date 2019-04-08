export class DateParser {
  public static parseDateJson(dateJson): Date {
    if (dateJson) {
      const year = dateJson.year;
      const month = dateJson.monthValue;
      const day = dateJson.dayOfMonth;
      const hours = dateJson.hour;
      const min = dateJson.minute;
      const sec = dateJson.second;

      const date = new Date(year, month, day, hours, min, sec, 0);
      return date;
    } else {
      return null;
    }
  }
}

// dayOfMonth
// :
// 29
// dayOfWeek
// :
// "WEDNESDAY"
// dayOfYear
// :
// 241
// hour
// :
// 18
// minute
// :
// 36
// month
// :
// "AUGUST"
// monthValue
// :
// 8
// nano
// :
// 0
// offset
// :
// id
// :
// "+05:30"
// rules
// :
// fixedOffset
// :
// true
// transitionRules
// :
// []
// transitions
// :
// []
// __proto__
// :
// Object
// totalSeconds
// :
// 19800
// __proto__
// :
// Object
// second
// :
// 39
// year
// :
// 2018
