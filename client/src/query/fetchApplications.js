import axios from 'axios';
import { API_URL } from '../utils/constants';

export const fetchApplications = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('User not authenticated');

  const response = await axios.get(`${API_URL}/users/applications`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data.works || [];
};
