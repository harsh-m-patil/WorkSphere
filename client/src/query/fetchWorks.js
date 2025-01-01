import { API_URL } from '../utils/constants';

export async function fetchWorks() {
  const response = await fetch(`${API_URL}/work`);
  const data = await response.json();

  return data.data.works;
}
