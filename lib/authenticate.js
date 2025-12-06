// lib/authenticate.js
import { jwtDecode } from 'jwt-decode';

// ------------------
// TOKEN STORAGE
// ------------------

export function setToken(token) {
  localStorage.setItem('access_token', token);
}

export function getToken() {
  try {
    return localStorage.getItem('access_token');
  } catch (err) {
    return null;
  }
}

export function removeToken() {
  localStorage.removeItem('access_token');
}

// ------------------
// JWT READ / AUTH
// ------------------

export function readToken() {
  try {
    const token = getToken();
    return token ? jwtDecode(token) : null;
  } catch (err) {
    return null;
  }
}

export function isAuthenticated() {
  return !!readToken();
}

// ------------------
// LOGIN
// ------------------

export async function authenticateUser(user, password) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userName: user, password }),
  });

  const data = await res.json();
  console.log('API Response:', data);  // Log the response to inspect it
  if (res.status === 200) {
    setToken(data.token);
    return true;
  } else {
    const errorMessage = typeof data.message === 'string' ? data.message : JSON.stringify(data.message);
    throw new Error(errorMessage || 'Login failed');
  }
}

// ------------------
// REGISTRATION
// ------------------

export async function registerUser(user, password, password2) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userName: user, password, password2 }),
  });

  const data = await res.json();

  if (res.status === 201 || res.status === 200) {
    return true; // registration successful
  } else {
    throw new Error(data.message || 'Registration failed');
  }
}
