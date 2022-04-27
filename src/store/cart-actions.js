//dependencies
import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';

//Action Creator Thunk (customized action creator for side-effect handling)
export const fetchCartData = () => {
	return async (dispatch) => {
		const fetchData = async () => {
			const response = await fetch(
				'https://shopping-redux-default-rtdb.firebaseio.com/cart.json'
			);
			//handling errors before continue (not sending a bad response to the UI without catching it as an error)
			if (!response.ok) {
				throw new Error('Could not fetch cart data!');
			}
			const data = await response.json();
			return data;
		};

		//fetching cart data and error handling
		try {
			//first, we fetch our cart data from firebase
			const cartData = await fetchData();
			//then, we replace our frontend cart data with it
			dispatch(
				cartActions.replaceCart({
					items: cartData.items || [],
					totalQuantity: cartData.totalQuantity,
					totalAmount: cartData.totalAmount,
				})
			);
		} catch (error) {
			//if it wasn't successful, send a notification
			dispatch(
				uiActions.showNotification({
					status: 'error',
					title: 'Error!',
					message: 'Fetching cart data failed',
				})
			);
		}
	};
};

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
					method: 'PUT', //with this method, firebase will take our format of data, so we won't need to make any destructuring in order to use that same data when we fetch it from the db
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
