import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./Containers/App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { combineReducers, createStore, applyMiddleware } from "redux";
import burgerReducer from "./store/reducers/burger";
import { Provider } from "react-redux";

const rootReducer = combineReducers({
	burger: burgerReducer,
});

const logger = (store) => {
	return (next) => {
		return (action) => {
			console.log("[Middleware] Dispatching", action);
			const result = next(action);
			console.log("[Middleware] next state", store.getState());
			return result;
		};
	};
};

const store = createStore(rootReducer, applyMiddleware(logger));

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
