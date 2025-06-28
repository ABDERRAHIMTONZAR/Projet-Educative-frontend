export type HomeworkStatus = 'draft' | 'published' | 'archived';

export interface Homework {
  id: string;
  title: string;
  subject: string;
  class: string;
  dueDate: string;
  description: string;
  status: HomeworkStatus;
  file?: {
    name: string;
    url: string;
  };
}

export interface FilterOptions {
  subject: string;
  dateRange: {
    from: string;
    to: string;
  };
} 