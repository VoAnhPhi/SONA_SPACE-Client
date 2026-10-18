// The signed-in session lives in localStorage ("remember me") or sessionStorage, under these keys.
const TOKEN_KEY = "authToken";
const USER_KEY = "user";

export const saveAuthData = (token: string, user: any, rememberMe: boolean) => {
  const storage = rememberMe ? localStorage : sessionStorage;
  storage.setItem(TOKEN_KEY, token);
  storage.setItem(USER_KEY, JSON.stringify(user));
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
};

export const getAuthUser = (): any => {
  const userStr = localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);
  if (!userStr) return null;

  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

export const updateAuthUser = (user: any) => {
  const storage =
    localStorage.getItem(TOKEN_KEY) || localStorage.getItem(USER_KEY)
      ? localStorage
      : sessionStorage;

  storage.setItem(USER_KEY, JSON.stringify(user));
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

export const clearAuthData = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
};
