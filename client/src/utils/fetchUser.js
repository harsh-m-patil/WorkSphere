import { API_URL } from "./constants";

export default async function fetchUser({ queryKey }) {
  const id = queryKey[1];
  const apiRes = await fetch(`${API_URL}/users/${id}`);

  if (!apiRes.ok) {
    throw new Error(`details/${id} fetch not ok`);
  }

  return apiRes.json();
}
