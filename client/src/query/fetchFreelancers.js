import { API_URL } from '../utils/constants';

export async function fetchFreelancers() {
  const response = await fetch(`${API_URL}/users/freelancers`);
  const data = await response.json();

  if (data.status === 'success') {
    return data.data.users;
  }

  return null;
}
