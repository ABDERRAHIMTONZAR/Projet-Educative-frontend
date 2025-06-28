import { useState } from 'react';
import { Globe } from 'lucide-react';

type Language = 'FR' | 'AR';

export function LanguageToggle() {
  const [language, setLanguage] = useState<Language>('FR');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'FR' ? 'AR' : 'FR');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
      aria-label={`Switch to ${language === 'FR' ? 'Arabic' : 'French'}`}
    >
      <Globe size={18} />
      <span className="text-sm font-medium">{language}</span>
    </button>
  );
}