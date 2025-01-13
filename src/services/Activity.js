export class Activity {
  constructor(data) {
    this.day = data.day;
    this.kilogram = data.kilogram;
    this.calories = data.calories;
  }

  get formattedDay() {
    const newDate = new Date(this.day);
    return newDate.getDate();
  }
}
