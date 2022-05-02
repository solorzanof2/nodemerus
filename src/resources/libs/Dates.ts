/**
 * ### Dates
 *
 * Static methods:
 *
 * `dateParse()`, `normalize()`, `setInitialHour()`, `setLastHour()`,
 * `toDMYDateTime()`, `getDateObject()`
 */
export class Dates {
  static readonly TIME_DELIMITER: string = 'T';

  /**
   * ### Data Parse
   *
   * Parse date to format dd/mm/aaaa.
   *
   * @param {string} data - string to be parsed
   *
   * @returns string with formated date
   */
  static dateParse = function (data: Date): string {
    let [day, month, year] = data.toLocaleDateString().split('/');
    day = this.normalize(day);
    month = this.normalize(month);
    return `${day}/${month}/${year}`;
  }

  static normalize(value: number): string | number {
    if (value < 10)
      return `0${value}`;
    return value;
  }

  static setInitialHour(value: string): string {
    const [date] = value.split(Dates.TIME_DELIMITER);
    return `${date}T00:00:00.000Z`;
  }

  static setLastHour(value: string): string {
    const [date] = value.split(Dates.TIME_DELIMITER);
    return `${date}T23:59:59.000Z`;
  }

  static toDMYDateTime(value: string | Date): string {
    if (!value) {
      return "";
    }

    const datetime = (new Date(value)).toISOString();
    const [date, time] = datetime.replace('.000Z', '').split(Dates.TIME_DELIMITER);
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year} ${time}`;
  }

  /**
   * Get Date to format timestamp and string.
   *
   * @returns object with formated date e.g. `{ text: "2021-01-12T11:06:00.000Z", value: 1610449560000 }`
   */
  static getDateObject(): DateInfo {
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    // return { text: this.toDMYDateTime(currentDate), value: timestamp } as DateInfo;
    return { text: currentDate.toISOString(), value: timestamp } as DateInfo;
  }

  /**
   * Returns parsed DateInfo to string.
   *
   * Format: `dd/mm/yyyy time`
   *
   * @param date
   * @returns string
   */
  static toUserDatetime(value: string | Date | number): string {
    if (!value) {
      return "";
    }

    const datetime = (new Date(value)).toISOString();
    const [date, time] = datetime.split('.')[0].split(Dates.TIME_DELIMITER);
    const [hours, minutes, seconds] = time.split(':');
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  static toDatabaseDatetime(): string {
    const datetime = (new Date()).toISOString();
    const [date, time] = datetime.split('.')[0].split(Dates.TIME_DELIMITER);
    const [hours, minutes, seconds] = time.split(':');
    const [year, month, day] = date.split('-');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
}

/**
 * ### Date Info
 *
 * Timestamp date object.
 *
 * Object: {
 * `text`: string,
 * `value`: number
 * }
 */
export interface DateInfo {
  text: string;
  value: number;
}
