import axios from "axios";
import userMock from "../mocks/user.json";
import activityMock from "../mocks/activity.json";
import averageSessionsMock from "../mocks/average-sessions.json";
import performanceMock from "../mocks/performance.json";
import { User } from "./User";
import { Activity } from "./Activity";
import { Performance } from "./Performance";

const API_URL = "http://localhost:3000"; // URL de l'API

// Fonction générique pour récupérer les données, soit depuis l'API, soit depuis les mocks
const fetchData = async (url, mockData, transformFn) => {
  try {
    const response = await axios.get(url);
    return transformFn(response.data);
  } catch (error) {
    console.error(`Error fetching data from API, using mock data:`, error);
    return transformFn(mockData);
  }
};

// Définition de la classe DataService qui gère les appels aux données (API ou mocks)
class DataService {
  constructor(useAPI) {
    this.useAPI = useAPI; // Détermine si les données proviennent de l'API ou des mocks.
  }

  // Méthode pour récupérer l'utilisateur par ID
  async getUserById(userId) {
    if (this.useAPI) {
      const url = `${API_URL}/user/${userId}`;
      return fetchData(url, userMock, (data) => new User(data.data));
    } else {
      const user = userMock.find((user) => user.id === userId);
      if (!user)
        throw new Error(`User with id ${userId} not found in mock data`);
      return new User(user);
    }
  }

  // Méthode pour récupérer l'activité de l'utilisateur par ID
  async getUserActivityById(userId) {
    if (this.useAPI) {
      const url = `${API_URL}/user/${userId}/activity`;
      return fetchData(url, activityMock, (data) =>
        data.data.sessions.map((activity) => new Activity(activity))
      );
    } else {
      return activityMock.sessions.map((activity) => new Activity(activity));
    }
  }

  // Méthode pour récupérer les sessions moyennes de l'utilisateur par ID
  async getUserAverageSession(userId) {
    if (this.useAPI) {
      const url = `${API_URL}/user/${userId}/average-sessions`;
      return fetchData(url, averageSessionsMock, (data) => data.data.sessions);
    } else {
      return averageSessionsMock.sessions;
    }
  }

  // Méthode pour récupérer la performance de l'utilisateur par ID
  async getUserPerformance(userId) {
    if (this.useAPI) {
      const url = `${API_URL}/user/${userId}/performance`;
      return fetchData(url, performanceMock, (data) =>
        data.data.data.map((performance) => new Performance(performance))
      );
    } else {
      return performanceMock.data.map(
        (performance) => new Performance(performance)
      );
    }
  }
}

export default DataService;
