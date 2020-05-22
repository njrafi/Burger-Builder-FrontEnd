import React, { Component } from "react";
import Aux from "../../hoc/Auxilary";
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
};
class BurgerBuilder extends Component {
	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0,
		},
		totalPrice: 4,
	};

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;
		const upgradedIngredients = {
			...this.state.ingredients,
		};
		upgradedIngredients[type] = updatedCount;
		this.setState({
			ingredients: upgradedIngredients,
			totalPrice: newPrice,
		});
	};

	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		if (oldCount === 0) return;
		const updatedCount = oldCount - 1;
		const priceDeduction = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceDeduction;
		const upgradedIngredients = {
			...this.state.ingredients,
		};
		upgradedIngredients[type] = updatedCount;
		this.setState({
			ingredients: upgradedIngredients,
			totalPrice: newPrice,
		});
	};

	render() {
		const disabledInfo = {
			...this.state.ingredients,
		};

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		return (
			<Aux>
				<Burger ingredients={this.state.ingredients}></Burger>
				<BuildControls
					ingredientAdded={this.addIngredientHandler}
					ingredientRemoved={this.removeIngredientHandler}
					disabled={disabledInfo}
				/>
			</Aux>
		);
	}
}

export default BurgerBuilder;
