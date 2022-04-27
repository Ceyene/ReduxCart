//dependencies
import { createSlice } from '@reduxjs/toolkit';
import { uiActions } from './ui-slice';

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
			state.totalAmount += newItem.price;

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

			//if the item to remove is just once in the cart, remove it, else, just update its quantity
			if (existingItem.quantity === 1) {
				state.items = state.items.filter((item) => item.id !== id);
			} else {
				existingItem.quantity--;
			}
		},
	},
});

//Action Creator Thunk (customized action creator for side-effect handling)
export const sendCartData = (cart) => {
	//returns a function
	return async (dispatch) => {
		//dispatching action
		//first notification --> sending data
		dispatch(
			uiActions.showNotification({
				status: 'pending',
				title: 'Sending...',
				message: 'Sending cart data',
			})
		);

		//...side effect function
		const sendRequest = async () => {
			const response = await fetch(
				'https://shopping-redux-default-rtdb.firebaseio.com/cart.json',
				{
					method: 'PUT',
					body: JSON.stringify(cart),
				}
			);
			//handling errors before continue (not sending a bad response to the UI without catching it as an error)
			if (!response.ok) {
				throw new Error('Sending cart data failed');
			}
		};

		//sending cart data and error handling
		try {
			await sendRequest();
		} catch (error) {
			//if it wasn't successful, send a notification
			dispatch(
				uiActions.showNotification({
					status: 'error',
					title: 'Error!',
					message: 'Sending cart data failed',
				})
			);
		}

		//dispatching action
		//if it was successful, send a notification
		dispatch(
			uiActions.showNotification({
				status: 'success',
				title: 'Success!',
				message: 'Sent cart data successfully!',
			})
		);
	};
};

//creating cart actions to export
export const cartActions = cartSlice.actions;

export default cartSlice;
