export interface TokenPayload {
  sub: number;
  email: string;
  exp: number;
  iat: number;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  refreshToken: string;
}

export interface RegisterResponse {
  success: boolean;
}

export interface RefreshResponse {
  success: boolean;
  token: string;
}

export interface LogoutResponse {
  success: boolean;
}
