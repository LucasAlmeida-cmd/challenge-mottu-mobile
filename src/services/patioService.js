import api from './api';

export const patioService = {

  async getPatios() {
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

  async createPatio(patioData) {
    try {
      const response = await api.post('/patio', patioData);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao criar pátio: ' + error.message);
    }
  },



  //   // PUT - Atualizar usuário
  async updatePatio(identificacao, patioData) {
    try {
      const response = await api.put(`/patio/${identificacao}`, patioData);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao atualizar pátio: ' + error.message);
    }
  },


  async deletePatio(identificacao) {
    try {
      console.log(identificacao)
      const response = await api.delete(`/patio/${identificacao}`);
      if (response.status === 204) {
        return { message: "Deletado com sucesso" };
      }
    } catch (error) {
      throw new Error("Erro ao deletar pátio: " + error.message);
    }
  }



};