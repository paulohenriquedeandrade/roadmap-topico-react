export interface Selecao {
  id: number;
  nome: string;
  grupo: string;
  titulos: number;
}

export interface User {
  id: number;
  email: string;
  name: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}
