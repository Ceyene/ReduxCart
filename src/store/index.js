//dependencies
import { configureStore } from '@reduxjs/toolkit';
//slices
import uiSlice from './ui-slice';
import cartSlice from './cart-slice';

//creating store
const store = configureStore({
	reducer: { ui: uiSlice.reducer, cart: cartSlice.reducer },
});

export default store;
