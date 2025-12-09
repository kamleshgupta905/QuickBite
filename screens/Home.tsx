import React, { useState } from 'react';
import { Star, Plus, Minus, Clock, Utensils, Award } from 'lucide-react';
import { CATEGORIES } from '../data';
import { MenuItem, CartItem } from '../types';

interface HomeProps {
  items: MenuItem[];
  onRestaurantClick: (id: string) => void;
  onSearchClick: () => void;
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: string) => void;
}

export const Home: React.FC<HomeProps> = ({ items, onRestaurantClick, cart, addToCart, removeFromCart }) => {
  const [category, setCategory] = useState("All");

  return (
    <div className="md:px-[8vw] px-4">
      
      {/* --- HERO SECTION --- */}
      <div 
        className="h-[34vw] min-h-[400px] my-8 mx-auto rounded-[30px] bg-no-repeat bg-cover relative flex items-center px-[4vw] md:px-[6vw] animate-fade-in transition-transform duration-500 hover:scale-[1.005]"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80')` }}
      >
          <div className="absolute inset-0 bg-black/40 rounded-[30px]"></div>

          <div className="relative z-10 flex flex-col items-start gap-4 md:gap-[1.5vw] max-w-[60%] animate-slide-up text-white">
             <h2 className="font-bold text-[clamp(2.5rem,4.5vw,5rem)] leading-tight drop-shadow-lg">
                Order your <br/> favourite food here
             </h2>
             <p className="text-[clamp(0.9rem,1vw,1.2rem)] font-medium text-white/90 hidden md:block max-w-xl drop-shadow-md">
                Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
             </p>
             <button className="bg-white text-[#747474] font-medium px-8 py-3 rounded-full text-[max(1vw,14px)] hover:bg-[#fff4f2] hover:text-primary transition-all duration-300 mt-4 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95">
                View Menu
             </button>
          </div>
      </div>

      {/* --- EXPLORE MENU --- */}
      <div className="flex flex-col gap-5 my-14 opacity-0 animate-slide-up delay-100" id="explore-menu">
         <h1 className="text-[#262626] font-bold text-3xl">Explore our menu</h1>
         <p className="max-w-[60%] text-[#808080] leading-6 mb-4">
            Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
         </p>
         
         <div className="flex justify-between items-center gap-8 text-center overflow-x-scroll no-scrollbar py-4 px-2">
            {CATEGORIES.map((item, index) => (
                <div 
                    key={index} 
                    onClick={() => setCategory(prev => prev === item.name ? "All" : item.name)}
                    className="cursor-pointer flex-shrink-0 group"
                >
                    <div className={`p-1 rounded-full w-[7.5vw] min-w-[80px] h-[7.5vw] min-h-[80px] transition-all duration-300 ${category === item.name ? 'border-2 border-primary scale-110 shadow-lg' : 'border-2 border-transparent hover:border-gray-200'}`}>
                        <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover rounded-full transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                    <p className={`mt-2.5 text-[#747474] text-[max(1.4vw,16px)] font-medium cursor-pointer transition-colors ${category === item.name ? 'text-primary' : 'group-hover:text-gray-900'}`}>
                        {item.name}
                    </p>
                </div>
            ))}
         </div>
         <hr className="my-2.5 h-[2px] bg-[#e2e2e7] border-none"/>
      </div>

      {/* --- FOOD DISPLAY --- */}
      <div className="mt-8 mb-16 opacity-0 animate-slide-up delay-200">
          <h2 className="text-[#262626] font-bold text-3xl mb-8">Top dishes near you</h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-8 gap-y-12">
              {items.filter(item => category === "All" || item.category === category).map((item) => (
                  <FoodItemCard 
                    key={item.id} 
                    item={item} 
                    cartItem={cart.find(c => c.id === item.id)}
                    onAdd={() => addToCart(item)}
                    onRemove={() => removeFromCart(item.id)}
                  />
              ))}
              {items.filter(item => category === "All" || item.category === category).length === 0 && (
                  <p className="text-gray-500">No dishes found in this category.</p>
              )}
          </div>
      </div>

      {/* --- WHY CHOOSE US (REPLACED APP DOWNLOAD) --- */}
      <div className="my-24 grid md:grid-cols-3 gap-8 text-center">
        {/* Card 1 */}
        <div className="opacity-0 animate-slide-up flex flex-col items-center gap-4 p-8 rounded-3xl bg-white shadow-soft border border-gray-50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 group">
           <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-primary mb-2 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
              <Clock className="w-9 h-9" />
           </div>
           <h3 className="text-2xl font-bold text-gray-800 group-hover:text-primary transition-colors">Super Fast Delivery</h3>
           <p className="text-gray-500 text-base leading-relaxed">
              Experience lightning-fast delivery with our dedicated fleet. Your food arrives hot and fresh, right when you need it.
           </p>
        </div>
        
        {/* Card 2 */}
        <div className="opacity-0 animate-slide-up delay-200 flex flex-col items-center gap-4 p-8 rounded-3xl bg-white shadow-soft border border-gray-50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 group">
           <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-primary mb-2 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
              <Utensils className="w-9 h-9" />
           </div>
           <h3 className="text-2xl font-bold text-gray-800 group-hover:text-primary transition-colors">Fresh & Tasty Food</h3>
           <p className="text-gray-500 text-base leading-relaxed">
              We partner with top-rated restaurants to ensure every meal is prepared with the finest ingredients and authentic flavors.
           </p>
        </div>
        
        {/* Card 3 */}
        <div className="opacity-0 animate-slide-up delay-300 flex flex-col items-center gap-4 p-8 rounded-3xl bg-white shadow-soft border border-gray-50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 group">
           <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-primary mb-2 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
              <Award className="w-9 h-9" />
           </div>
           <h3 className="text-2xl font-bold text-gray-800 group-hover:text-primary transition-colors">Top Rated Service</h3>
           <p className="text-gray-500 text-base leading-relaxed">
              Our customer-first approach ensures a seamless ordering experience with 24/7 support and real-time tracking.
           </p>
        </div>
      </div>

      {/* --- PROMO BANNER (REPLACED APP DOWNLOAD) --- */}
      <div className="opacity-0 animate-slide-up delay-500 relative rounded-3xl overflow-hidden mb-24 mx-auto max-w-6xl shadow-xl shadow-orange-500/20 group hover:shadow-2xl hover:shadow-orange-500/30 transition-all duration-500 hover:scale-[1.01]">
         <div className="absolute inset-0 bg-gradient-to-r from-[#ff4c24] to-[#ff8c42] transition-transform duration-700 group-hover:scale-105"></div>
         
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-10 md:p-16 gap-10">
            <div className="text-white text-center md:text-left space-y-4">
               <h2 className="text-4xl md:text-5xl font-bold tracking-tight drop-shadow-sm">Get 50% Off Your First Order</h2>
               <p className="opacity-95 text-xl max-w-lg font-medium leading-relaxed">Join our community of food lovers and get exclusive discounts, free delivery codes, and much more!</p>
            </div>
            
            <div className="flex w-full md:w-auto bg-white/10 backdrop-blur-sm p-2 rounded-full shadow-lg border border-white/20 hover:bg-white/20 transition-all">
               <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="px-6 py-4 w-full md:w-80 outline-none text-white bg-transparent placeholder-white/70 font-medium"
               />
               <button className="bg-white text-[#ff4c24] px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors whitespace-nowrap shadow-md text-lg active:scale-95 duration-200">
                  Subscribe
               </button>
            </div>
         </div>
         
         {/* Decorative Circles - Animated */}
         <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl animate-pulse-slow"></div>
         <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse-slow delay-300"></div>
      </div>

    </div>
  );
};

const FoodItemCard: React.FC<{ 
    item: MenuItem; 
    cartItem?: CartItem;
    onAdd: () => void; 
    onRemove: () => void;
}> = ({ item, cartItem, onAdd, onRemove }) => {
    const itemCount = cartItem ? cartItem.quantity : 0;

    return (
        <div className="w-full m-auto rounded-[20px] shadow-card transition-all duration-500 ease-in-out animate-fade-in hover:shadow-xl bg-white hover:-translate-y-1 group overflow-hidden border border-transparent hover:border-gray-100">
            <div className="relative overflow-hidden h-[220px]">
                {/* Removed group-hover:scale-110 from image class */}
                <img src={item.image} alt={item.name} className="w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>
                <div className="absolute bottom-[15px] right-[15px]">
                    {!itemCount ? (
                        <div 
                            className="w-10 h-10 cursor-pointer rounded-full bg-white flex items-center justify-center shadow-lg hover:bg-primary hover:text-white transition-all duration-300 active:scale-90" 
                            onClick={onAdd}
                        >
                            <Plus className="w-5 h-5" strokeWidth={3} />
                        </div>
                    ) : (
                        <div className="flex items-center gap-3 p-1.5 rounded-[50px] bg-white shadow-xl animate-fade-in border border-gray-100">
                            <div 
                                onClick={onRemove} 
                                className="w-8 h-8 bg-[#ffeceb] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#ffdedb] transition-colors active:scale-90"
                            >
                                <Minus className="w-4 h-4 text-primary" strokeWidth={3} />
                            </div>
                            <p className="font-bold text-base w-4 text-center text-gray-800">{itemCount}</p>
                            <div 
                                onClick={onAdd} 
                                className="w-8 h-8 bg-[#ebffeb] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#dbffdb] transition-colors active:scale-90"
                            >
                                <Plus className="w-4 h-4 text-[#00d26a]" strokeWidth={3} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                    <p className="text-[20px] font-bold text-[#262626] line-clamp-1 leading-tight group-hover:text-primary transition-colors">{item.name}</p>
                    <div className="flex items-center bg-gray-50 px-1.5 py-0.5 rounded-md border border-gray-100">
                       <Star className="w-3.5 h-3.5 fill-[#ff4c24] text-[#ff4c24] mr-1" />
                       <span className="text-xs font-bold text-gray-700">{item.rating || '4.2'}</span>
                    </div>
                </div>
                <p className="text-[#676767] text-sm leading-relaxed mb-4 line-clamp-2 min-h-[40px]">
                    {item.description}
                </p>
                <p className="text-primary text-[24px] font-bold">₹{item.price}</p>
            </div>
        </div>
    );
};