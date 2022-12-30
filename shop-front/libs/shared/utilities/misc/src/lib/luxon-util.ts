import { DateTime } from 'luxon';

export class LuxonUtil {
  static now(): DateTime {
    return DateTime.local();
  }

  static nowAsDate(): Date {
    return this.now().toJSDate();
  }

  static fromDate(date: Date | string): DateTime {
    const dateString = date instanceof Date ? date.toISOString() : date;
    return DateTime.fromISO(dateString);
  }

  static fromDateToJSDate(date: Date | string): Date {
    return this.fromDate(date).toJSDate();
  }

  static isInThePast(date: Date): boolean {
    return this.fromDate(date) < this.now();
  }

  static isInTheFuture(date: Date): boolean {
    return this.fromDate(date) > this.now();
  }
}
