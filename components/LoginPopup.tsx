import React, { useState } from 'react';
import { X, Lock, Mail, ShieldCheck } from 'lucide-react';

interface LoginPopupProps {
  setShowLogin: (show: boolean) => void;
  onLoginSuccess: (role: 'ADMIN' | 'USER') => void;
}

export const LoginPopup: React.FC<LoginPopupProps> = ({ setShowLogin, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Admin Credentials Check Only
    if (email === 'kamleshg9569@gmail.com' && password === 'Krishna@123') {
        onLoginSuccess('ADMIN');
        setShowLogin(false);
    } else {
        setError('Invalid Admin Credentials');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm grid place-items-center p-4 animate-fade-in">
      <div className="w-full max-w-[400px] bg-white flex flex-col gap-6 p-8 rounded-2xl shadow-2xl relative border-t-4 border-primary">
        <div className="flex justify-between items-center text-gray-900 font-bold text-2xl">
          <h2 className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-primary" /> Admin Login
          </h2>
          <button onClick={() => setShowLogin(false)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>
        
        <p className="text-gray-500 text-sm">Please enter your administrator credentials to access the dashboard.</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="relative">
             <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
             <input 
                type="email" 
                placeholder="Admin Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                className="w-full pl-10 border border-gray-300 p-3.5 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
             />
          </div>
          
          <div className="relative">
             <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
             <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                className="w-full pl-10 border border-gray-300 p-3.5 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
             />
          </div>

          {error && <p className="text-red-500 text-sm font-medium text-center bg-red-50 p-2 rounded">{error}</p>}

          <button className="w-full py-3.5 rounded-lg text-white bg-primary font-bold text-lg shadow-lg shadow-red-200 hover:bg-red-600 active:scale-[0.98] transition-all">
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};