/* eslint-disable @typescript-eslint/no-explicit-any */
import {create} from 'zustand';
import axios from 'axios';
import { ReactNode } from 'react';
interface Homework {
    nom_devoir: ReactNode;
    url: string | undefined;
    title: any;
    type: ReactNode;
    fileName: string;
    fileUrl: string;
    fileType: string;
  }
// Store Zustand pour gérer les devoirs
interface HomeworkState {
  homeworks: Homework[];
  addHomework: (homework: Homework) => void;
  loadHomeworks: () => Promise<void>;
}

export const useHomeworkStore = create<HomeworkState>((set) => ({
  homeworks: [],
  addHomework: (homework: Homework) =>
    set((state) => ({
      homeworks: [...state.homeworks, homework],
    })),

    loadHomeworks: async () => {
      const token = localStorage.getItem('token');
    try {
      // Appeler l'API backend pour obtenir la liste des fichiers de S3
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/recuperer`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });  
      set({ homeworks: response.data });  
    } catch (error) {
      console.error('Erreur lors du chargement des devoirs:', error);
    }
  },
}));