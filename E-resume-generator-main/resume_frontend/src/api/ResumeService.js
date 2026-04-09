import axios from "axios";

export const baseURLL = "https://resume-generator-spring-ai-e2f9bbd5dfb0.herokuapp.com";

export const axiosInstance = axios.create({
  baseURL: baseURLL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export const generateResume = async (description) => {
  try {
    const response = await axiosInstance.post("/api/v1/resume/generate", {
      userDescription: description,
    });
    return response.data;
  } catch (error) {
    // Proper error handling
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response error:', error.response.data);
      throw new Error(error.response.data.message || 'Server error');
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request error:', error.request);
      throw new Error('No response from server');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
      throw new Error('Failed to make request');
    }
  }
};
