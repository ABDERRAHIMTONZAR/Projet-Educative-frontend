export const getCurrentDate = (): string => {
  return new Date().toISOString().split('T')[0];
};

export const getDateIn30Days = (): string => {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return date.toISOString().split('T')[0];
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('fr-FR');
}; 