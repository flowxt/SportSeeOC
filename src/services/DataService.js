import axios from "axios";
import userMock from "../mocks/user.json";
import activityMock from "../mocks/activity.json";
import averageSessionsMock from "../mocks/average-sessions.json";
import performanceMock from "../mocks/performance.json";

//URL de base de l'API
const API_URL = "http://localhost:3000";

// Constructeur de la classe, prend un booléen pour déterminer si l'API doit être utilisée
class DataService {
  constructor(useAPI) {
    this.useAPI = useAPI;
  }

  // Méthode pour obtenir les informations d'un utilisateur par son ID
  async getUserById(userId) {
    if (this.useAPI) {
      try {
        // Requête à l'API pour obtenir les données de l'utilisateur
        const response = await axios.get(`${API_URL}/user/${userId}`);
        return response.data.data;
      } catch (error) {
        // En cas d'erreur, utiliser les données mock
        console.error(
          "Error fetching user data from API, using mock data:",
          error
        );
        const user = userMock.find((user) => user.id === userId);
        if (!user) {
          throw new Error(`User with id ${userId} not found in mock data`);
        }
        return user;
      }
    } else {
      // Si l'API n'est pas utilisée, retourner les données mock
      const user = userMock.find((user) => user.id === userId);
      if (!user) {
        throw new Error(`User with id ${userId} not found in mock data`);
      }
      return user;
    }
  }

  // Méthode pour obtenir les activités d'un utilisateur par son ID
  async getUserActivityById(userId) {
    if (this.useAPI) {
      try {
        // Requête à l'API pour obtenir les données d'activité de l'utilisateur
        const response = await axios.get(`${API_URL}/user/${userId}/activity`);
        return response.data.data;
      } catch (error) {
        // En cas d'erreur, utiliser les données mock
        console.error(
          "Error fetching user activity from API, using mock data:",
          error
        );
        return activityMock;
      }
    } else {
      // Si l'API n'est pas utilisée, retourner les données mock
      return activityMock;
    }
  }

  // Méthode pour obtenir les sessions moyennes d'un utilisateur par son ID
  async getUserAverageSession(userId) {
    if (this.useAPI) {
      try {
        // Requête à l'API pour obtenir les sessions moyennes de l'utilisateur
        const response = await axios.get(
          `${API_URL}/user/${userId}/average-sessions`
        );
        return response.data.data;
      } catch (error) {
        // En cas d'erreur, utiliser les données mock
        console.error(
          "Error fetching user average sessions from API, using mock data:",
          error
        );
        return averageSessionsMock;
      }
    } else {
      // Si l'API n'est pas utilisée, retourner les données mock
      return averageSessionsMock;
    }
  }

  // Méthode pour obtenir les performances d'un utilisateur par son ID
  async getUserPerformance(userId) {
    if (this.useAPI) {
      try {
        // Requête à l'API pour obtenir les performances de l'utilisateur
        const response = await axios.get(
          `${API_URL}/user/${userId}/performance`
        );
        return response.data.data;
      } catch (error) {
        // En cas d'erreur, utiliser les données mock
        console.error(
          "Error fetching user performance from API, using mock data:",
          error
        );
        return performanceMock;
      }
    } else {
      // Si l'API n'est pas utilisée, retourner les données mock
      return performanceMock;
    }
  }
}

export default DataService;
