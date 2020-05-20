import React, { Component } from "react";
import Aux from "../../hoc/Auxilary";
import Burger from "../../Components/Burger/Burger";

class BurgerBuilder extends Component {
	render() {
		return (
			<Aux>
				<Burger></Burger>
				<div>Burger Controls</div>
			</Aux>
		);
	}
}

export default BurgerBuilder;
