import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button, Input } from '../components/UI';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Construct mailto link
    const subject = `Contact Form Submission from ${formData.name}`;
    const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0AMessage: ${formData.message}`;
    const mailtoLink = `mailto:kamleshg9569@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    
    // Open default mail client
    window.location.href = mailtoLink;

    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 animate-fade-in">
       <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">We'd love to hear from you. Please fill out this form or shoot us an email.</p>
       </div>

       <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
             <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-6">
                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                   <Phone className="w-6 h-6" />
                </div>
                <div>
                   <h3 className="font-bold text-xl mb-2">Phone</h3>
                   <p className="text-gray-500 mb-1">Our customer support is available 24/7.</p>
                   <p className="font-semibold text-gray-800">+91 9315515700</p>
                </div>
             </div>

             <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-6">
                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                   <Mail className="w-6 h-6" />
                </div>
                <div>
                   <h3 className="font-bold text-xl mb-2">Email</h3>
                   <p className="text-gray-500 mb-1">Drop us a line anytime.</p>
                   <p className="font-semibold text-gray-800">kamleshg9569@gmail.com</p>
                </div>
             </div>

             <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-6">
                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                   <MapPin className="w-6 h-6" />
                </div>
                <div>
                   <h3 className="font-bold text-xl mb-2">Headquarters</h3>
                   <p className="text-gray-500 mb-1">Come say hello at our office.</p>
                   <p className="font-semibold text-gray-800">Dankaur, Greater Noida, UP, India</p>
                </div>
             </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-3xl shadow-lg shadow-red-500/5">
             <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
             <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                   <Input 
                      required
                      placeholder="John Doe" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                   />
                </div>
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                   <Input 
                      required
                      type="email"
                      placeholder="john@example.com" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                   />
                </div>
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                   <textarea 
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all placeholder:text-gray-400 min-h-[150px] resize-none"
                      placeholder="How can we help you?"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                   />
                </div>
                <Button fullWidth type="submit" disabled={submitted}>
                   {submitted ? 'Opening Email Client...' : 'Send Message'}
                   {!submitted && <Send className="w-4 h-4 ml-2" />}
                </Button>
             </form>
          </div>
       </div>
    </div>
  );
};