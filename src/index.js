//dependencies
import ReactDOM from 'react-dom/client';
//redux: providing our created store to the entire application
import { Provider } from 'react-redux';
import store from './store';

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<App />
	</Provider>
);
