//redux
import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
//assets
import classes from './CartButton.module.css';

const CartButton = (props) => {
	const dispatch = useDispatch(); //accesing the dispatch function

	const toggleCartHandler = () => {
		dispatch(uiActions.toggle()); //using the toggle method from the ui slice
	};

	return (
		<button className={classes.button} onClick={toggleCartHandler}>
			<span>My Cart</span>
			<span className={classes.badge}>1</span>
		</button>
	);
};

export default CartButton;
