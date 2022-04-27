//redux
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
//assets
import classes from './CartButton.module.css';

const CartButton = (props) => {
	const dispatch = useDispatch(); //accesing the dispatch function
	const cartQuantity = useSelector((state) => state.cart.totalQuantity) || 0;

	const toggleCartHandler = () => {
		dispatch(uiActions.toggle()); //using the toggle method from the ui slice
	};

	return (
		<button className={classes.button} onClick={toggleCartHandler}>
			<span>My Cart</span>
			<span className={classes.badge}>{cartQuantity}</span>
		</button>
	);
};

export default CartButton;
