import { useState, useEffect } from "react";
import DataService from "../services/DataService";

// Hook qui permet de récupérer des données via une fonction de récupération (fetchFunction)
const useFetchData = (useAPI, userId, fetchFunction) => {
  // Déclaration des états pour stocker les données et l'éventuelle erreur
  const [data, setData] = useState([]); // Initialisation de l'état 'data' pour stocker les données récupérées
  const [error, setError] = useState(null); // Initialisation de l'état 'error' pour gérer les erreurs de requête
  // Création d'une instance de DataService qui gère l'accès à l'API ou aux données locales
  const dataService = new DataService(useAPI);

  // Utilisation de useEffect pour effectuer la récupération des données dès que 'userId' ou 'fetchFunction' changent
  useEffect(() => {
    // Fonction asynchrone qui gère l'appel à l'API
    const fetchData = async () => {
      try {
        // Appel à la fonction de récupération des données, en lui passant le service de données et l'ID utilisateur
        const result = await fetchFunction(dataService, userId);
        // Mise à jour de l'état 'data' avec les données récupérées
        setData(result);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Erreur lors du chargement des données");
      }
    };

    // Appel de la fonction pour récupérer les données
    fetchData();
  }, [dataService, userId, fetchFunction]); // Ce hook dépend de 'dataService', 'userId' et 'fetchFunction'
  // Retour des données récupérées et de l'éventuelle erreur pour une utilisation dans un composant parent
  return { data, error };
};

export default useFetchData;
