import { API_URL } from '../utils/constants';

export async function fetchLoggedInUser() {
  const token = localStorage.getItem('token'); // Retrieve token from localStorage
  if (!token) throw new Error('User not authenticated');

  const response = await fetch(`${API_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json', // Ensure JSON request format
      Authorization: `Bearer ${token}`, // Add Bearer token for authentication
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();

  if (data.status === 'success') {
    return data.data.user;
  }

  return null;
}