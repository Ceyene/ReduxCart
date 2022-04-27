//dependencies
import { Fragment, useEffect } from 'react';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from './store/ui-slice';
//components
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';

//handling useEffect so it will no overwrite cart information the first time it loads
let isInitial = true;

function App() {
	const showCart = useSelector((state) => state.ui.cartIsVisible); //accessing the state inside the ui slice
	const cart = useSelector((state) => state.cart); //accessing the state inside the cart slice
	const dispatch = useDispatch(); //accessing dispatch method
	const notification = useSelector((state) => state.ui.notification); //accesing the notifications state inside the ui slice

	//handling side effects inside components with useEffect (Fat reducer: all logic in there)
	useEffect(() => {
		const sendCartData = async () => {
			dispatch(
				uiActions.showNotification({
					status: 'pending',
					title: 'Sending...',
					message: 'Sending cart data',
				})
			);
			const response = await fetch(
				'https://shopping-redux-default-rtdb.firebaseio.com/cart.json',
				{
					method: 'PUT',
					body: JSON.stringify(cart),
				}
			);
			//handling errors before continue
			if (!response.ok) {
				throw new Error('Sending cart data failed');
			}

			//if it was successful, send a notification
			dispatch(
				uiActions.showNotification({
					status: 'success',
					title: 'Success!',
					message: 'Sent cart data successfully!',
				})
			);
		};

		//if it's the first time this component loads, don't send cart data
		if (isInitial) {
			isInitial = false; //setting it so the next time it will send cart data
			return;
		}

		//sending cart data and error handling
		sendCartData().catch((error) => {
			//if it wasn't successful, send a notification
			dispatch(
				uiActions.showNotification({
					status: 'error',
					title: 'Error!',
					message: 'Sending cart data failed',
				})
			);
		});
	}, [cart, dispatch]); //dispatch will never change, so it will never trigger this hook

	return (
		<Fragment>
			{notification && (
				<Notification
					status={notification.status}
					title={notification.title}
					message={notification.message}
				/>
			)}
			<Layout>
				{showCart && <Cart />}
				<Products />
			</Layout>
		</Fragment>
	);
}

export default App;
