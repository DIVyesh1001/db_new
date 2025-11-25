import api from './api';

export const fileService = {
  async uploadFile(file, name, description) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    if (description) {
      formData.append('description', description);
    }

    const response = await api.post('/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async listFiles() {
    const response = await api.get('/files/list');
    return response.data;
  },

  async deleteFile(id) {
    const response = await api.delete(`/files/${id}`);
    return response.data;
  },
};

