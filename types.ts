export type ScreenType = 'HOME' | 'SEARCH' | 'RESTAURANT' | 'CART' | 'CHECKOUT' | 'TRACKING' | 'PROFILE' | 'ADMIN' | 'CONTACT' | 'COMBOS';

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isVeg: boolean;
  category: string;
  rating: number;
  votes: number;
}

export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  deliveryTime: string;
  priceForTwo: string;
  cuisine: string[];
  image: string;
  offer?: string;
  menu: MenuItem[];
  address: string;
  reviewsCount: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
  restaurantId: string;
}

export interface User {
  name: string;
  email: string;
  avatar: string;
  addresses: Address[];
}

export interface Address {
  id: string;
  type: 'Home' | 'Work' | 'Other';
  text: string;
}

export interface Order {
  id: string;
  status: 'Placed' | 'Preparing' | 'Picked Up' | 'On the Way' | 'Delivered';
  total: number;
  items: CartItem[];
  date: string;
  restaurantName: string;
  restaurantImage: string;
}