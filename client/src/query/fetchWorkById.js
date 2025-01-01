import { API_URL } from '../utils/constants';

export async function fetchWorkById(id) {
  const response = await fetch(`${API_URL}/work/${id}`);
  const data = await response.json();

  if (data.status === 'success') {
    return data.data.work;
  }

  return null;
}
