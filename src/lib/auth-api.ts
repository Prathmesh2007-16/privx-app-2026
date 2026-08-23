const API_BASE = "http://localhost:8000";
const TOKEN_KEY = "privx_token";
const USER_KEY = "privx_user";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
}

interface AuthResponse {
  token: string;
  user: AuthUser;
}

async function parseErrorOrJson<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body?.detail) message = body.detail;
    } catch {
      // ignore — use default message
    }
    throw new Error(message);
  }
  return res.json();
}

export async function signup(name: string, email: string, password: string): Promise<AuthUser> {
  const res = await fetch(`${API_BASE}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await parseErrorOrJson<AuthResponse>(res);
  saveSession(data.token, data.user);
  return data.user;
}

export async function login(email: string, password: string): Promise<AuthUser> {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await parseErrorOrJson<AuthResponse>(res);
  saveSession(data.token, data.user);
  return data.user;
}

export async function logout(): Promise<void> {
  const token = getToken();
  clearSession();
  if (!token) return;
  try {
    await fetch(`${API_BASE}/api/auth/logout`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch {
    // best-effort — session is already cleared locally either way
  }
}

function saveSession(token: string, user: AuthUser) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser(): AuthUser | null {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}