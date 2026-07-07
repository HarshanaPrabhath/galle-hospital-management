import apiClient from "../API/api.js";

export const getAllLabs = async () => {
  try {
    const response = await apiClient.get("/labs");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch lab records" };
  }
};

export const createLab = async (payload) => {
  try {
    const response = await apiClient.post("/labs", payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to create lab record" };
  }
};

export const updateLab = async (id, payload) => {
  try {
    const response = await apiClient.put(`/labs/${id}`, payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update lab record" };
  }
};

export const deleteLab = async (id) => {
  try {
    const response = await apiClient.delete(`/labs/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to delete lab record" };
  }
};
