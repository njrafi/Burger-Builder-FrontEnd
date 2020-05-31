import React, { Component } from "react";
import Aux from "../../hoc/Auxilary";
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";
import api from "../../axios-orders";
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
		ingredients: null,
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
		loading: false,
	};

	componentDidMount() {
		api()
			.get("/ingredients.json")
			.then((response) => {
				this.setState({ ingredients: response.data });
			})
			.catch((err) => {
				console.log(err);
			});
	}

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
		this.props.history.push({
			pathname: "/checkout",
			state: {
				ingredients: this.state.ingredients,
				totalPrice: this.state.totalPrice,
			},
		});
	};

	render() {
		const disabledInfo = {
			...this.state.ingredients,
		};

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let orderSummary = null;
		let burger = <Spinner />;

		if (this.state.ingredients) {
			burger = (
				<Aux>
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

			orderSummary = (
				<OrderSummary
					ingredients={this.state.ingredients}
					cancelOrder={this.purchaseCancelHandler}
					continueOrder={this.purchaseContinueHandler}
					price={this.state.totalPrice}
				></OrderSummary>
			);
		}

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
				{burger}
			</Aux>
		);
	}
}

export default withErrorHandler(BurgerBuilder, api());
