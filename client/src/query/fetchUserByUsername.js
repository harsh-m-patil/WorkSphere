import { API_URL } from '../utils/constants';

export async function fetchUserByUsername(username) {
  const response = await fetch(`${API_URL}/users/u/${username}`);
  const data = await response.json();

  if (data.status === 'success') {
    return data.data.user;
  }

  return null;
}
