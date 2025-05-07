const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';

export function setAccessToken(token: string) {
  localStorage.setItem(ACCESS_TOKEN, token);
}

export function setRefreshToken(token: string) {
  localStorage.setItem(REFRESH_TOKEN, token);
}

export async function getToken(): Promise<string | null> {
  return window.localStorage.getItem(ACCESS_TOKEN);
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN);
}

export function removeTokens() {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
}
