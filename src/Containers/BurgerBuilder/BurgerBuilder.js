import React, { Component } from "react";
import Aux from "../../hoc/Auxilary";
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../Components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

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
		loading: false,
	};

	updatePurchaseState(ingredients) {
		const sum = Object.keys(ingredients)
			.map((igKey) => {
				return Number(ingredients[igKey]);
			})
			.reduce((prev, now) => {
				return prev + now;
			});
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
		this.setState({
			loading: true,
		});
		const order = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice,
			customer: {
				name: "NJ Rafi",
				address: {
					street: "27 Avoy Das Lane",
					zipCode: 1203,
					country: "Bangladesh",
				},
				email: "njrafibd@gmail.com",
			},
			deliveryMethod: "fastest",
		};

		axios
			.post("/orders.json", order)
			.then((response) => {
				console.log(response);
				this.setState({
					ingredients: {
						salad: 0,
						bacon: 0,
						cheese: 0,
						meat: 0,
					},
					totalPrice: 4,
					purchasable: false,
					purchasing: false,
					loading: false,
				});
			})
			.catch((err) => {
				this.setState({
					loading: false,
					purchasing: false,
				});
				console.log(err);
			});
	};

	render() {
		const disabledInfo = {
			...this.state.ingredients,
		};

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let orderSummary = (
			<OrderSummary
				ingredients={this.state.ingredients}
				cancelOrder={this.purchaseCancelHandler}
				continueOrder={this.purchaseContinueHandler}
				price={this.state.totalPrice}
			></OrderSummary>
		);

		if (this.state.loading) {
			orderSummary = <Spinner />;
		}

		return (
			<Aux>
				<Modal
					show={this.state.purchasing}
					modalClosed={this.purchaseCancelHandler}
				>
					{orderSummary}
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

export default withErrorHandler(BurgerBuilder, axios);
