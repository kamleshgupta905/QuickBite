import React from 'react';
import { LogOut, MapPin, CreditCard, ShoppingBag, ChevronRight } from 'lucide-react';
import { CURRENT_USER } from '../data';
import { Button } from '../components/UI';
import { Order } from '../types';

interface ProfileProps {
  orders: Order[];
  onLogout: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ orders, onLogout }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="flex items-center gap-6 mb-8">
         <img src={CURRENT_USER.avatar} alt={CURRENT_USER.name} className="w-24 h-24 rounded-full border-4 border-white shadow-lg" />
         <div>
            <h1 className="text-3xl font-bold text-gray-900">{CURRENT_USER.name}</h1>
            <p className="text-gray-500">{CURRENT_USER.email}</p>
            <button className="text-primary text-sm font-bold mt-2 hover:underline">Edit Profile</button>
         </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
         {/* Sidebar Navigation */}
         <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
               <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">Account</h3>
               <ul className="space-y-1">
                  <li className="flex items-center justify-between p-3 rounded-xl bg-red-50 text-primary font-medium cursor-pointer">
                     <span className="flex items-center gap-3"><ShoppingBag className="w-5 h-5" /> Orders</span>
                     <ChevronRight className="w-4 h-4" />
                  </li>
                  <li className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 text-gray-600 cursor-pointer">
                     <span className="flex items-center gap-3"><MapPin className="w-5 h-5" /> Addresses</span>
                     <ChevronRight className="w-4 h-4" />
                  </li>
                  <li className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 text-gray-600 cursor-pointer">
                     <span className="flex items-center gap-3"><CreditCard className="w-5 h-5" /> Payments</span>
                     <ChevronRight className="w-4 h-4" />
                  </li>
               </ul>
            </div>
            <Button variant="outline" fullWidth onClick={onLogout} className="flex items-center gap-2 justify-center border-red-200 text-red-500 hover:bg-red-50 hover:border-red-200 hover:text-red-600">
               <LogOut className="w-4 h-4" /> Logout
            </Button>
         </div>

         {/* Main Content Area (Orders) */}
         <div className="md:col-span-2 space-y-6">
            <h2 className="text-xl font-bold mb-4">Past Orders</h2>
            {orders.length === 0 && (
                <div className="text-center py-10 bg-white rounded-3xl border border-gray-100">
                    <p className="text-gray-500">No orders placed yet.</p>
                </div>
            )}
            {orders.map(order => (
               <div key={order.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4 border-b border-gray-100 pb-4">
                     <div className="flex gap-4">
                        <img src={order.restaurantImage} className="w-16 h-16 rounded-xl object-cover" alt="Rest" />
                        <div>
                           <h3 className="font-bold text-lg text-gray-900">{order.restaurantName}</h3>
                           <p className="text-xs text-gray-500">{order.date}</p>
                           <p className={`text-xs font-bold mt-1 uppercase px-2 py-0.5 rounded inline-block ${
                               order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                               order.status === 'Placed' ? 'bg-blue-100 text-blue-700' : 
                               'bg-orange-100 text-orange-700'
                           }`}>
                               {order.status}
                           </p>
                        </div>
                     </div>
                     <span className="text-lg font-bold text-gray-700">₹{order.total.toFixed(2)}</span>
                  </div>
                  <div className="space-y-2 mb-4">
                      {order.items.map(item => (
                         <div key={item.id} className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="text-gray-400">{item.quantity}x</span>
                            <span>{item.name}</span>
                         </div>
                      ))}
                      {order.items.length === 0 && <span className="text-sm text-gray-400 italic">2 Items (Whopper Jr...)</span>}
                  </div>
                  <div className="flex gap-3">
                     <Button variant="outline" className="text-sm py-2 px-4 h-auto">Rate Order</Button>
                     <Button className="text-sm py-2 px-4 h-auto">Reorder</Button>
                  </div>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
};