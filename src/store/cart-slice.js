//dependencies
import { createSlice } from '@reduxjs/toolkit';

//creating cart slice
const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		items: [],
		totalQuantity: 0,
		totalAmount: 0,
	},
	reducers: {
		addItemToCart(state, action) {
			const newItem = action.payload;
			const existingItem = state.items.find((item) => item.id === newItem.id);
			state.totalQuantity++;
			state.totalAmount = state.totalAmount + newItem.price;

			//if the item to be added is already in the cart, just update its quantity
			if (!existingItem) {
				state.items.push({
					itemId: newItem.id,
					price: newItem.price,
					quantity: 1,
					totalPrice: newItem.price,
					name: newItem.title,
				}); //push can be used with redux toolkit
			} else {
				existingItem.quantity++;
				existingItem.totalPrice = existingItem.totalPrice + newItem.price;
			}
		},
		removeItemFromCart(state, action) {
			const id = action.payload;
			const existingItem = state.items.find((item) => item.id === id);
			state.totalAmount = state.totalAmount - existingItem.price;

			//if the item to remove is just once in the cart, remove it, else, just update its quantity
			if (existingItem.quantity === 1) {
				state.items = state.items.filter((item) => item.id !== id);
				existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
			} else {
				existingItem.quantity--;
				existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
			}
		},
	},
});

//creating cart actions to export
export const cartActions = cartSlice.actions;

export default cartSlice;
