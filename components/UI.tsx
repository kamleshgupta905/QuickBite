import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  fullWidth, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center px-6 py-3 text-[16px] font-medium transition-all duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-red-600 focus:ring-primary shadow-sm",
    secondary: "bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-800",
    outline: "border border-primary text-primary hover:bg-[#fff4f2] bg-transparent",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : children}
    </button>
  );
};

export const Badge: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = 'bg-green-100 text-green-700' }) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${color}`}>
    {children}
  </span>
);

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input
    className="w-full px-4 py-3 rounded border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all placeholder:text-gray-400"
    {...props}
  />
);

export const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mb-4">
    <h2 className="text-xl md:text-2xl font-bold text-[#262626]">{title}</h2>
    {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
  </div>
);

export const Modal: React.FC<{ isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-xl w-full max-w-md p-8 shadow-2xl animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-[#262626]">{title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
};