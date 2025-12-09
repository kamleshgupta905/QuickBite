import React, { useState } from 'react';
import { Search, SlidersHorizontal, Star } from 'lucide-react';
import { MenuItem } from '../types';

interface SearchProps {
  items: MenuItem[];
  onRestaurantClick: (id: string) => void;
}

export const SearchScreen: React.FC<SearchProps> = ({ items, onRestaurantClick }) => {
  const [query, setQuery] = useState('');
  
  // Search through passed items
  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase()) || 
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 min-h-screen">
       <div className="sticky top-[70px] bg-gray-50 z-20 pb-4">
           <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                 autoFocus
                 value={query}
                 onChange={(e) => setQuery(e.target.value)}
                 className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                 placeholder="Search for dishes (e.g., Pizza, Paneer)..."
              />
           </div>
           
           <div className="flex gap-3 mt-4 overflow-x-auto no-scrollbar pb-2">
               <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 whitespace-nowrap hover:border-primary hover:text-primary transition-colors">
                  <SlidersHorizontal className="w-4 h-4" /> Filters
               </button>
               <button className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 whitespace-nowrap hover:border-primary hover:text-primary transition-colors">
                  Rating 4.0+
               </button>
               <button className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 whitespace-nowrap hover:border-primary hover:text-primary transition-colors">
                  Pure Veg
               </button>
               <button className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 whitespace-nowrap hover:border-primary hover:text-primary transition-colors">
                  Fast Delivery
               </button>
           </div>
       </div>

       <div className="mt-4">
          <h2 className="font-bold text-gray-500 text-sm uppercase tracking-wide mb-4">
             {query ? `Search Results (${filteredItems.length})` : 'Popular Dishes'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {filteredItems.slice(0, 20).map(item => (
                <div 
                  key={item.id}
                  className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 cursor-pointer hover:shadow-md transition-shadow"
                >
                   <img src={item.image} alt={item.name} className="w-24 h-24 rounded-xl object-cover flex-shrink-0" />
                   <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg mb-1">{item.name}</h3>
                      <div className="flex items-center gap-2 mb-2">
                         <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-xs font-bold flex items-center gap-0.5">
                            <Star className="w-3 h-3 fill-current" /> {item.rating || 4.2}
                         </span>
                         <span className="text-gray-400 text-xs">•</span>
                         <span className="text-sm text-gray-500">30 min</span>
                         <span className="text-gray-400 text-xs">•</span>
                         <span className="text-sm font-bold text-primary">₹{item.price}</span>
                      </div>
                      <p className="text-sm text-gray-400 line-clamp-1">{item.category}</p>
                   </div>
                </div>
             ))}
             {filteredItems.length === 0 && (
                 <p className="text-gray-400">No items found.</p>
             )}
          </div>
       </div>
    </div>
  );
};