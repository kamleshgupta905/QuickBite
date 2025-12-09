import { Category, Restaurant, User, Order } from './types';

// Updated Categories including Burger and Beverages
export const CATEGORIES: Category[] = [
  { id: '1', name: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 'b_cat', name: 'Burger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: '2', name: 'Thali', image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: '9', name: 'Combos', image: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 'bev_cat', name: 'Snacks & Drinks', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: '3', name: 'Rolls', image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: '4', name: 'Deserts', image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: '5', name: 'Sandwich', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: '6', name: 'Cake', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: '7', name: 'Salad', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: '8', name: 'Pasta', image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
];

// Single "Restaurant" to act as the source for all top dishes
export const RESTAURANTS: Restaurant[] = [
  {
    id: '1',
    name: 'QuickBite Kitchen',
    rating: 4.8,
    deliveryTime: '30-40 min',
    priceForTwo: '₹600',
    cuisine: ['North Indian', 'Italian', 'Chinese'],
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    address: 'QuickBite HQ, Food Street, Bangalore',
    reviewsCount: '10k+',
    menu: [
       // --- COMBOS ---
      {
        id: 'c1',
        name: 'Burger & Coke Combo',
        image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        price: 199,
        description: 'Crispy Veg Burger served with chilled Coke and Fries.',
        category: 'Combos',
        isVeg: true, rating: 4.8, votes: 620
      },
      {
        id: 'c2',
        name: 'Pizza Party Combo',
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        price: 349,
        description: 'Medium Margherita Pizza + Garlic Bread + 2 Cokes.',
        category: 'Combos',
        isVeg: true, rating: 4.9, votes: 450
      },
      {
        id: 'c3',
        name: 'Biryani Feast',
        image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        price: 299,
        description: 'Veg Biryani + Raita + Gulab Jamun (2 pcs).',
        category: 'Combos',
        isVeg: true, rating: 4.7, votes: 310
      },
      {
        id: 'c4',
        name: 'Family Feast',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        price: 699,
        description: '2 Large Pizzas, Garlic Bread, 1L Coke, and Brownie.',
        category: 'Combos',
        isVeg: true, rating: 4.9, votes: 120
      },
      {
        id: 'c5',
        name: 'Date Night Combo',
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        price: 499,
        description: '2 Pastas (Red/White), Garlic Bread, Choco Lava Cake.',
        category: 'Combos',
        isVeg: true, rating: 4.6, votes: 95
      },

      // --- BURGER ---
      {
        id: 'b1',
        name: 'Crispy Veg Burger',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        price: 99,
        description: 'Crispy veg patty with fresh lettuce, tomatoes and creamy mayo.',
        category: 'Burger',
        isVeg: true, rating: 4.6, votes: 450
      },

      // --- SNACKS & DRINKS (Renamed from Beverages) ---
      {
        id: 'bev1',
        name: 'Coke (500ml)',
        image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        price: 60,
        description: 'Chilled 500ml Coca-Cola bottle.',
        category: 'Snacks & Drinks',
        isVeg: true, rating: 4.8, votes: 600
      },
      {
        id: 'bev2',
        name: 'Pepsi (500ml)',
        image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        price: 60,
        description: 'Refreshing Pepsi cola drink.',
        category: 'Snacks & Drinks',
        isVeg: true, rating: 4.7, votes: 550
      },
      {
        id: 'bev3',
        name: 'Sprite (500ml)',
        image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        price: 60,
        description: 'Lemon-lime flavored soft drink.',
        category: 'Snacks & Drinks',
        isVeg: true, rating: 4.8, votes: 500
      },
      {
        id: 'bev4',
        name: 'Mountain Dew (500ml)',
        image: 'https://images.unsplash.com/photo-1624517452488-04869289c4ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        price: 60,
        description: 'Bold citrus flavored carbonated drink.',
        category: 'Snacks & Drinks',
        isVeg: true, rating: 4.6, votes: 420
      },
      {
        id: 'snack1',
        name: 'Lays Magic Masala',
        image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        price: 20,
        description: 'Spicy and crunchy masala potato chips.',
        category: 'Snacks & Drinks',
        isVeg: true, rating: 4.9, votes: 800
      },
      {
        id: 'snack2',
        name: 'Lays Classic Salted',
        image: 'https://images.unsplash.com/photo-1600952841320-db92ec4047ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        price: 20,
        description: 'Classic salted potato chips.',
        category: 'Snacks & Drinks',
        isVeg: true, rating: 4.7, votes: 650
      },
      {
        id: 'snack3',
        name: 'Kurkure Masala Munch',
        image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        price: 20,
        description: 'Crunchy and spicy Indian tea-time snack.',
        category: 'Snacks & Drinks',
        isVeg: true, rating: 4.8, votes: 900
      },

      // --- PIZZA ---
      { 
        id: 'p1', 
        name: 'Margherita Pizza', 
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
        price: 249, 
        description: 'Classic delight with 100% real mozzarella cheese.', 
        category: 'Pizza',
        isVeg: true, rating: 4.5, votes: 450 
      },
      { 
        id: 'p2', 
        name: 'Farmhouse Pizza', 
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
        price: 399, 
        description: 'Delightful combination of onion, capsicum, tomato & grilled mushroom.', 
        category: 'Pizza',
        isVeg: true, rating: 4.7, votes: 520 
      },
      { 
        id: 'p3', 
        name: 'Paneer Makhani Pizza', 
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
        price: 459, 
        description: 'Flavorful twist of spicy makhani sauce topped with paneer & capsicum.', 
        category: 'Pizza',
        isVeg: true, rating: 4.8, votes: 310 
      },
      { 
        id: 'p4', 
        name: 'Veggie Paradise', 
        image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
        price: 379, 
        description: 'Goldern corn, black olives, capsicum & red paprika.', 
        category: 'Pizza',
        isVeg: true, rating: 4.4, votes: 280 
      },
      { 
        id: 'p5', 
        name: 'Veggie Supreme', 
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
        price: 429, 
        description: 'Loaded with black olives, capsicum, mushroom, paneer, corn, and jalapeno.', 
        category: 'Pizza',
        isVeg: true, rating: 4.6, votes: 190 
      },
      { 
        id: 'p6', 
        name: 'Spicy Triple Tango', 
        image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
        price: 389, 
        description: 'Corn, jalapeno, red paprika with spicy sprinkle.', 
        category: 'Pizza',
        isVeg: true, rating: 4.3, votes: 150 
      },

      // --- THALI ---
      { 
        id: 't1', 
        name: 'Maharaja Veg Thali', 
        image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
        price: 320, 
        description: 'Paneer Butter Masala, Dal Makhani, Dry Veg, Rice, 2 Rotis, Sweet, Raita, Salad.', 
        category: 'Thali',
        isVeg: true, rating: 4.9, votes: 850 
      },
      { 
        id: 't2', 
        name: 'Mini North Indian Thali', 
        image: 'https://images.unsplash.com/photo-1606471191009-63994c53433b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
        price: 199, 
        description: 'Dal Fry, Seasonal Veg, Jeera Rice, 2 Chapatis, Pickle.', 
        category: 'Thali',
        isVeg: true, rating: 4.3, votes: 410 
      },
      { 
        id: 't3', 
        name: 'Punjabi Deluxe Thali', 
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
        price: 280, 
        description: 'Chole Masala, Aloo Gobi, Pulao, Butter Naan, Gulab Jamun.', 
        category: 'Thali',
        isVeg: true, rating: 4.6, votes: 340 
      },
      { 
        id: 't4', 
        name: 'Rajma Chawal Bowl', 
        image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
        price: 159, 
        description: 'Homestyle Rajma served with steamed Basmati rice.', 
        category: 'Thali',
        isVeg: true, rating: 4.5, votes: 220 
      },
      { 
        id: 't5', 
        name: 'Special Rice Thali', 
        image: 'https://images.unsplash.com/photo-1579631542720-3a87824fff86?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
        price: 210, 
        description: 'Jeera Rice, Dal Tadka, Papad, Salad, and Pickle.', 
        category: 'Thali',
        isVeg: true, rating: 4.2, votes: 110 
      },
      { 
        id: 't6', 
        name: 'Chole Bhature Platter', 
        image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
        price: 180, 
        description: '2 Fluffy Bhature with spicy Chole and onions.', 
        category: 'Thali',
        isVeg: true, rating: 4.8, votes: 500 
      },

      // --- ROLLS ---
      { 
        id: '5', 
        name: 'Cheese Rolls', 
        image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
        price: 129, 
        description: 'Melty cheese wrapped in a crispy roll.', 
        category: 'Rolls',
        isVeg: true, rating: 4.5, votes: 150 
      },
      { 
        id: '6', 
        name: 'Peri Peri Rolls', 
        image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
        price: 149, 
        description: 'Spicy peri peri flavored vegetable rolls.', 
        category: 'Rolls',
        isVeg: true, rating: 4.3, votes: 100 
      },
      { 
        id: 'r3', 
        name: 'Paneer Tikka Roll', 
        image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
        price: 169, 
        description: 'Grilled paneer tikka cubes wrapped with veggies.', 
        category: 'Rolls',
        isVeg: true, rating: 4.7, votes: 210 
      },
      { 
        id: 'r4', 
        name: 'Mushroom Roll', 
        image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
        price: 159, 
        description: 'Spicy mushroom masala stuffing.', 
        category: 'Rolls',
        isVeg: true, rating: 4.4, votes: 90 
      },

      // --- DESSERTS ---
      { 
        id: '9', 
        name: 'Ripple Ice Cream', 
        image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
        price: 119, 
        description: 'Creamy ice cream with fruit ripples.', 
        category: 'Deserts',
        isVeg: true, rating: 4.8, votes: 180 
      },
      { 
        id: '10', 
        name: 'Fruit Ice Cream', 
        image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
        price: 139, 
        description: 'Real fruit chunks in fresh ice cream.', 
        category: 'Deserts',
        isVeg: true, rating: 4.6, votes: 140 
      },
      { 
        id: 'd3', 
        name: 'Choco Lava Cake', 
        image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
        price: 99, 
        description: 'Warm chocolate cake with a molten core.', 
        category: 'Deserts',
        isVeg: true, rating: 4.9, votes: 400 
      },
      { 
        id: 'd4', 
        name: 'Gulab Jamun (2pcs)', 
        image: 'https://images.unsplash.com/photo-1589119908995-c6837fa14848?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
        price: 60, 
        description: 'Soft and spongy milk-solid balls soaked in syrup.', 
        category: 'Deserts',
        isVeg: true, rating: 4.7, votes: 320 
      },

      // --- SANDWICH ---
      { 
        id: '13', 
        name: 'Paneer Sandwich', 
        image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
        price: 149, 
        description: 'Spiced paneer filling between toasted bread.', 
        category: 'Sandwich',
        isVeg: true, rating: 4.3, votes: 160 
      },
      { 
        id: '15', 
        name: 'Grilled Sandwich', 
        image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
        price: 129, 
        description: 'Perfectly grilled cheese and veggie sandwich.', 
        category: 'Sandwich',
        isVeg: true, rating: 4.6, votes: 150 
      },
      { 
        id: 's4', 
        name: 'Bombay Masala Toast', 
        image: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
        price: 99, 
        description: 'Spicy potato filling with chutney and sev.', 
        category: 'Sandwich',
        isVeg: true, rating: 4.7, votes: 200 
      },

      // --- CAKE ---
      { 
        id: '19', 
        name: 'Butterscotch Cake', 
        image: 'https://images.unsplash.com/photo-1542826438-bd32f43d626f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
        price: 499, 
        description: 'Rich butterscotch flavor with crunch.', 
        category: 'Cake',
        isVeg: true, rating: 4.9, votes: 230 
      },
      { 
        id: '20', 
        name: 'Sliced Cake', 
        image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
        price: 99, 
        description: 'Perfect slice for tea time.', 
        category: 'Cake',
        isVeg: true, rating: 4.4, votes: 140 
      },
      { 
        id: 'ck3', 
        name: 'Chocolate Truffle', 
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
        price: 599, 
        description: 'Dark chocolate truffle cake.', 
        category: 'Cake',
        isVeg: true, rating: 4.9, votes: 350 
      },
      { 
        id: 'ck4', 
        name: 'Pineapple Pastry', 
        image: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
        price: 89, 
        description: 'Fresh pineapple slice with cream.', 
        category: 'Cake',
        isVeg: true, rating: 4.5, votes: 130 
      },

      // --- SALAD ---
      { 
        id: '1', 
        name: 'Greek Salad', 
        image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
        price: 220, 
        description: 'Fresh vegetables, feta cheese, and olives with herbs.', 
        category: 'Salad',
        isVeg: true, rating: 4.5, votes: 120 
      },
      { 
        id: '4', 
        name: 'Paneer Salad', 
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
        price: 250, 
        description: 'Grilled cottage cheese cubes with fresh salad greens.', 
        category: 'Salad',
        isVeg: true, rating: 4.9, votes: 310 
      },
      { 
        id: 'sl3', 
        name: 'Russian Salad', 
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
        price: 199, 
        description: 'Creamy salad with peas, carrots, and potatoes.', 
        category: 'Salad',
        isVeg: true, rating: 4.4, votes: 85 
      },

       // --- PASTA ---
      { 
        id: '26', 
        name: 'Tomato Pasta', 
        image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
        price: 210, 
        description: 'Classic tangy tomato sauce pasta.', 
        category: 'Pasta',
        isVeg: true, rating: 4.5, votes: 160 
      },
      { 
        id: '28', 
        name: 'White Sauce Pasta', 
        image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
        price: 260, 
        description: 'Delightful white sauce pasta topped with olives.', 
        category: 'Pasta',
        isVeg: true, rating: 4.8, votes: 200 
      },
      { 
        id: 'pt3', 
        name: 'Red Sauce Pasta', 
        image: 'https://images.unsplash.com/photo-1626844131082-256783844137?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
        price: 230, 
        description: 'Spicy arrabbiata sauce with penne.', 
        category: 'Pasta',
        isVeg: true, rating: 4.4, votes: 120 
      },
      { 
        id: 'pt4', 
        name: 'Mixed Sauce Pasta', 
        image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
        price: 250, 
        description: 'Perfect blend of red and white sauce.', 
        category: 'Pasta',
        isVeg: true, rating: 4.6, votes: 180 
      },
    ]
  }
];

export const CURRENT_USER: User = {
  name: 'Rahul Sharma',
  email: 'rahul.sharma@example.com',
  avatar: 'https://picsum.photos/seed/user/200/200',
  addresses: [] // Removed default addresses as requested
};

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord_123',
    status: 'Delivered',
    total: 549,
    date: '2 Oct 2023, 12:30 PM',
    restaurantName: 'QuickBite Kitchen',
    restaurantImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    items: [
       { id: 'p1', name: 'Margherita Pizza', description: '', price: 249, image: '', isVeg: true, category: 'Pizza', rating: 0, votes: 0, quantity: 2, restaurantId: '1' },
    ]
  },
  {
    id: 'ord_124',
    status: 'Delivered',
    total: 320,
    date: '28 Sep 2023, 08:15 PM',
    restaurantName: 'QuickBite Kitchen',
    restaurantImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    items: [
      { id: 't1', name: 'Maharaja Veg Thali', description: '', price: 320, image: '', isVeg: true, category: 'Thali', rating: 0, votes: 0, quantity: 1, restaurantId: '1' },
    ]
  }
];