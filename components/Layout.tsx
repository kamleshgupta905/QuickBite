import React, { useState, useEffect } from 'react';
import { Search, ShoppingBasket, Menu, Facebook, Twitter, Linkedin, MapPin, ChevronDown, Loader2 } from 'lucide-react';
import { ScreenType } from '../types';

interface LayoutProps {
  currentScreen: ScreenType;
  setCurrentScreen: (screen: ScreenType) => void;
  cartCount: number;
  setShowLogin: (show: boolean) => void;
  children: React.ReactNode;
}

export const Header: React.FC<{ 
  onNavigate: (screen: ScreenType) => void; 
  cartCount: number;
  currentScreen: ScreenType;
  onLoginClick: () => void;
}> = ({ onNavigate, cartCount, currentScreen, onLoginClick }) => {
  const [address, setAddress] = useState<string>('Detecting location...');
  const [subAddress, setSubAddress] = useState<string>('Please wait...');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const fetchLocation = () => {
    setIsLoadingLocation(true);
    setSubAddress('Fetching...');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`);
            const data = await response.json();
            if (data && data.address) {
              const city = data.address.city || data.address.town || data.address.village || data.address.state_district || 'Current Location';
              const area = data.address.suburb || data.address.neighbourhood || data.address.road || '';
              const state = data.address.state || '';
              
              setAddress(city);
              setSubAddress(`${area ? area + ', ' : ''}${state}`);
            } else {
               setAddress('Current Location');
               setSubAddress(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
            }
          } catch (error) {
            // Fallback if API fails but we have coords
            setAddress('Location Detected');
            setSubAddress(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
          } finally {
            setIsLoadingLocation(false);
          }
        },
        (error) => {
          console.warn("Error fetching location:", error.message);
          setAddress('Bangalore');
          setSubAddress('123, Green Park, Indiranagar, Bangalore');
          setIsLoadingLocation(false);
        },
        // enableHighAccuracy: false is faster and less likely to time out on non-GPS devices
        { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
      );
    } else {
       setAddress('Bangalore');
       setSubAddress('123, Green Park, Indiranagar, Bangalore');
       setIsLoadingLocation(false);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  // --- ADMIN HEADER ---
  if (currentScreen === 'ADMIN') {
    return (
      <header className="sticky top-0 z-50 bg-white py-4 px-6 md:px-[4vw] flex items-center justify-between shadow-sm border-b border-gray-200 animate-fade-in">
         <div className="cursor-pointer flex flex-col" onClick={() => onNavigate('HOME')}>
            <h1 className="text-primary font-bold text-3xl tracking-tight leading-none">QuickBite.</h1>
            <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mt-0.5 ml-0.5">Admin Panel</p>
         </div>
         <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 overflow-hidden cursor-pointer hover:border-primary transition-colors">
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" alt="Admin" className="w-full h-full object-cover" />
             </div>
         </div>
      </header>
    );
  }

  // --- USER HEADER ---
  return (
    <header className="sticky top-0 z-50 bg-white py-4 md:py-5 px-6 md:px-[8vw] flex items-center justify-between transition-all shadow-sm md:shadow-none">
      
      {/* Logo & Location Block (Swiggy Style) */}
      <div className="flex items-center gap-8">
          <div className="cursor-pointer" onClick={() => onNavigate('HOME')}>
             <h1 className="text-primary font-bold text-3xl tracking-tight">QuickBite.</h1>
          </div>
          
          {/* Location Selector */}
          <div 
            className="hidden lg:flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity group"
            onClick={fetchLocation}
            title="Click to refresh location"
          >
              <MapPin className={`w-5 h-5 text-primary group-hover:scale-110 transition-transform ${isLoadingLocation ? 'animate-bounce' : ''}`} />
              <div className="flex flex-col leading-none">
                  <span className="font-bold text-sm text-gray-800 flex items-center gap-1 group-hover:text-primary transition-colors">
                      {address} <span className="text-gray-400 font-normal">|</span>
                  </span>
                  <span className="text-xs text-gray-500 w-48 truncate group-hover:text-gray-700">
                    {isLoadingLocation ? 'Fetching...' : subAddress}
                  </span>
              </div>
              <ChevronDown className="w-4 h-4 text-primary ml-2" />
          </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8 text-[#49557e] text-[17px] font-medium">
        <button 
            onClick={() => onNavigate('HOME')} 
            className={`hover:text-primary transition-colors cursor-pointer ${currentScreen === 'HOME' ? 'border-b-2 border-primary pb-1' : ''}`}
        >
            home
        </button>
        <button 
            onClick={() => onNavigate('RESTAURANT')} 
            className={`hover:text-primary transition-colors cursor-pointer ${currentScreen === 'RESTAURANT' ? 'border-b-2 border-primary pb-1' : ''}`}
        >
            menu
        </button>
        <button 
            onClick={() => onNavigate('COMBOS')}
            className={`hover:text-primary transition-colors cursor-pointer ${currentScreen === 'COMBOS' ? 'border-b-2 border-primary pb-1' : ''}`}
        >
            combos
        </button>
        <button 
            onClick={() => onNavigate('CONTACT')}
            className={`hover:text-primary transition-colors cursor-pointer ${currentScreen === 'CONTACT' ? 'border-b-2 border-primary pb-1' : ''}`}
        >
            contact us
        </button>
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-4 md:gap-6">
        <button onClick={() => onNavigate('SEARCH')} className="text-[#49557e] hover:text-primary transition-colors">
            <Search className="w-6 h-6" />
        </button>

        <button 
          onClick={() => onNavigate('CART')}
          className="relative text-[#49557e] hover:text-primary transition-colors"
        >
          <ShoppingBasket className="w-7 h-7" />
          {cartCount > 0 && (
            <div className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-semibold min-w-[18px] h-[18px] rounded-full flex items-center justify-center">
              {cartCount}
            </div>
          )}
        </button>
        
        <button 
           onClick={onLoginClick}
           className="bg-transparent border border-primary text-[#49557e] hover:bg-[#fff4f2] px-5 md:px-7 py-2 md:py-2.5 rounded-full text-[14px] md:text-[16px] font-medium transition-all whitespace-nowrap"
        >
          sign in
        </button>
      </div>
    </header>
  );
};

export const Footer: React.FC = () => (
  <footer className="bg-footer text-[#d9d9d9] pt-20 pb-8 px-6 md:px-[8vw] mt-24 flex flex-col gap-5">
    <div className="w-full grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-20 mb-8">
      <div className="flex flex-col gap-5">
        <h1 className="text-primary font-bold text-3xl">QuickBite.</h1>
        <p className="text-sm leading-relaxed max-w-sm">
           Your favorite food, delivered fast and fresh. Experience the best culinary delights from top restaurants near you.
        </p>
        <div className="flex gap-4">
             <div className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center cursor-pointer hover:border-primary hover:text-primary transition-colors">
                 <Facebook className="w-5 h-5" />
             </div>
             <div className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center cursor-pointer hover:border-primary hover:text-primary transition-colors">
                 <Twitter className="w-5 h-5" />
             </div>
             <div className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center cursor-pointer hover:border-primary hover:text-primary transition-colors">
                 <Linkedin className="w-5 h-5" />
             </div>
        </div>
      </div>

      <div className="flex flex-col gap-5">
         <h2 className="text-white text-xl font-bold">COMPANY</h2>
         <ul className="space-y-3 text-sm cursor-pointer">
            <li className="hover:text-primary">Home</li>
            <li className="hover:text-primary">About us</li>
            <li className="hover:text-primary">Delivery</li>
            <li className="hover:text-primary">Privacy policy</li>
         </ul>
      </div>

      <div className="flex flex-col gap-5">
         <h2 className="text-white text-xl font-bold">GET IN TOUCH</h2>
         <ul className="space-y-3 text-sm">
            <li>+91 9315515700</li>
            <li>kamleshg9569@gmail.com</li>
            <li>Dankaur, Greater Noida, UP, India</li>
         </ul>
      </div>
    </div>
    <hr className="w-full h-[1px] bg-gray-600 border-none my-5"/>
    <p className="text-center text-sm">Copyright 2024 © QuickBite.com - All Right Reserved.</p>
  </footer>
);

export const Layout: React.FC<LayoutProps> = ({ currentScreen, setCurrentScreen, cartCount, setShowLogin, children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header 
        onNavigate={setCurrentScreen} 
        cartCount={cartCount} 
        currentScreen={currentScreen} 
        onLoginClick={() => setShowLogin(true)}
      />
      <main className="flex-1 w-full mx-auto">
        {children}
      </main>
      {/* Hide Footer on Admin Screen */}
      {currentScreen !== 'ADMIN' && <Footer />}
    </div>
  );
};