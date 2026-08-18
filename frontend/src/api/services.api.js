import API from './axios';
import { demoServices, listDemoServices } from '../data/demoServices';

const demoMode = import.meta.env.VITE_DEMO_MODE === 'true';
const demoWriteError = () => {
  const error = new Error('This public demo is read-only. Connect the BookEase API to create requests, submit offers, and manage bookings.');
  error.response = { status: 403, data: { message: error.message } };
  return Promise.reject(error);
};

const liveServicesAPI = {
  getAll: (params) => API.get('/services', { params }),
  getById: (id) => API.get(`/services/${id}`),
  create: (data) => API.post('/services', data),
  update: (id, data) => API.put(`/services/${id}`, data),
  delete: (id) => API.delete(`/services/${id}`),
  getMyRequests: () => API.get('/services/my/requests'),
  getOpenRequests: (params) => API.get('/services/open/requests', { params }),
  getProviderActiveRequests: () => API.get('/services/provider/active'),
  submitBid: (serviceId, data) => API.post(`/services/${serviceId}/bids`, data),
  selectBid: (serviceId, bidId) => API.put(`/services/${serviceId}/select-bid/${bidId}`),
  updateBid: (serviceId, bidId, data) => API.put(`/services/${serviceId}/bids/${bidId}`, data),
};

const demoServicesAPI = {
  getAll: (params) => Promise.resolve({ data: listDemoServices(params) }),
  getById: (id) => {
    const service = demoServices.find((item) => item._id === id);
    return service ? Promise.resolve({ data: { data: service } }) : Promise.reject(Object.assign(new Error('Service not found'), { response: { status: 404, data: { message: 'Service not found' } } }));
  },
  create: demoWriteError,
  update: demoWriteError,
  delete: demoWriteError,
  getMyRequests: () => Promise.resolve({ data: { data: [] } }),
  getOpenRequests: (params) => Promise.resolve({ data: listDemoServices(params) }),
  getProviderActiveRequests: () => Promise.resolve({ data: { data: [] } }),
  submitBid: demoWriteError,
  selectBid: demoWriteError,
  updateBid: demoWriteError,
};

export const servicesAPI = demoMode ? demoServicesAPI : liveServicesAPI;
