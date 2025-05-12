import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, LoginCredentials, RegisterData, AuthResponse, Patio } from '../types/auth';

// Chaves de armazenamento
const STORAGE_KEYS = {
  USER: '@MotoFindr:user',
  TOKEN: '@MotoFindr:token',
  REGISTERED_USERS: '@MotoFindr:registeredUsers',
  PATIOS: '@MotoFindr:patios',
};


// Admin mockado
const mockAdmin = {
  id: 'admin',
  name: 'Administrador',
  email: 'admin',
  role: 'admin' as const,
  image: 'https://randomuser.me/api/portraits/men/3.jpg',
};

// Lista de usuários cadastrados (pacientes)
let registeredUsers: (User & { password: string })[] = [];

let registeredPatios: Patio[] = [];


export const authService = {
  async signIn(credentials: LoginCredentials): Promise<AuthResponse> {
    // Verifica se é o admin
    if (credentials.email === mockAdmin.email && credentials.password === 'admin') {
      return {
        user: mockAdmin,
        token: 'admin-token',
      };
    }

    // Verifica se é um paciente registrado
    const patient = registeredUsers.find(
      (p) => p.email === credentials.email
    );
    if (patient) {
      // Verifica a senha do paciente
      if (credentials.password === patient.password) {
        // Remove a senha do objeto antes de retornar
        const { password, ...patientWithoutPassword } = patient;
        return {
          user: patientWithoutPassword,
          token: `patient-token-${patient.id}`,
        };
      }
    }

    throw new Error('Email ou senha inválidos');
  },



  async registerPatio(patio: Omit<Patio, 'id'>): Promise<Patio> {
    try {
      const patiosJson = await AsyncStorage.getItem(STORAGE_KEYS.PATIOS);
      const patios: Patio[] = patiosJson ? JSON.parse(patiosJson) : [];
  
      const newPatio: Patio = {
        ...patio,
        id: `patio-${Date.now()}`, 
      };
  
      const updatedPatios = [...patios, newPatio];
      await AsyncStorage.setItem(STORAGE_KEYS.PATIOS, JSON.stringify(updatedPatios));
  
      return newPatio;
    } catch (error) {
      console.error('Erro ao registrar pátio:', error);
      throw error;
    }
  },
  


  async loadRegisteredPatios(): Promise<void> {
    try {
      const patiosJson = await AsyncStorage.getItem(STORAGE_KEYS.PATIOS);
      if (patiosJson) {
        registeredPatios = JSON.parse(patiosJson);
      }
    } catch (error) {
      console.error('Erro ao carregar pátios registrados:', error);
    }
  },
  

  async signOut(): Promise<void> {
    // Limpa os dados do usuário do AsyncStorage
    await AsyncStorage.removeItem(STORAGE_KEYS.USER);
    await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);
  },

  async getStoredUser(): Promise<User | null> {
    try {
      const userJson = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      if (userJson) {
        return JSON.parse(userJson);
      }
      return null;
    } catch (error) {
      console.error('Erro ao obter usuário armazenado:', error);
      return null;
    }
  },

  // Funções para o admin
  async getAllUsers(): Promise<User[]> {
    return [...registeredUsers];
  },

  // Função para carregar usuários registrados ao iniciar o app
  async loadRegisteredUsers(): Promise<void> {
    try {
      const usersJson = await AsyncStorage.getItem(STORAGE_KEYS.REGISTERED_USERS);
      if (usersJson) {
        registeredUsers = JSON.parse(usersJson);
      }
    } catch (error) {
      console.error('Erro ao carregar usuários registrados:', error);
    }
  },
};
