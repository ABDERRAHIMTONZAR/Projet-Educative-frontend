import { Homework } from '../types/homework';

export const mockHomeworks: Homework[] = [
  {
    id: '1',
    title: 'Devoir de Mathématiques',
    subject: 'Mathématiques',
    dueDate: '2024-03-25',
    status: 'published',
    description: 'Exercices sur les dérivées',
    class: 'Terminale S'
  },
  {
    id: '2',
    title: 'Dissertation de Français',
    subject: 'Français',
    dueDate: '2024-03-28',
    status: 'draft',
    description: 'Analyse de texte sur le romantisme',
    class: 'Première L'
  },
  {
    id: '3',
    title: 'TP de Physique',
    subject: 'Physique',
    dueDate: '2024-03-20',
    status: 'published',
    description: 'Manipulation sur les circuits électriques',
    class: 'Terminale S'
  }
];

export const subjects = ['Mathématiques', 'Français', 'Physique', 'Histoire', 'Anglais'] as const; 