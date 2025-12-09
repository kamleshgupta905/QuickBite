import React, { useState } from 'react';
import { 
  Plus, List, Box, Upload, Trash2, Package, CheckCircle, Clock, Truck 
} from 'lucide-react';
import { Order, MenuItem } from '../types';
import { CATEGORIES } from '../data';

interface AdminProps {
  orders: Order[];
  menuItems: MenuItem[];
  onUpdateStatus: (orderId: string, newStatus: Order['status']) => void;
  onAddmnItem: (item: MenuItem) => void;
  onRemoveItem: (id: string) => void;
}

type AdminTab = 'add' | 'list' | 'orders';

export const AdminDashboard: React.FC<AdminProps> = ({ orders, menuItems, onUpdateStatus, onAddmnItem, onRemoveItem }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('add');

  return (
    <div className="flex min-h-[calc(100vh-80px)] bg-[#fcfcfc]">
       {/* --- SIDEBAR --- */}
       <div className="w-[18%] min-w-[200px] border-r border-[#a9a9a9]/20 bg-white py-8 flex flex-col gap-4">
          <button 
             onClick={() => setActiveTab('add')}
             className={`flex items-center gap-3 px-6 py-3 cursor-pointer transition-all ${activeTab === 'add' ? 'bg-[#fff0ed] border-r-4 border-primary' : 'hover:bg-gray-50'}`}
          >
             <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center bg-white shadow-sm">
                <Plus className="w-5 h-5 text-gray-600" />
             </div>
             <p className={`font-medium ${activeTab === 'add' ? 'text-primary' : 'text-gray-600'}`}>Add Items</p>
          </button>

          <button 
             onClick={() => setActiveTab('list')}
             className={`flex items-center gap-3 px-6 py-3 cursor-pointer transition-all ${activeTab === 'list' ? 'bg-[#fff0ed] border-r-4 border-primary' : 'hover:bg-gray-50'}`}
          >
             <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center bg-white shadow-sm">
                <List className="w-5 h-5 text-gray-600" />
             </div>
             <p className={`font-medium ${activeTab === 'list' ? 'text-primary' : 'text-gray-600'}`}>List Items</p>
          </button>

          <button 
             onClick={() => setActiveTab('orders')}
             className={`flex items-center gap-3 px-6 py-3 cursor-pointer transition-all ${activeTab === 'orders' ? 'bg-[#fff0ed] border-r-4 border-primary' : 'hover:bg-gray-50'}`}
          >
             <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center bg-white shadow-sm">
                <Box className="w-5 h-5 text-gray-600" />
             </div>
             <p className={`font-medium ${activeTab === 'orders' ? 'text-primary' : 'text-gray-600'}`}>Orders</p>
          </button>
       </div>

       {/* --- MAIN CONTENT --- */}
       <div className="flex-1 bg-[#fcfcfc] p-8 md:p-12 overflow-y-auto h-[calc(100vh-80px)]">
           {activeTab === 'add' && <AddItemsScreen onAdd={onAddmnItem} />}
           {activeTab === 'list' && <ListItemsScreen items={menuItems} onRemove={onRemoveItem} />}
           {activeTab === 'orders' && <OrdersScreen orders={orders} onUpdateStatus={onUpdateStatus} />}
       </div>
    </div>
  );
};

// --- SUB COMPONENTS ---

const AddItemsScreen: React.FC<{ onAdd: (item: MenuItem) => void }> = ({ onAdd }) => {
    const [image, setImage] = useState<File | null>(null);
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [category, setCategory] = useState('Pizza');
    const [price, setPrice] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Create Mock URL for image if file selected, else placeholder
        const imageUrl = image 
            ? URL.createObjectURL(image) 
            : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';

        const newItem: MenuItem = {
            id: `new_${Date.now()}`,
            name,
            description: desc,
            price: Number(price),
            image: imageUrl,
            category,
            isVeg: true, // Default
            rating: 0,
            votes: 0
        };

        onAdd(newItem);
        alert('Item Added Successfully!');
        
        // Reset
        setImage(null);
        setName('');
        setDesc('');
        setPrice('');
    };

    return (
        <div className="max-w-[70%] animate-fade-in text-[#6d6d6d]">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <p>Upload Image</p>
                    <label htmlFor="image" className="cursor-pointer w-[120px]">
                        {image ? (
                             <img src={URL.createObjectURL(image)} alt="Preview" className="w-[120px] h-[80px] object-cover rounded-lg border border-gray-300"/>
                        ) : (
                            <div className="w-[120px] h-[80px] bg-[#e2e2e7] rounded-lg flex items-center justify-center border-2 border-dashed border-gray-400 hover:bg-gray-200 transition-colors">
                                <Upload className="w-6 h-6 text-gray-500" />
                            </div>
                        )}
                    </label>
                    <input type="file" id="image" hidden onChange={(e) => e.target.files && setImage(e.target.files[0])} />
                </div>

                <div className="flex flex-col gap-2 w-[max(40%,280px)]">
                    <p>Product name</p>
                    <input 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="p-2.5 border border-[#a9a9a9] rounded outline-primary" 
                        type="text" 
                        placeholder="Type here"
                    />
                </div>

                <div className="flex flex-col gap-2 w-[max(40%,280px)]">
                    <p>Product description</p>
                    <textarea 
                        required
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        className="p-2.5 border border-[#a9a9a9] rounded outline-primary resize-none" 
                        rows={6} 
                        placeholder="Write content here"
                    ></textarea>
                </div>

                <div className="flex gap-8">
                    <div className="flex flex-col gap-2">
                        <p>Product category</p>
                        <select 
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="p-2.5 border border-[#a9a9a9] rounded outline-primary min-w-[120px]"
                        >
                            {CATEGORIES.map(cat => (
                                <option key={cat.id} value={cat.name}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p>Product price</p>
                        <input 
                            required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="p-2.5 border border-[#a9a9a9] rounded outline-primary w-[120px]" 
                            type="number" 
                            placeholder="20"
                        />
                    </div>
                </div>

                <button type="submit" className="max-w-[120px] border-none p-2.5 bg-black text-white cursor-pointer hover:bg-[#333] transition-colors font-medium rounded mt-2">
                    ADD
                </button>
            </form>
        </div>
    );
};

const ListItemsScreen: React.FC<{ items: MenuItem[], onRemove: (id: string) => void }> = ({ items, onRemove }) => {
    return (
        <div className="animate-fade-in">
            <h2 className="text-xl font-bold text-gray-700 mb-6">All Foods List</h2>
            <div className="bg-white rounded border border-gray-200 text-sm">
                <div className="grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] items-center bg-[#f9f9f9] py-3 px-4 border-b border-gray-200 font-bold text-gray-600">
                    <p>Image</p>
                    <p>Name</p>
                    <p>Category</p>
                    <p>Price</p>
                    <p className="text-center">Action</p>
                </div>
                {items.map((item) => (
                    <div key={item.id} className="grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] items-center py-3 px-4 border-b border-gray-200 last:border-0 hover:bg-[#fff4f2] transition-colors">
                        <img src={item.image} alt="" className="w-12 h-12 object-cover rounded" />
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <p className="text-gray-500">{item.category}</p>
                        <p className="text-gray-700">₹{item.price}</p>
                        <p 
                            onClick={() => onRemove(item.id)}
                            className="cursor-pointer text-red-500 hover:text-red-700 text-center flex justify-center"
                        >
                            <Trash2 className="w-4 h-4" />
                        </p>
                    </div>
                ))}
                {items.length === 0 && (
                    <div className="p-8 text-center text-gray-400">
                        No items found.
                    </div>
                )}
            </div>
        </div>
    );
};

const OrdersScreen: React.FC<{ orders: Order[], onUpdateStatus: (id: string, status: Order['status']) => void }> = ({ orders, onUpdateStatus }) => {
    return (
        <div className="animate-fade-in">
            <h2 className="text-xl font-bold text-gray-700 mb-6">Order Page</h2>
            <div className="flex flex-col gap-6">
                {orders.map((order) => (
                    <div key={order.id} className="grid md:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] items-start gap-4 p-5 bg-white border border-primary/20 text-sm text-[#555] shadow-sm rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex justify-center pt-2">
                             <Package className="w-10 h-10 text-primary" />
                        </div>
                        <div>
                            <p className="font-bold text-black mb-1">
                                {order.items.map((item, idx) => {
                                    if (idx === order.items.length - 1) {
                                        return item.name + " x " + item.quantity;
                                    } else {
                                        return item.name + " x " + item.quantity + ", ";
                                    }
                                })}
                            </p>
                            <p className="font-semibold mb-2 text-black">Rahul Sharma</p>
                            <div className="text-xs mb-2">
                                <p>123, Green Park</p>
                                <p>Indiranagar, Bangalore</p>
                                <p>9315515700</p>
                            </div>
                        </div>
                        <p className="font-medium">Items: {order.items.length}</p>
                        <p className="font-bold text-black">₹{order.total}</p>
                        <select 
                            onChange={(e) => onUpdateStatus(order.id, e.target.value as any)}
                            value={order.status}
                            className="bg-[#ffe8e4] border border-primary p-2.5 rounded outline-none text-[13px] font-medium"
                        >
                            <option value="Placed">Placed</option>
                            <option value="Preparing">Preparing</option>
                            <option value="Picked Up">Picked Up</option>
                            <option value="On the Way">On the Way</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                ))}
                {orders.length === 0 && (
                    <p className="text-center text-gray-400 py-10">No orders yet.</p>
                )}
            </div>
        </div>
    );
};