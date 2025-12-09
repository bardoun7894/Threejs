import React from 'react';
import { useLanguageStore } from '../../store/languageStore';

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguageStore();

  return (
    <div className="flex items-center gap-2 bg-cyber-glass border border-cyber-glassBorder rounded-full p-1 backdrop-blur-md">
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
          language === 'en' 
            ? 'bg-cyber-cyan text-cyber-dark shadow-[0_0_10px_rgba(0,217,255,0.4)]' 
            : 'text-gray-400 hover:text-white'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('ar')}
        className={`px-3 py-1 rounded-full text-xs font-bold font-arabic transition-all duration-300 ${
          language === 'ar' 
            ? 'bg-cyber-magenta text-white shadow-[0_0_10px_rgba(255,0,110,0.4)]' 
            : 'text-gray-400 hover:text-white'
        }`}
      >
        عربي
      </button>
    </div>
  );
};