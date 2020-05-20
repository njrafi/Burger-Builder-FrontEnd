import React, { Component } from "react";
import styles from "./App.module.css";
import Layout from "../Components/Layout/Layout";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";

class App extends Component {
	render() {
		return (
			<div className={styles.App}>
				<Layout>
					<p>Hello World</p>
					<BurgerBuilder></BurgerBuilder>
				</Layout>
			</div>
		);
	}
}

export default App;
