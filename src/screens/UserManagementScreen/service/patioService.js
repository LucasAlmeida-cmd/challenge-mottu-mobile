// src/services/userService.js
import api from '../../../services/api';

export const userService = {
  // GET - Buscar todos os usuários
  async getUsers() {
    try {
      const response = await api.get('/patio');
      return response.data;
    } catch (error) {
      throw new Error('Erro ao buscar patios: ' + error.message);
    }
  },

  // GET - Buscar usuário por ID
  async getUserById(id) {
    try {
      const response = await api.get(`/patio/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao buscar usuário: ' + error.message);
    }
  },

//   // POST - Criar novo usuário
//   async createUser(userData) {
//     try {
//       const response = await api.post('/users', userData);
//       return response.data;
//     } catch (error) {
//       throw new Error('Erro ao criar usuário: ' + error.message);
//     }
//   },

//   // PUT - Atualizar usuário
//   async updateUser(id, userData) {
//     try {
//       const response = await api.put(`/users/${id}`, userData);
//       return response.data;
//     } catch (error) {
//       throw new Error('Erro ao atualizar usuário: ' + error.message);
//     }
//   },

  // DELETE - Remover usuário
  async deleteUser(id) {
    try {
      const response = await api.delete(`/patio/${identificacao}`);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao deletar usuário: ' + error.message);
    }
  }
};