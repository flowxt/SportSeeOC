// Définition de la classe Performance
export class Performance {
  // Le constructeur reçoit un objet 'data' et initialise les propriétés de l'instance
  constructor(data) {
    // 'kind' représente le type de performance (par exemple, 'cardio', 'force', etc.)
    this.kind = data.kind;
    // 'value' correspond à la valeur de performance pour le type donné
    this.value = data.value;
  }
}
