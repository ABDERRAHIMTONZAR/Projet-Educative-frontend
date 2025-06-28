import { Homework, FilterOptions } from '../types/homework';

export const filterHomeworks = (homeworks: Homework[], filters: FilterOptions): Homework[] => {
  return homeworks.filter(homework => {
    // Filtrer par sujet
    if (filters.subject !== 'all' && homework.subject !== filters.subject) {
      return false;
    }

    // Filtrer par date
    const homeworkDate = new Date(homework.dueDate);
    const fromDate = new Date(filters.dateRange.from);
    const toDate = new Date(filters.dateRange.to);

    return homeworkDate >= fromDate && homeworkDate <= toDate;
  });
}; 