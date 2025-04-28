import { API_URL } from '../utils/constants';

export async function fetchWorks(page, search, sort, joblevel, pay) {
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

  if (joblevel && joblevel !== 'All') {
    searchParams.append('joblevel', joblevel);
  }

  if (pay && pay !== 'all') {
    searchParams.append('pay[gte]', pay);
  }

  const response = await fetch(`${API_URL}/work?${searchParams.toString()}`);
  const data = await response.json();

  return data;
}
