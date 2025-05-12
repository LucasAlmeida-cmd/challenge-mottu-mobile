// Criação do Arquivo auth.ts
// O arquivo auth.ts define os tipos utilizados para autenticação e autorização no sistema. Ele organiza os diferentes perfis de usuário, os dados necessários para login e registro, e a estrutura das respostas da API de autenticação.
// Código Criado:
/**
 * Tipos relacionados à autenticação e autorização
 */

/**
 * Perfis de usuário disponíveis no sistema
 */
export type UserRole = 'admin';

/**
 * Interface base do usuário
 */
export interface BaseUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  image: string;
}



/**
 * Interface do administrador
 */
export interface Admin extends BaseUser {
  role: 'admin';
}

/**
 * Interface do usuário autenticado
 */
export type User = Admin ;

export interface Patio {
  id: string;
  identificacao: string;
  largura: string;
  comprimento: string;
}

/**
 * Dados necessários para login
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Dados necessários para registro
 */
export interface RegisterData {
  name: string;
  email: string;
  password: string;
}
export interface RegisterDataPatio {
  identificacao: string;
  largura: string;
  comprimento: string;
}

/**
 * Resposta da API de autenticação
 */
export interface AuthResponse {
  user: User;
  token: string;
}

/**
 * Contexto de autenticação
 */
export interface AuthContextData {
  user: User | null;
  loading: boolean;
  signIn: (credentials: LoginCredentials) => Promise<void>;
  registerPatio: (data: RegisterDataPatio) => Promise<void>;
  signOut: () => Promise<void>;@rneui
} 
