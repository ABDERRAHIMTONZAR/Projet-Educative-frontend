import axios from 'axios';
import { Homework } from '../types/homework';

const API_URL = 'http://localhost:3000/api'; // Ajustez selon votre backend

export const homeworkService = {
  // Récupérer tous les devoirs
  getAllHomeworks: async (): Promise<Homework[]> => {
    try {
      const response = await axios.get(`${API_URL}/homeworks`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des devoirs:', error);
      throw error;
    }
  },

  // Créer un nouveau devoir avec fichier
  createHomework: async (formData: FormData): Promise<Homework> => {
    try {
      const response = await axios.post(`${API_URL}/homeworks`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création du devoir:', error);
      throw error;
    }
  },

  // Télécharger un fichier
  downloadFile: async (fileId: string): Promise<Blob> => {
    try {
      const response = await axios.get(`${API_URL}/files/${fileId}`, {
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors du téléchargement du fichier:', error);
      throw error;
    }
  }
}; 