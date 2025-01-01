import { API_URL } from '../utils/constants';

export async function fetchUserById(id) {
  const response = await fetch(`${API_URL}/users/${id}`);
  const data = await response.json();

  if (data.status === 'success') {
    return data.data.user;
  }

  return null;
}
