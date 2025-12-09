import React, { InputHTMLAttributes } from 'react';
import { AlertCircle } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, error, icon, className = '', ...props }) => {
  return (
    <div className="w-full mb-6 relative group text-start">
      <label className="block text-cyber-cyan text-xs font-bold uppercase tracking-widest mb-2 ltr:ml-1 rtl:mr-1">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-cyber-cyan transition-colors duration-300 ltr:left-4 rtl:right-4">
            {icon}
          </div>
        )}
        <input
          className={`
            w-full bg-cyber-glass border border-cyber-glassBorder 
            text-white placeholder-gray-500 rounded-lg py-3 
            ltr:pr-4 rtl:pl-4
            ${icon ? 'ltr:pl-12 rtl:pr-12' : 'ltr:pl-4 rtl:pr-4'} 
            focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan
            transition-all duration-300 backdrop-blur-sm
            hover:border-white/20
            ${error ? 'border-cyber-magenta focus:border-cyber-magenta focus:ring-cyber-magenta' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      
      {error && (
        <div className="absolute -bottom-5 flex items-center gap-1 text-cyber-magenta text-xs font-medium animate-pulse ltr:left-0 rtl:right-0">
          <AlertCircle size={10} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};