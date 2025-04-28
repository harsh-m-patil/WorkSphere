import { API_URL } from '../utils/constants';

export async function fetchSkillMatch(input) {
  const response = await fetch(`${API_URL}/ai/skill-match`, {
    method: 'POST',
    body: { data: input },
    credentials: 'include',
  });

  const data = await response.json();

  if (data.status === 'success') {
    return data.data.markdown;
  }

  return null;
}
