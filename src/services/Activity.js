// Définition de la classe Activity
export class Activity {
  // Le constructeur reçoit un objet 'data' et initialise les propriétés de l'instance
  constructor(data) {
    // La date de l'activité (au format donné dans 'data')
    this.day = data.day;
    // Le poids de l'utilisateur ce jour-là (en kilogrammes)
    this.kilogram = data.kilogram;
    // Le nombre de calories brûlées ce jour-là
    this.calories = data.calories;
  }

  // Getter pour récupérer uniquement le jour formaté à partir de la date
  get formattedDay() {
    // Crée un nouvel objet Date à partir de la propriété 'day'
    const newDate = new Date(this.day);
    // Retourne uniquement le numéro du jour du mois (1-31)
    return newDate.getDate();
  }
}
