//redux
import { useSelector } from 'react-redux';
//components
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

function App() {
	const showCart = useSelector((state) => state.ui.cartIsVisible); //accessing the state inside the ui slice

	return (
		<Layout>
			{showCart && <Cart />}
			<Products />
		</Layout>
	);
}

export default App;
