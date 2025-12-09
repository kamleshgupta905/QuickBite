import React from 'react';
import { Plus, Minus, Star, ShoppingBag } from 'lucide-react';
import { MenuItem, CartItem } from '../types';

interface CombosProps {
  items: MenuItem[];
  onRestaurantClick: (id: string) => void;
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: string) => void;
  onViewCart: () => void;
}

export const CombosScreen: React.FC<CombosProps> = ({ items, cart, addToCart, removeFromCart, onViewCart }) => {
  // Filter items for combos
  const comboItems = items.filter(item => item.category === 'Combos');
  
  const cartTotalQty = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="md:px-[8vw] px-4 py-8 min-h-screen">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Super Saver Combos</h1>
        <p className="text-gray-500">Delicious combinations at unbeatable prices!</p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-8 gap-y-12 animate-fade-in">
          {comboItems.map((item) => (
              <FoodItemCard 
                key={item.id} 
                item={item} 
                cartItem={cart.find(c => c.id === item.id)}
                onAdd={() => addToCart(item)}
                onRemove={() => removeFromCart(item.id)}
              />
          ))}
      </div>

      {comboItems.length === 0 && (
          <div className="text-center py-20 text-gray-400">
              <p>No combo offers available at the moment.</p>
          </div>
      )}

      {/* Cart Floating Button */}
      {cartTotalQty > 0 && (
           <div className="fixed bottom-20 md:bottom-8 left-4 right-4 md:left-auto md:right-8 md:w-96 z-40 animate-slide-up">
              <div 
                  onClick={onViewCart}
                  className="bg-primary text-white p-4 rounded-2xl shadow-xl shadow-red-500/30 flex items-center justify-between cursor-pointer hover:bg-red-600 transition-colors transform hover:scale-[1.02]"
              >
                  <div className="flex flex-col">
                      <span className="text-xs font-medium uppercase text-red-100">{cartTotalQty} ITEMS</span>
                      <span className="text-lg font-bold">₹{totalPrice.toFixed(0)} <span className="text-xs font-normal opacity-80">+ taxes</span></span>
                  </div>
                  <div className="flex items-center gap-2 font-bold bg-white/20 px-3 py-2 rounded-lg backdrop-blur-sm">
                      View Cart <ShoppingBag className="w-5 h-5" />
                  </div>
              </div>
           </div>
      )}
    </div>
  );
};

// Reusing FoodItemCard logic locally since it's small, or we could export it from Home.
const FoodItemCard: React.FC<{ 
    item: MenuItem; 
    cartItem?: CartItem;
    onAdd: () => void; 
    onRemove: () => void;
}> = ({ item, cartItem, onAdd, onRemove }) => {
    const itemCount = cartItem ? cartItem.quantity : 0;

    return (
        <div className="w-full m-auto rounded-[15px] shadow-card transition-all duration-300 animate-fade-in hover:shadow-xl bg-white flex flex-col h-full">
            <div className="relative">
                <img src={item.image} alt={item.name} className="w-full h-[200px] object-cover rounded-t-[15px]"/>
                <div className="absolute bottom-[15px] right-[15px]">
                    {!itemCount ? (
                        <div 
                            className="w-9 h-9 cursor-pointer rounded-full bg-white flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors" 
                            onClick={onAdd}
                        >
                            <Plus className="w-5 h-5 text-gray-800" strokeWidth={3} />
                        </div>
                    ) : (
                        <div className="flex items-center gap-3 p-1 rounded-[50px] bg-white shadow-md">
                            <div 
                                onClick={onRemove} 
                                className="w-7 h-7 bg-[#ffeceb] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#ffdedb]"
                            >
                                <Minus className="w-3.5 h-3.5 text-primary" strokeWidth={3} />
                            </div>
                            <p className="font-semibold text-sm w-4 text-center">{itemCount}</p>
                            <div 
                                onClick={onAdd} 
                                className="w-7 h-7 bg-[#ebffeb] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#dbffdb]"
                            >
                                <Plus className="w-3.5 h-3.5 text-[#00d26a]" strokeWidth={3} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-center mb-2.5">
                    <p className="text-[20px] font-semibold text-[#262626] line-clamp-1">{item.name}</p>
                    <div className="flex flex-shrink-0 ml-2">
                       {[...Array(5)].map((_, i) => (
                           <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(item.rating) ? 'fill-[#ff4c24] text-[#ff4c24]' : 'fill-gray-200 text-gray-200'}`} />
                       ))}
                    </div>
                </div>
                <p className="text-[#676767] text-xs leading-5 mb-2.5 line-clamp-2 min-h-[40px] flex-1">
                    {item.description}
                </p>
                <p className="text-primary text-[22px] font-semibold m-1.5">₹{item.price}</p>
            </div>
        </div>
    );
};