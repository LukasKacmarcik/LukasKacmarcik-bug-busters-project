import { configureStore } from '@reduxjs/toolkit';
import restaurantsReducer from './slices/restaurants';
import mealsReducer from './slices/meals';
import sessionReducer from './slices/session';
import cartReducer from './slices/cart';

export const store = configureStore({
  reducer: {
    restaurants: restaurantsReducer,
    meals: mealsReducer,
    session: sessionReducer,
    cart: cartReducer,
  },
});
