//components
import ProductItem from './ProductItem';
//assets
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
	{
		id: 'p1',
		price: 6,
		title: 'The Little Prince',
		description: 'A book from A. de Saint-Exupéry',
	},
	{
		id: 'p2',
		price: 9,
		title: 'Romeo and Juliet',
		description: 'A book from W. Shakespeare',
	},
	{
		id: 'p3',
		price: 3,
		title: 'Mars Chronicles',
		description: 'A book from R. Bradbury',
	},
	{
		id: 'p4',
		price: 5,
		title: 'Elantris',
		description: 'A book from B. Sanderson',
	},
	{
		id: 'p5',
		price: 7,
		title: 'The Last Wish (The Witcher 1)',
		description: 'A book from A. Saplowski',
	},
];

const Products = (props) => {
	return (
		<section className={classes.products}>
			<h2>Buy your favorite products</h2>
			<ul>
				{DUMMY_PRODUCTS.map((product) => (
					<ProductItem
						key={product.id}
						id={product.id}
						title={product.title}
						price={product.price}
						description={product.description}
					/>
				))}
			</ul>
		</section>
	);
};

export default Products;
