import { API_URL } from '../utils/constants';

export async function fetchFreelancers(page, search, sort) {
  const searchParams = new URLSearchParams({
    page: page.toString(),
    limit: 12,
  });

  if (search) {
    searchParams.append('search', search);
  }

  if (sort) {
    searchParams.append('sort', sort);
  }

  const response = await fetch(
    `${API_URL}/users/freelancers?${searchParams.toString()}`
  );
  const data = await response.json();

  return data;
}
