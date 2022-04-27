//dependencies
import { createSlice } from '@reduxjs/toolkit';

//creating ui slice
const uiSlice = createSlice({
	name: 'ui',
	initialState: { cartIsVisible: false, notification: null },
	reducers: {
		toggle(state) {
			state.cartIsVisible = !state.cartIsVisible; //not mutating current state, altough it would seems like that
		},
		showNotification(state, action) {
			state.notification = {
				status: action.payload.status,
				title: action.payload.title,
				message: action.payload.message,
			};
		},
	},
});

//creating ui actions to export
export const uiActions = uiSlice.actions;

export default uiSlice;
