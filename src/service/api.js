import axios from "axios";

const BASE_URL = "http://localhost:3000"; // L’URL de ton serveur

/**
 * Récupère les données utilisateur de l'API
 * @param {number} userId - L'ID de l'utilisateur
 * @returns {Promise} Les données utilisateur
 */
export const fetchUserData = (userId) => {
  return axios
    .get(`${BASE_URL}/user/${userId}`)
    .then((response) => response.data);
};

/**
 * Récupère les activités quotidiennes de l'utilisateur
 * @param {number} userId - L'ID de l'utilisateur
 * @returns {Promise} Les données d'activité
 */
export const fetchUserActivity = (userId) => {
  return axios
    .get(`${BASE_URL}/user/${userId}/activity`)
    .then((response) => response.data);
};

/**
 * Récupère les sessions moyennes de l'utilisateur
 * @param {number} userId - L'ID de l'utilisateur
 * @returns {Promise} Les sessions moyennes
 */
export const fetchUserSessions = (userId) => {
  return axios
    .get(`${BASE_URL}/user/${userId}/average-sessions`)
    .then((response) => response.data);
};

/**
 * Récupère les performances utilisateur
 * @param {number} userId - L'ID de l'utilisateur
 * @returns {Promise} Les performances
 */
export const fetchUserPerformance = (userId) => {
  return axios
    .get(`${BASE_URL}/user/${userId}/performance`)
    .then((response) => response.data);
};
