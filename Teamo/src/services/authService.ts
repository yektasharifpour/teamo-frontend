import { API_BASE_URL } from "./apiClient";

export async function googleLogin(credential: string) {
  const response = await fetch(`${API_BASE_URL}/api/Auth/google`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      credential,
    }),
  });

  return response.json();
}
export async function getCurrentUser(token: string) {
  const response = await fetch(`${API_BASE_URL}/api/Auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}
export async function login(phoneNumber: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/api/Auth/login`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      phoneNumber,
      password,
    }),
  });

  return response.json();
}
export async function register(phoneNumber: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/api/Auth/register`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      phoneNumber,
      password,
    }),
  });

  return response.json();
}
