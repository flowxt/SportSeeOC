// / J'importe axios pour les requêtes HTTP
import axios from "axios";

// URL racine de mon serveur API
const API_URL = "http://localhost:3000";

// Récupère les informations d'un utilisateur en fonction de son ID
export const getUserById = async (userId) => {
  try {
    // Envoie une requête GET à l'endpoint /user/userId
    const response = await axios.get(`${API_URL}/user/${userId}`);
    // Retourne les données depuis la réponse que j'ai eu du serveur
    return response.data.data;
  } catch (error) {
    // Affiche une erreur en cas de problème
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// Je récupère l'activité d'un utilisateur en fonction de son ID
export const getUserActivityById = async (userId) => {
  try {
    // Envoie une requête GET à l'endpoint /user/userId/activity
    const response = await axios.get(`${API_URL}/user/${userId}/activity`);
    return response.data.data;
  } catch (error) {
    // J'affiche une erreur en cas de problème
    console.error("Error fetching user activity:", error);
    throw error;
  }
};

// Récupère les performances d'un utilisateur
export const getUserAverageSession = async (userId) => {
  try {
    // Requête GET pour /user/userId/average-sessions
    const response = await axios.get(
      `${API_URL}/user/${userId}/average-sessions`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user average sessions:", error);
    throw error;
  }
};

// Je récupère les performances d'un utilisateur
export const getUserPerformance = async (userId) => {
  try {
    // Requête GET pour /user/userId/performance
    const response = await axios.get(`${API_URL}/user/${userId}/performance`);
    return response.data.data;
  } catch (error) {
    // J'affiche une erreur en cas de problème
    console.error("Error fetching user performance:", error);
    throw error;
  }
};
