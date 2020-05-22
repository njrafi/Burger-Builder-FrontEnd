import React, { Component } from "react";
import Aux from "../../hoc/Auxilary";
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";

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
		purchasable: false,
		purchasing: false,
	};

	updatePurchaseState(ingredients) {
		const sum = Object.keys(ingredients)
			.map((igKey) => {
				return Number(ingredients[igKey]);
			})
			.reduce((prev, now) => {
				return prev + now;
			});
		console.log("Sum of ingredients: ", sum);
		if (sum > 0) {
			this.setState({
				purchasable: true,
			});
		} else {
			this.setState({
				purchasable: false,
			});
		}
	}

	purchaseHandler = () => {
		this.setState({
			purchasing: true,
		});
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
		this.updatePurchaseState(upgradedIngredients);
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
		this.updatePurchaseState(upgradedIngredients);
	};

	purchaseCancelHandler = () => {
		this.setState({
			purchasing: false,
		});
	};

	purchaseContinueHandler = () => {
		alert("You Continue");
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
				<Modal
					show={this.state.purchasing}
					modalClosed={this.purchaseCancelHandler}
				>
					<OrderSummary
						ingredients={this.state.ingredients}
						cancelOrder={this.purchaseCancelHandler}
						continueOrder={this.purchaseContinueHandler}
					></OrderSummary>
				</Modal>
				<Burger ingredients={this.state.ingredients}></Burger>
				<BuildControls
					ingredientAdded={this.addIngredientHandler}
					ingredientRemoved={this.removeIngredientHandler}
					disabled={disabledInfo}
					price={this.state.totalPrice}
					purchasable={this.state.purchasable}
					ordered={this.purchaseHandler}
				/>
			</Aux>
		);
	}
}

export default BurgerBuilder;
