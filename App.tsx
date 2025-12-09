import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { LoginPopup } from './components/LoginPopup';
import { ScreenType, Restaurant, CartItem, MenuItem, Order } from './types';
import { Home } from './screens/Home';
import { RestaurantDetail } from './screens/Restaurant';
import { Cart } from './screens/Cart';
import { Checkout } from './screens/Checkout';
import { OrderTracking } from './screens/OrderTracking';
import { Profile } from './screens/Profile';
import { SearchScreen } from './screens/Search';
import { AdminDashboard } from './screens/Admin';
import { Contact } from './screens/Contact';
import { CombosScreen } from './screens/Combos';
import { RESTAURANTS, MOCK_ORDERS } from './data';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('HOME');
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showLogin, setShowLogin] = useState(false);
  
  // Lifted State for Orders (Shared between Checkout & Admin)
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);

  // Lifted State for Menu Items (Enable Real-time Admin Updates)
  const [menuItems, setMenuItems] = useState<MenuItem[]>(RESTAURANTS[0].menu);

  // Derived state
  const selectedRestaurant = RESTAURANTS.find(r => r.id === selectedRestaurantId);

  // Cart Logic
  const addToCart = (item: MenuItem, restaurantId: string = '1') => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1, restaurantId }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map(i => i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i);
      }
      return prev.filter(i => i.id !== itemId);
    });
  };

  const clearCart = () => setCart([]);

  // Admin Menu Management
  const handleAddMenuItem = (newItem: MenuItem) => {
    setMenuItems(prev => [newItem, ...prev]);
  };

  const handleRemoveMenuItem = (id: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  // Order Management
  const handlePlaceOrder = (newOrder: Order) => {
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setCurrentScreen('TRACKING');
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const handleRestaurantClick = (id: string) => {
    setSelectedRestaurantId(id);
    setCurrentScreen('RESTAURANT');
  };

  const handleNavigate = (screen: ScreenType) => {
    if (screen === 'RESTAURANT' && !selectedRestaurantId) {
       if (RESTAURANTS.length > 0) {
         setSelectedRestaurantId(RESTAURANTS[0].id);
       }
    }
    setCurrentScreen(screen);
  };

  const handleLoginSuccess = (role: 'ADMIN' | 'USER') => {
      if (role === 'ADMIN') {
          setCurrentScreen('ADMIN');
      } else {
          // Stay on current screen
      }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'HOME':
        return (
          <Home 
            items={menuItems}
            onRestaurantClick={handleRestaurantClick} 
            onSearchClick={() => setCurrentScreen('SEARCH')}
            cart={cart}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        );
      case 'SEARCH':
        return <SearchScreen items={menuItems} onRestaurantClick={handleRestaurantClick} />;
      case 'COMBOS':
        return (
          <CombosScreen 
            items={menuItems}
            onRestaurantClick={handleRestaurantClick}
            cart={cart}
            addToCart={(item) => addToCart(item)}
            removeFromCart={(id) => removeFromCart(id)}
            onViewCart={() => setCurrentScreen('CART')}
          />
        );
      case 'RESTAURANT':
        if (!selectedRestaurant) return <Home items={menuItems} onRestaurantClick={handleRestaurantClick} onSearchClick={() => setCurrentScreen('SEARCH')} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} />;
        return (
          <RestaurantDetail 
            restaurant={selectedRestaurant} 
            items={menuItems} // Pass dynamic items
            cart={cart}
            onAddToCart={(item) => addToCart(item, selectedRestaurant.id)}
            onRemoveFromCart={(id) => removeFromCart(id)}
            onViewCart={() => setCurrentScreen('CART')}
          />
        );
      case 'CART':
        return (
          <Cart 
            cart={cart} 
            onAdd={(item) => addToCart(item, item.restaurantId)}
            onRemove={(id) => removeFromCart(id)}
            onCheckout={() => setCurrentScreen('CHECKOUT')}
            onExplore={() => setCurrentScreen('HOME')}
          />
        );
      case 'CHECKOUT':
        return <Checkout cart={cart} onPlaceOrder={handlePlaceOrder} onBack={() => setCurrentScreen('CART')} />;
      case 'TRACKING':
        // Pass the latest order to tracking
        return <OrderTracking order={orders[0]} />;
      case 'PROFILE':
        return <Profile orders={orders} onLogout={() => alert('Logged out')} />;
      case 'ADMIN':
        return (
            <AdminDashboard 
                orders={orders} 
                onUpdateStatus={handleUpdateOrderStatus} 
                menuItems={menuItems}
                onAddmnItem={handleAddMenuItem}
                onRemoveItem={handleRemoveMenuItem}
            />
        );
      case 'CONTACT':
        return <Contact />;
      default:
        return (
          <Home 
            items={menuItems}
            onRestaurantClick={handleRestaurantClick} 
            onSearchClick={() => setCurrentScreen('SEARCH')} 
            cart={cart}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        );
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentScreen]);

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} onLoginSuccess={handleLoginSuccess} />}
      <Layout 
        currentScreen={currentScreen} 
        setCurrentScreen={handleNavigate} 
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        setShowLogin={setShowLogin}
      >
        <div className="animate-fade-in min-h-[calc(100vh-64px)]">
          {renderScreen()}
        </div>
      </Layout>
    </>
  );
};

export default App;