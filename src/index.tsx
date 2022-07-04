import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Pages from './pages';
import reportWebVitals from './reportWebVitals';
import { store } from './services/store';
import { Provider }  from "react-redux";
import { BrowserRouter } from "react-router-dom";

//const root = createRoot(document.getElementById('root') as HTMLElement);

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Pages />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root') as HTMLElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();