//dependencies
import { createSlice } from '@reduxjs/toolkit';

//creating ui slice
const uiSlice = createSlice({
	name: 'ui',
	initialState: { cartIsVisible: false },
	reducers: {
		toggle(state) {
			state.cartIsVisible = !state.cartIsVisible; //not mutating current state, altough it would seems like that
		},
	},
});

//creating ui actions to export
export const uiActions = uiSlice.actions;

export default uiSlice;
