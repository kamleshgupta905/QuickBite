import React from 'react';
import { Phone, MessageCircle, AlertCircle } from 'lucide-react';
import { Badge } from '../components/UI';
import { Order } from '../types';

const STATUS_STEPS = ['Placed', 'Preparing', 'Picked Up', 'On the Way', 'Delivered'];

interface OrderTrackingProps {
    order?: Order;
}

export const OrderTracking: React.FC<OrderTrackingProps> = ({ order }) => {
  
  if (!order) {
      return (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-4">
              <AlertCircle className="w-12 h-12 text-gray-300 mb-4" />
              <h2 className="text-xl font-bold text-gray-700">No Active Order</h2>
              <p className="text-gray-500 mt-2">Go to the menu to place an order!</p>
          </div>
      );
  }

  // Find index of current status
  const currentStep = STATUS_STEPS.indexOf(order.status);
  
  const getStatusMessage = (status: string) => {
      switch(status) {
          case 'Placed': return "Restaurant has received your order.";
          case 'Preparing': return "Your food is being prepared.";
          case 'Picked Up': return "Rider has picked up your order.";
          case 'On the Way': return "Your food is on the way!";
          case 'Delivered': return "Enjoy your meal!";
          default: return "Order status updated.";
      }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-3xl shadow-soft overflow-hidden mb-6">
         {/* Live Map Frame */}
         <div className="h-72 bg-gray-100 relative w-full overflow-hidden">
             {/* Use Google Maps Embed for a realistic live tracking feel. 
                 Using a fixed location (Bangalore) for demo, but in a real app this would use order coordinates. 
             */}
             <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                style={{ border: 0 }}
                src="https://maps.google.com/maps?q=Indiranagar,Bangalore&z=14&output=embed"
                allowFullScreen
                className="opacity-90 grayscale-[20%]"
             ></iframe>
             
             {/* Rider Pin Animation Overlay - Only show if active */}
             {order.status !== 'Delivered' && order.status !== 'Placed' && (
                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
                    <div className="relative">
                        <div className="w-24 h-24 bg-primary/20 rounded-full animate-ping absolute -top-10 -left-10"></div>
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-primary relative z-20">
                             <div className="w-3 h-3 bg-primary rounded-full"></div>
                        </div>
                        <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-black/70 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap">
                            Rider Location
                        </div>
                    </div>
                 </div>
             )}
         </div>

         <div className="p-6">
            <div className="flex justify-between items-start mb-8">
                <div>
                   <h2 className="text-xl font-bold mb-1">{order.status}</h2>
                   <p className="text-gray-500 text-sm">{getStatusMessage(order.status)}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                    <Badge>{order.id.split('_')[1] || 'Order'}</Badge>
                    <span className="text-xs text-gray-400">{order.date}</span>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="relative mb-8 px-2">
               {/* Background Line */}
               <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-100 rounded-full -z-10"></div>
               
               {/* Filled Line */}
               <div 
                 className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-green-500 rounded-full -z-10 transition-all duration-1000 ease-out"
                 style={{ width: `${(currentStep / (STATUS_STEPS.length - 1)) * 100}%` }}
               ></div>
               
               <div className="flex justify-between">
                   {STATUS_STEPS.map((step, index) => {
                      const isActive = index <= currentStep;
                      
                      return (
                          <div key={step} className="flex flex-col items-center">
                             <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center bg-white transition-all duration-500 z-10 ${isActive ? 'border-green-500 scale-110' : 'border-gray-200'}`}>
                                {isActive && <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />}
                             </div>
                             <span className={`text-[10px] mt-2 font-medium transition-colors ${isActive ? 'text-gray-800' : 'text-gray-400'}`}>{step}</span>
                          </div>
                      );
                   })}
               </div>
            </div>

            {/* Rider Info - Only show if assigned */}
            {(order.status === 'Picked Up' || order.status === 'On the Way') && (
                <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between animate-fade-in">
                <div className="flex items-center gap-4">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Rider" className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"/>
                    <div>
                        <h3 className="font-bold text-sm">Michael R.</h3>
                        <p className="text-xs text-gray-500">Delivery Partner • Yamaha FZ</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-primary hover:bg-gray-100">
                        <Phone className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-primary hover:bg-gray-100">
                        <MessageCircle className="w-5 h-5" />
                    </button>
                </div>
                </div>
            )}
            
            {order.status === 'Placed' && (
                 <div className="bg-blue-50 rounded-2xl p-4 text-center text-blue-700 text-sm font-medium">
                     Waiting for restaurant confirmation...
                 </div>
            )}
         </div>
      </div>
    </div>
  );
};