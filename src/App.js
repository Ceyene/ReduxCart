//dependencies
import { Fragment, useEffect } from 'react';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { sendCartData, fetchCartData } from './store/cart-actions';
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

	//Handling side effects inside components with useEffect (Fat reducer: all logic in there)

	//1st time loading -> fetching cart data from firebase to our cart component
	useEffect(() => {
		dispatch(fetchCartData());
	}, [dispatch]);

	//each time our cart is uploaded, sending data to firebase
	useEffect(() => {
		//if it's the first time this component loads, don't send cart data
		if (isInitial) {
			isInitial = false; //setting it so the next time it will send cart data
			return;
		}
		//using customized action creator (redux-toolkit)
		dispatch(sendCartData(cart));
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
