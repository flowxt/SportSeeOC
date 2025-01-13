export class User {
  constructor(data) {
    this.id = data.id;
    this.firstName = data.userInfos.firstName;
    this.lastName = data.userInfos.lastName;
    this.age = data.userInfos.age;
    this.todayScore = data.todayScore || data.score;
    this.keyData = data.keyData;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  get calorieCount() {
    return this.keyData.calorieCount;
  }

  get proteinCount() {
    return this.keyData.proteinCount;
  }

  get carbohydrateCount() {
    return this.keyData.carbohydrateCount;
  }

  get lipidCount() {
    return this.keyData.lipidCount;
  }
}
