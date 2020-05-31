import React, { Component } from "react";
import styles from "./App.module.css";
import Layout from "../Components/Layout/Layout";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import Checkout from "./Checkout/Checkout";
import { Switch, Route } from "react-router-dom";
class App extends Component {
	render() {
		return (
			<div className={styles.App}>
				<Layout>
					<Switch>
						<Route path="/checkout" component={Checkout} />
						<Route path="/" component={BurgerBuilder} />
						<Route render={() => <h1>Are you lost?</h1>} />
					</Switch>
				</Layout>
			</div>
		);
	}
}

export default App;
