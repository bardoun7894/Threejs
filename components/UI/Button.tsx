import React, { ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  isLoading, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "w-full relative overflow-hidden rounded-lg font-heading font-semibold tracking-wider uppercase transition-all duration-300 py-4 flex items-center justify-center gap-2 group";
  
  const variants = {
    primary: "bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/50 hover:bg-cyber-cyan hover:text-cyber-dark hover:shadow-[0_0_20px_rgba(0,217,255,0.5)] active:scale-[0.98]",
    secondary: "bg-transparent text-gray-400 border border-white/10 hover:border-cyber-magenta hover:text-cyber-magenta hover:shadow-[0_0_15px_rgba(255,0,110,0.3)] active:scale-[0.98]"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${isLoading ? 'opacity-80 cursor-wait' : ''} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin" size={20} />
          <span>{isLoading ? 'Processing...' : 'Processing...'}</span>
        </>
      ) : (
        <>
          <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0" />
        </>
      )}
    </button>
  );
};