import axios from "axios";
import userMock from "../mocks/user.json";
import activityMock from "../mocks/activity.json";
import averageSessionsMock from "../mocks/average-sessions.json";
import performanceMock from "../mocks/performance.json";

const API_URL = "http://localhost:3000";

class DataService {
  constructor(useAPI) {
    this.useAPI = useAPI;
  }

  async getUserById(userId) {
    if (this.useAPI) {
      try {
        const response = await axios.get(`${API_URL}/user/${userId}`);
        return response.data.data;
      } catch (error) {
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
      const user = userMock.find((user) => user.id === userId);
      if (!user) {
        throw new Error(`User with id ${userId} not found in mock data`);
      }
      return user;
    }
  }

  async getUserActivityById(userId) {
    if (this.useAPI) {
      try {
        const response = await axios.get(`${API_URL}/user/${userId}/activity`);
        return response.data.data;
      } catch (error) {
        console.error(
          "Error fetching user activity from API, using mock data:",
          error
        );
        return activityMock;
      }
    } else {
      return activityMock;
    }
  }

  async getUserAverageSession(userId) {
    if (this.useAPI) {
      try {
        const response = await axios.get(
          `${API_URL}/user/${userId}/average-sessions`
        );
        return response.data.data;
      } catch (error) {
        console.error(
          "Error fetching user average sessions from API, using mock data:",
          error
        );
        return averageSessionsMock;
      }
    } else {
      return averageSessionsMock;
    }
  }

  async getUserPerformance(userId) {
    if (this.useAPI) {
      try {
        const response = await axios.get(
          `${API_URL}/user/${userId}/performance`
        );
        return response.data.data;
      } catch (error) {
        console.error(
          "Error fetching user performance from API, using mock data:",
          error
        );
        return performanceMock;
      }
    } else {
      return performanceMock;
    }
  }
}

export default DataService;
