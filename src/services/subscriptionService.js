import api from './api';

export const subscriptionService = {
  async createSubscription(subscriptionData) {
    const response = await api.post('/subscriptions', subscriptionData);
    return response.data;
  },

  async getAllSubscriptions() {
    const response = await api.get('/subscriptions');
    return response.data;
  },

  async updateSubscription(id, updateData) {
    const response = await api.put(`/subscriptions/${id}`, updateData);
    return response.data;
  },

  async deleteSubscription(id) {
    const response = await api.delete(`/subscriptions/${id}`);
    return response.data;
  },
};

