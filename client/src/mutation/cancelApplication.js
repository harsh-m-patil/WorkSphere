import axios from 'axios';
import { API_URL } from '../utils/constants';

export async function cancelApplication(id) {
  const token = localStorage.getItem('token');

  const response = await axios.delete(`${API_URL}/work/cancel/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
