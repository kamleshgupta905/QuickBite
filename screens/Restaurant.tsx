import React, { useState, useEffect } from 'react';
import { Star, Clock, Search, Heart, Share2, Plus, Minus, ShoppingBag, Flame } from 'lucide-react';
import { Restaurant, CartItem, MenuItem } from '../types';

interface RestaurantProps {
  restaurant: Restaurant;
  items: MenuItem[]; // New Prop
  cart: CartItem[];
  onAddToCart: (item: MenuItem) => void;
  onRemoveFromCart: (id: string) => void;
  onViewCart: () => void;
}

export const RestaurantDetail: React.FC<RestaurantProps> = ({ restaurant, items, cart, onAddToCart, onRemoveFromCart, onViewCart }) => {
  const [activeTab, setActiveTab] = useState<'Menu' | 'Reviews'>('Menu');
  const [vegOnly, setVegOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('');

  const cartTotalQty = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Filter items (Use 'items' prop instead of restaurant.menu)
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVeg = vegOnly ? item.isVeg : true;
    return matchesSearch && matchesVeg;
  });

  // Group by category
  const groupedMenu: Record<string, MenuItem[]> = {};
  filteredItems.forEach(item => {
    if (!groupedMenu[item.category]) {
        groupedMenu[item.category] = [];
    }
    groupedMenu[item.category].push(item);
  });
  
  const categories = Object.keys(groupedMenu);

  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
        setActiveCategory(categories[0]);
    }
  }, [categories, activeCategory]);

  const scrollToCategory = (cat: string) => {
    setActiveCategory(cat);
    const element = document.getElementById(`category-${cat}`);
    if (element) {
        const offset = 190;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
  };

  const getItemQty = (id: string) => cart.find(i => i.id === id)?.quantity || 0;

  return (
    <div className="bg-gray-50 min-h-screen pb-20 animate-fade-in">
      {/* Hero Header */}
      <div className="relative h-[300px] md:h-[400px] w-full">
        <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end md:items-center">
             <div className="animate-fade-in">
                <h1 className="text-4xl md:text-6xl font-bold mb-2 tracking-tight drop-shadow-md">{restaurant.name}</h1>
                <p className="text-gray-200 text-lg mb-4 opacity-90">{restaurant.cuisine.join(' • ')}</p>
                <div className="flex items-center gap-4 text-sm font-semibold">
                    <div className="flex items-center gap-1 bg-green-600 px-3 py-1.5 rounded-lg text-white shadow-lg shadow-green-900/20">
                        <Star className="w-4 h-4 fill-current" /> <span className="text-base">{restaurant.rating}</span>
                    </div>
                    <span className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                        <Clock className="w-4 h-4" /> {restaurant.deliveryTime}
                    </span>
                    <span className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                        {restaurant.priceForTwo} for two
                    </span>
                </div>
             </div>
             <div className="flex gap-4 mt-6 md:mt-0">
                <button className="p-3.5 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all active:scale-95 border border-white/20">
                    <Heart className="w-6 h-6 text-white" />
                </button>
                <button className="p-3.5 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all active:scale-95 border border-white/20">
                    <Share2 className="w-6 h-6 text-white" />
                </button>
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-8 relative z-10">
        
        {/* Sticky Filters & Nav */}
        <div className="sticky top-[80px] z-30 bg-white/90 backdrop-blur-md rounded-2xl shadow-soft border border-gray-100 p-4 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-8 w-full md:w-auto overflow-x-auto no-scrollbar">
                     <button 
                        className={`text-lg font-bold pb-1 border-b-2 transition-all whitespace-nowrap ${activeTab === 'Menu' ? 'text-primary border-primary' : 'text-gray-500 border-transparent hover:text-gray-800'}`}
                        onClick={() => setActiveTab('Menu')}
                     >
                         Full Menu
                     </button>
                     <button 
                        className={`text-lg font-bold pb-1 border-b-2 transition-all whitespace-nowrap ${activeTab === 'Reviews' ? 'text-primary border-primary' : 'text-gray-500 border-transparent hover:text-gray-800'}`}
                        onClick={() => setActiveTab('Reviews')}
                     >
                         Reviews
                     </button>
                </div>
                
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                         <input 
                            type="text" 
                            placeholder="Search dishes..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-colors"
                         />
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 bg-gray-100 px-3 py-2 rounded-xl">
                        <span className={`text-xs font-bold uppercase ${vegOnly ? 'text-green-600' : 'text-gray-500'}`}>Veg Only</span>
                        <button 
                            onClick={() => setVegOnly(!vegOnly)}
                            className={`w-10 h-5 rounded-full p-0.5 transition-colors duration-300 ${vegOnly ? 'bg-green-500' : 'bg-gray-300'}`}
                        >
                            <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${vegOnly ? 'translate-x-5' : 'translate-x-0'}`} />
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Categories Sidebar */}
            {activeTab === 'Menu' && (
                <div className="hidden lg:block w-72 sticky top-52">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 max-h-[calc(100vh-250px)] overflow-y-auto no-scrollbar">
                        <h3 className="font-bold text-gray-400 uppercase text-xs tracking-wider mb-4 ml-2">Categories</h3>
                        <div className="flex flex-col gap-1">
                            {categories.map(cat => (
                                <button 
                                    key={cat}
                                    onClick={() => scrollToCategory(cat)}
                                    className={`text-left py-3 px-4 rounded-xl text-sm font-semibold transition-all flex justify-between items-center ${activeCategory === cat ? 'bg-primary text-white shadow-md shadow-red-200' : 'text-gray-600 hover:bg-gray-50'}`}
                                >
                                    {cat}
                                    <span className={`text-xs ${activeCategory === cat ? 'text-white/80' : 'text-gray-400'}`}>{groupedMenu[cat].length}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Menu Items List */}
            <div className="flex-1 w-full min-h-[50vh]">
                {activeTab === 'Menu' && categories.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                        <div className="text-6xl mb-4">🍽️</div>
                        <h3 className="text-xl font-bold text-gray-700">No items found</h3>
                        <p className="text-gray-400 mt-2">Try changing your filters.</p>
                    </div>
                )}

                {activeTab === 'Menu' && categories.map(cat => (
                    <div key={cat} id={`category-${cat}`} className="mb-8 scroll-mt-48">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                             {cat} <span className="h-px bg-gray-200 flex-1"></span>
                        </h3>
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                            {groupedMenu[cat].map(item => {
                                const qty = getItemQty(item.id);
                                const isBestseller = item.rating >= 4.7;

                                return (
                                    <div key={item.id} className="group bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex gap-4 overflow-hidden relative">
                                        
                                        {/* Bestseller Badge */}
                                        {isBestseller && (
                                            <div className="absolute top-0 left-0 bg-yellow-400 text-[10px] font-bold px-2 py-1 rounded-br-lg z-10 text-yellow-900 shadow-sm flex items-center gap-1">
                                                <Flame className="w-3 h-3 fill-current" /> BESTSELLER
                                            </div>
                                        )}

                                        <div className="flex-1 flex flex-col justify-between z-10">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1.5">
                                                    {item.isVeg ? (
                                                        <div className="w-4 h-4 border border-green-600 flex items-center justify-center p-[2px] rounded-[2px]"><div className="w-full h-full bg-green-600 rounded-full"></div></div>
                                                    ) : (
                                                        <div className="w-4 h-4 border border-red-600 flex items-center justify-center p-[2px] rounded-[2px]"><div className="w-full h-full bg-red-600 rounded-full"></div></div>
                                                    )}
                                                    {item.rating > 0 && (
                                                        <div className="flex items-center gap-0.5 bg-yellow-50 px-1.5 rounded text-[11px] font-bold text-yellow-700 border border-yellow-100">
                                                            <Star className="w-2.5 h-2.5 fill-current" /> {item.rating}
                                                        </div>
                                                    )}
                                                </div>
                                                <h4 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-primary transition-colors leading-tight">{item.name}</h4>
                                                <p className="text-base font-bold text-gray-800 mb-2">₹{item.price}</p>
                                                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{item.description}</p>
                                            </div>
                                        </div>

                                        <div className="relative w-32 h-32 flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-xl shadow-sm group-hover:scale-105 transition-transform duration-500" />
                                            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 shadow-lg bg-white rounded-lg overflow-hidden flex items-center w-24 border border-gray-100 h-9 z-20">
                                                {qty === 0 ? (
                                                    <button 
                                                        onClick={() => onAddToCart(item)}
                                                        className="w-full h-full text-primary text-sm font-bold uppercase hover:bg-red-50 transition-colors"
                                                    >
                                                        ADD
                                                    </button>
                                                ) : (
                                                    <div className="flex items-center justify-between w-full h-full bg-white">
                                                        <button onClick={() => onRemoveFromCart(item.id)} className="w-8 h-full flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-primary transition-colors"><Minus className="w-3 h-3" /></button>
                                                        <span className="text-sm font-bold text-primary">{qty}</span>
                                                        <button onClick={() => onAddToCart(item)} className="w-8 h-full flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-primary transition-colors"><Plus className="w-3 h-3" /></button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
                
                {activeTab === 'Reviews' && (
                     <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
                        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-500">
                            <Star className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">Customer Reviews</h3>
                        <p className="text-gray-500">Reviews functionality coming soon!</p>
                     </div>
                )}
            </div>
        </div>

        {/* Floating Cart Bar */}
        {cartTotalQty > 0 && (
             <div className="fixed bottom-8 left-4 right-4 md:left-auto md:right-8 md:w-[400px] z-50 animate-slide-up">
                <div 
                    onClick={onViewCart}
                    className="bg-primary text-white p-4 rounded-2xl shadow-2xl shadow-primary/40 flex items-center justify-between cursor-pointer hover:bg-red-600 transition-colors transform hover:translate-y-[-2px] border border-white/20"
                >
                    <div className="flex flex-col pl-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-red-100 mb-0.5">{cartTotalQty} ITEMS ADDED</span>
                        <span className="text-xl font-bold">₹{totalPrice.toFixed(0)} <span className="text-xs font-normal opacity-80">+ taxes</span></span>
                    </div>
                    <div className="flex items-center gap-2 font-bold bg-white text-primary px-5 py-3 rounded-xl shadow-md">
                        View Cart <ShoppingBag className="w-5 h-5" />
                    </div>
                </div>
             </div>
        )}
      </div>
    </div>
  );
};