import api from './api';

export const datasetService = {
  async getAllDatasets() {
    const response = await api.get('/datasets');
    return response.data;
  },

  async getDatasetById(id) {
    const response = await api.get(`/datasets/${id}`);
    return response.data;
  },

  async getDatasetData(id, sheet = null) {
    const params = sheet ? { sheet } : {};
    const response = await api.get(`/datasets/${id}/data`, { params });
    return response.data;
  },
};

