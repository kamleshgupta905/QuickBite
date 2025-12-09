import React from 'react';
import { X } from 'lucide-react';
import { CartItem, MenuItem } from '../types';

interface CartProps {
  cart: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
  onExplore: () => void;
}

export const Cart: React.FC<CartProps> = ({ cart, onRemove, onCheckout, onExplore }) => {
  const itemTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = 0; // Free Delivery
  const total = itemTotal + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <button 
          onClick={onExplore}
          className="bg-primary text-white px-8 py-3 rounded-md mt-4 hover:bg-red-600 transition-colors"
        >
          Go to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="mt-[50px] md:px-[8vw] px-4 mb-[100px]">
      {/* Cart Items Table Header */}
      <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center text-gray-500 text-[max(1vw,12px)] mb-5">
        <p>Items</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <br />
      <hr className="h-[1px] bg-[#e2e2e7] border-none"/>

      {/* Cart Items List */}
      <div className="mt-2.5">
        {cart.map((item) => (
          <div key={item.id}>
            <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center text-[max(1vw,12px)] py-2.5 text-black my-2.5">
              <img src={item.image} alt={item.name} className="w-[50px]" />
              <p>{item.name}</p>
              <p>₹{item.price}</p>
              <p>{item.quantity}</p>
              <p>₹{item.price * item.quantity}</p>
              <p 
                onClick={() => onRemove(item.id)} 
                className="cursor-pointer text-black hover:text-primary"
              >
                <X className="w-4 h-4" />
              </p>
            </div>
            <hr className="h-[1px] bg-[#e2e2e7] border-none"/>
          </div>
        ))}
      </div>

      {/* Cart Bottom Section */}
      <div className="flex flex-col-reverse md:flex-row justify-between gap-[max(12vw,20px)] mt-20">
        
        {/* Cart Totals */}
        <div className="flex-1 flex flex-col gap-5 max-w-md">
           <h2 className="text-2xl font-bold">Cart Totals</h2>
           <div className="flex flex-col gap-5 text-[#555]">
              <div className="flex justify-between">
                 <p>Subtotal</p>
                 <p>₹{itemTotal.toFixed(2)}</p>
              </div>
              <hr className="h-[1px] bg-[#e2e2e7] border-none"/>
              <div className="flex justify-between text-green-600 font-medium">
                 <p>Delivery Fee</p>
                 <p>Free</p>
              </div>
              <hr className="h-[1px] bg-[#e2e2e7] border-none"/>
              <div className="flex justify-between font-bold text-black text-lg">
                 <p>Total</p>
                 <p>₹{total.toFixed(2)}</p>
              </div>
           </div>
           <button 
             onClick={onCheckout}
             className="bg-primary text-white py-3 rounded-md w-[max(15vw,200px)] cursor-pointer hover:bg-red-600 transition-colors mt-2"
           >
             PROCEED TO CHECKOUT
           </button>
        </div>
      </div>
    </div>
  );
};