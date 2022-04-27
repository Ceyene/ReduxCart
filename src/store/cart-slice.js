//dependencies
import { createSlice } from '@reduxjs/toolkit';

//creating cart slice
const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		items: [],
		totalQuantity: 0,
		totalAmount: 0,
		changed: false,
	},
	reducers: {
		replaceCart(state, action) {
			state.totalAmount = action.payload.totalAmount;
			state.totalQuantity = action.payload.totalQuantity;
			state.items = action.payload.items;
		},
		addItemToCart(state, action) {
			const newItem = action.payload;
			const existingItem = state.items.find((item) => item.id === newItem.id);
			state.totalQuantity++;
			state.totalAmount += newItem.price;
			state.changed = true;

			//if the item to be added is already in the cart, just update its quantity
			if (!existingItem) {
				state.items.push({
					id: newItem.id,
					price: newItem.price,
					quantity: 1,
					totalPrice: newItem.price,
					title: newItem.title,
				}); //push can be used with redux toolkit
			} else {
				existingItem.quantity++; //this only applies inside a reducer from redux toolkit
				existingItem.totalPrice = existingItem.totalPrice + newItem.price; //never mutate state outside a reducer
			}
		},
		removeItemFromCart(state, action) {
			const id = action.payload;
			const existingItem = state.items.find((item) => item.id === id);
			state.totalQuantity--;
			state.totalAmount -= existingItem.price;
			state.changed = true;

			//if the item to remove is just once in the cart, remove it, else, just update its quantity
			if (existingItem.quantity === 1) {
				state.items = state.items.filter((item) => item.id !== id);
			} else {
				existingItem.quantity--;
			}
		},
	},
});

//creating cart actions to export
export const cartActions = cartSlice.actions;

export default cartSlice;
