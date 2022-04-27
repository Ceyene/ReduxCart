//redux
import { useSelector } from 'react-redux';
//components
import Card from '../UI/Card';
import CartItem from './CartItem';
//assets
import classes from './Cart.module.css';

const Cart = (props) => {
	const cartItems = useSelector((state) => state.cart.items); //accesing to the cart items state
	const totalAmount = useSelector((state) => state.cart.totalAmount).toFixed(2); //accessing the total price

	return (
		<Card className={classes.cart}>
			<h2>Your Shopping Cart</h2>
			<ul>
				{cartItems.map((item) => (
					<CartItem
						key={item.id}
						item={{
							id: item.id,
							title: item.title,
							quantity: item.quantity,
							total: item.totalPrice,
							price: item.price,
						}}
					/>
				))}
			</ul>
			<h2>Total Amount:</h2> ${totalAmount}
		</Card>
	);
};

export default Cart;
