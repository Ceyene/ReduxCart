//dependencies
import { configureStore } from '@reduxjs/toolkit';
//slices
import uiSlice from './ui-slice';

//creating store
const store = configureStore({
	reducer: { ui: uiSlice.reducer },
});

export default store;
