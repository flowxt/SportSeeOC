// Définition de la classe User
export class User {
  // Le constructeur reçoit un objet 'data' et initialise les propriétés de l'instance
  constructor(data) {
    // ID unique de l'utilisateur
    this.id = data.id;
    // Prénom de l'utilisateur (récupéré depuis 'userInfos' dans les données)
    this.firstName = data.userInfos.firstName;
    // Nom de famille de l'utilisateur
    this.lastName = data.userInfos.lastName;
    // Âge de l'utilisateur
    this.age = data.userInfos.age;
    // Score du jour de l'utilisateur (utilise 'todayScore' si présent, sinon 'score')
    this.todayScore = data.todayScore || data.score;
    // Données nutritionnelles clés (calories, protéines, glucides, lipides)
    this.keyData = data.keyData;
  }

  // Getter pour récupérer le nom complet de l'utilisateur
  get fullName() {
    // Combine le prénom et le nom de famille avec un espace
    return `${this.firstName} ${this.lastName}`;
  }

  // Getter pour récupérer le nombre de calories consommées
  get calorieCount() {
    return this.keyData.calorieCount;
  }

  // Getter pour récupérer la quantité de protéines consommées
  get proteinCount() {
    return this.keyData.proteinCount;
  }

  // Getter pour récupérer la quantité de glucides consommés
  get carbohydrateCount() {
    return this.keyData.carbohydrateCount;
  }

  // Getter pour récupérer la quantité de lipides consommés
  get lipidCount() {
    return this.keyData.lipidCount;
  }
}
