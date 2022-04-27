//dependencies
import { useEffect } from 'react';
//redux
import { useSelector } from 'react-redux';
//components
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

function App() {
	const showCart = useSelector((state) => state.ui.cartIsVisible); //accessing the state inside the ui slice
	const cart = useSelector((state) => state.cart); //accessing the state inside the cart slice

	//handling side effects inside components with useEffect (Fat reducer: all logic in there)
	useEffect(() => {
		fetch('https://shopping-redux-default-rtdb.firebaseio.com/cart.json', {
			method: 'PUT',
			body: JSON.stringify(cart),
		});
	}, [cart]);

	return (
		<Layout>
			{showCart && <Cart />}
			<Products />
		</Layout>
	);
}

export default App;
