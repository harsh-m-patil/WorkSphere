import { API_URL } from '../utils/constants';

export async function fetchWorks(page, search, sort) {
  const searchParams = new URLSearchParams({
    page: page.toString(),
    limit: 10,
  });

  if (search) {
    searchParams.append('search', search);
  }

  if (sort) {
    searchParams.append('sort', sort);
  }

  const response = await fetch(`${API_URL}/work?${searchParams.toString()}`);
  const data = await response.json();

  return data;
}
