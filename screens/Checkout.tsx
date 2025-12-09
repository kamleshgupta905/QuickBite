import React, { useState } from 'react';
import { ArrowLeft, MapPin, Wallet, Banknote, Plus, Locate, Home, Briefcase, QrCode, Copy, User, Phone, Navigation } from 'lucide-react';
import { CartItem, Address, Order } from '../types';
import { CURRENT_USER } from '../data';
import { Button, Modal, Input } from '../components/UI';

interface CheckoutProps {
  cart: CartItem[];
  onPlaceOrder: (order: Order) => void;
  onBack: () => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ cart, onPlaceOrder, onBack }) => {
  // Contact Details State
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const [addresses, setAddresses] = useState<Address[]>(CURRENT_USER.addresses);
  const [selectedAddress, setSelectedAddress] = useState(CURRENT_USER.addresses[0]?.id);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Add Address State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newAddressText, setNewAddressText] = useState('');
  const [newAddressType, setNewAddressType] = useState<'Home' | 'Work' | 'Other'>('Home');
  const [isLocating, setIsLocating] = useState(false);
  const [detectedLocation, setDetectedLocation] = useState<{lat: number, lng: number} | null>(null);

  const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0); // Free delivery

  const handlePay = () => {
    if (!contactName.trim() || !contactPhone.trim()) {
        alert("Please fill in your Name and Phone Number.");
        return;
    }

    if (!selectedAddress) {
        alert("Please add and select a delivery address.");
        return;
    }

    setIsProcessing(true);
    
    // Get selected address text
    const addrText = addresses.find(a => a.id === selectedAddress)?.text || 'No Address Selected';

    // Construct Order Details for Email
    const orderItemsList = cart.map(i => `- ${i.name} x ${i.quantity} (₹${i.price * i.quantity})`).join('%0D%0A');
    const emailBody = `Hello,%0D%0A%0D%0AI would like to place an order.%0D%0A%0D%0A**Customer Details:**%0D%0AName: ${contactName}%0D%0APhone: ${contactPhone}%0D%0AAddress: ${addrText}%0D%0A%0D%0A**Order Summary:**%0D%0A${orderItemsList}%0D%0A%0D%0ATotal Amount: ₹${totalAmount}%0D%0APayment Method: ${paymentMethod.toUpperCase()}%0D%0A%0D%0AThank you!`;

    // Open Mail Client
    window.location.href = `mailto:kamleshg9569@gmail.com?subject=New Order Request - ${contactName}&body=${emailBody}`;

    // Create internal order object
    const newOrder: Order = {
        id: `ord_${Date.now()}`,
        status: 'Placed',
        total: totalAmount,
        items: [...cart],
        date: new Date().toLocaleString(),
        restaurantName: 'QuickBite Kitchen',
        restaurantImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    };

    setTimeout(() => {
        setIsProcessing(false);
        onPlaceOrder(newOrder);
    }, 2000);
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
    }
    setIsLocating(true);
    setDetectedLocation(null);
    
    const success = async (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;
        setDetectedLocation({ lat: latitude, lng: longitude });

        try {
            // Using OpenStreetMap Nominatim API for reverse geocoding
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`);
            const data = await response.json();
            
            if (data && data.display_name) {
                const addr = data.address;
                const parts = [];
                if (addr.road) parts.push(addr.road);
                if (addr.suburb) parts.push(addr.suburb);
                if (addr.neighbourhood) parts.push(addr.neighbourhood);
                if (addr.city || addr.town || addr.village) parts.push(addr.city || addr.town || addr.village);
                if (addr.state) parts.push(addr.state);
                if (addr.postcode) parts.push(addr.postcode);
                
                const formattedAddress = parts.length > 0 ? parts.join(', ') : data.display_name;
                setNewAddressText(formattedAddress);
            } else {
                 setNewAddressText(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
            }
        } catch (error) {
             console.error("Geocoding failed", error);
             setNewAddressText(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
        } finally {
            setIsLocating(false);
        }
    };

    const error = (err: GeolocationPositionError) => {
        console.warn("Geolocation error:", err.message);
        alert("Unable to retrieve your location. Please ensure GPS is enabled.");
        setIsLocating(false);
    };

    navigator.geolocation.getCurrentPosition(success, error, { 
        enableHighAccuracy: true, 
        timeout: 10000, 
        maximumAge: 0 
    });
  };

  const handleSaveAddress = () => {
      if (!newAddressText.trim()) return;
      const newAddr: Address = {
          id: `new_${Date.now()}`,
          type: newAddressType,
          text: newAddressText
      };
      setAddresses([...addresses, newAddr]);
      setSelectedAddress(newAddr.id);
      setIsAddModalOpen(false);
      setNewAddressText('');
      setNewAddressType('Home');
      setDetectedLocation(null);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-fade-in">
       {/* Back Button */}
       <button onClick={onBack} className="flex items-center text-gray-500 hover:text-primary mb-6 transition-colors font-medium">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Cart
       </button>
       
       <h1 className="text-3xl font-bold mb-8 text-gray-900">Checkout</h1>

       <div className="space-y-6 mb-24">
          
          {/* Contact Details Section */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
             <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-800">
                 <User className="w-6 h-6 text-primary" /> Contact Details
             </h2>
             <div className="grid md:grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input 
                            placeholder="Enter your name"
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input 
                            type="tel"
                            placeholder="Enter phone number"
                            value={contactPhone}
                            onChange={(e) => setContactPhone(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                 </div>
             </div>
          </div>

          {/* Address Section */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800">
                    <MapPin className="w-6 h-6 text-primary" /> Delivery Address
                </h2>
                <button 
                    onClick={() => setIsAddModalOpen(true)}
                    className="text-primary text-sm font-bold hover:underline flex items-center gap-1"
                >
                    <Plus className="w-4 h-4" /> Add New
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                 {addresses.length === 0 && (
                     <p className="text-gray-400 text-sm col-span-2 text-center py-4">No addresses saved. Please add a new address.</p>
                 )}
                 {addresses.map(addr => (
                    <div 
                        key={addr.id}
                        onClick={() => setSelectedAddress(addr.id)}
                        className={`relative p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${selectedAddress === addr.id ? 'border-primary bg-red-50/50 shadow-sm' : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'}`}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                {addr.type === 'Home' && <Home className="w-4 h-4 text-gray-500" />}
                                {addr.type === 'Work' && <Briefcase className="w-4 h-4 text-gray-500" />}
                                {addr.type === 'Other' && <MapPin className="w-4 h-4 text-gray-500" />}
                                <span className="font-bold text-gray-800">{addr.type}</span>
                            </div>
                            {selectedAddress === addr.id && (
                                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                                    <div className="w-2 h-2 bg-white rounded-full" />
                                </div>
                            )}
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed">{addr.text}</p>
                    </div>
                 ))}
                 
                 <button 
                    onClick={() => setIsAddModalOpen(true)}
                    className="p-5 rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:border-primary hover:text-primary hover:bg-red-50/30 transition-all gap-2 min-h-[120px]"
                 >
                    <Plus className="w-6 h-6" />
                    <span className="font-medium">Add New Address</span>
                 </button>
              </div>
          </div>

          {/* Payment Section */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-800">
                 <Wallet className="w-6 h-6 text-primary" /> Payment Method
              </h2>
              <div className="space-y-3">
                 {[
                    { id: 'upi', label: 'UPI Payment', icon: QrCode, desc: 'Scan QR or Pay to VPA' },
                    { id: 'cod', label: 'Cash on Delivery', icon: Banknote, desc: 'Pay cash at your doorstep' },
                 ].map(method => (
                     <div 
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`flex items-center p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${paymentMethod === method.id ? 'bg-red-50/50 border-primary shadow-sm' : 'border-gray-100 hover:border-gray-200'}`}
                     >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${paymentMethod === method.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                            <method.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <span className="font-bold text-gray-900 block">{method.label}</span>
                            <span className="text-xs text-gray-500">{method.desc}</span>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === method.id ? 'border-primary' : 'border-gray-300'}`}>
                            {paymentMethod === method.id && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                        </div>
                     </div>
                 ))}
              </div>

              {/* Specific UPI UI */}
              {paymentMethod === 'upi' && (
                  <div className="mt-6 p-6 bg-gray-50 rounded-2xl border border-gray-200 text-center animate-fade-in">
                      <p className="text-sm font-medium text-gray-500 mb-4">Scan QR or use UPI ID to pay <span className="text-black font-bold">₹{totalAmount.toFixed(2)}</span></p>
                      
                      {/* Fake QR Code */}
                      <div className="w-40 h-40 bg-white mx-auto p-2 rounded-xl border border-gray-200 mb-4 shadow-sm flex items-center justify-center">
                          <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=9315515700-2@ibl&pn=QuickBite&am=1&cu=INR" alt="QR Code" className="w-full h-full opacity-90" />
                      </div>

                      <div className="bg-white px-4 py-3 rounded-xl border border-dashed border-primary/50 inline-flex items-center gap-3">
                          <span className="text-gray-500 text-sm">UPI ID:</span>
                          <span className="font-bold text-gray-800 font-mono text-lg">9315515700-2@ibl</span>
                          <button className="text-primary hover:text-red-700" onClick={() => navigator.clipboard.writeText('9315515700-2@ibl')}>
                              <Copy className="w-4 h-4" />
                          </button>
                      </div>
                      <p className="text-xs text-gray-400 mt-4">Please keep the payment app open until confirmation.</p>
                  </div>
              )}
          </div>
       </div>

       {/* Pay Button Bar */}
       <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-100 md:relative md:bg-transparent md:border-0 md:p-0 md:mt-8 z-10">
           <div className="max-w-3xl mx-auto">
               <Button 
                fullWidth 
                onClick={handlePay} 
                isLoading={isProcessing}
                className="text-lg py-4 shadow-xl shadow-red-500/20"
               >
                   {paymentMethod === 'cod' ? `Place Order • ₹${totalAmount.toFixed(2)}` : `I have Paid • ₹${totalAmount.toFixed(2)}`}
               </Button>
           </div>
       </div>

       {/* Add Address Modal */}
       <Modal 
         isOpen={isAddModalOpen} 
         onClose={() => setIsAddModalOpen(false)} 
         title="Add New Address"
       >
          <div className="flex flex-col gap-4">
              <button 
                onClick={handleDetectLocation}
                disabled={isLocating}
                className="group relative flex items-center justify-center gap-3 w-full py-4 rounded-xl border border-primary/30 bg-red-50/30 text-primary font-bold hover:bg-red-50 hover:border-primary hover:shadow-md transition-all disabled:opacity-50 overflow-hidden"
              >
                  {isLocating ? (
                      <>
                        <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></span>
                        <span>Fetching Address...</span>
                      </>
                  ) : (
                      <>
                        <div className="bg-white p-1.5 rounded-full shadow-sm group-hover:scale-110 transition-transform">
                            <Locate className="w-5 h-5 text-primary" />
                        </div>
                        <span>Use Current Location</span>
                        <div className="absolute inset-0 bg-primary/5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                      </>
                  )}
              </button>

              {/* Show Map Preview if location detected */}
              {detectedLocation && (
                  <div className="rounded-xl overflow-hidden shadow-sm border border-gray-200 mt-1">
                      <iframe 
                          width="100%" 
                          height="180" 
                          frameBorder="0" 
                          style={{ border: 0 }}
                          src={`https://maps.google.com/maps?q=${detectedLocation.lat},${detectedLocation.lng}&z=15&output=embed`}
                          allowFullScreen
                      ></iframe>
                      <div className="bg-gray-50 px-3 py-1 text-xs text-gray-500 text-center border-t border-gray-100">
                          Precise Location detected
                      </div>
                  </div>
              )}
              
              <div className="flex items-center gap-2 my-1">
                  <div className="h-px bg-gray-200 flex-1"></div>
                  <span className="text-xs text-gray-400 font-medium uppercase">Or enter manually</span>
                  <div className="h-px bg-gray-200 flex-1"></div>
              </div>

              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address Details</label>
                  <textarea 
                    value={newAddressText}
                    onChange={(e) => setNewAddressText(e.target.value)}
                    placeholder="House / Flat / Block No., Landmark"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all placeholder:text-gray-400 min-h-[100px] resize-none"
                  />
              </div>

              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Save as</label>
                  <div className="flex gap-3">
                      {(['Home', 'Work', 'Other'] as const).map(type => (
                          <button
                            key={type}
                            onClick={() => setNewAddressType(type)}
                            className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${newAddressType === type ? 'bg-primary text-white border-primary' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
                          >
                              {type}
                          </button>
                      ))}
                  </div>
              </div>

              <Button onClick={handleSaveAddress} disabled={!newAddressText}>
                  Save Address
              </Button>
          </div>
       </Modal>
    </div>
  );
};