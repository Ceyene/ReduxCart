import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
	return (
		<Card className={classes.cart}>
			<h2>Your Shopping Cart</h2>
			<ul>
				<CartItem
					item={{ title: 'Test Item', quantity: 3, total: 18, price: 6 }}
				/>
			</ul>
			<h2>Total Amount:</h2> $0.00
		</Card>
	);
};

export default Cart;
