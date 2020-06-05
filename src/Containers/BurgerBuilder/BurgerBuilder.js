import React, { Component } from "react";
import Aux from "../../hoc/Auxilary";
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";
import api from "../../axios-orders";
import Spinner from "../../Components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from "../../store/actions";
import { connect } from "react-redux";

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
};
class BurgerBuilder extends Component {
	state = {
		purchasable: false,
		purchasing: false,
		loading: false,
	};

	componentDidMount() {
		if (!this.props.burger.ingredients) {
			api()
				.get("/ingredients.json")
				.then((response) => {
					this.props.updateBurger(response.data, 4);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			this.updatePurchaseState(this.props.burger.ingredients);
		}
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
		const oldCount = this.props.burger.ingredients[type];
		const updatedCount = oldCount + 1;
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.props.burger.totalPrice;
		const newPrice = oldPrice + priceAddition;
		const upgradedIngredients = {
			...this.props.burger.ingredients,
		};
		upgradedIngredients[type] = updatedCount;
		this.props.updateBurger(upgradedIngredients, newPrice);
		this.updatePurchaseState(upgradedIngredients);
	};

	removeIngredientHandler = (type) => {
		const oldCount = this.props.burger.ingredients[type];
		if (oldCount === 0) return;
		const updatedCount = oldCount - 1;
		const priceDeduction = INGREDIENT_PRICES[type];
		const oldPrice = this.props.burger.totalPrice;
		const newPrice = oldPrice - priceDeduction;
		const upgradedIngredients = {
			...this.props.burger.ingredients,
		};
		upgradedIngredients[type] = updatedCount;
		this.props.updateBurger(upgradedIngredients, newPrice);
		this.updatePurchaseState(upgradedIngredients);
	};

	purchaseCancelHandler = () => {
		this.setState({
			purchasing: false,
		});
	};

	purchaseContinueHandler = () => {
		this.props.history.push("/checkout");
	};

	render() {
		const disabledInfo = {
			...this.props.burger.ingredients,
		};

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let orderSummary = null;
		let burger = <Spinner />;

		if (this.props.burger.ingredients) {
			burger = (
				<Aux>
					<Burger ingredients={this.props.burger.ingredients}></Burger>
					<BuildControls
						ingredientAdded={this.addIngredientHandler}
						ingredientRemoved={this.removeIngredientHandler}
						disabled={disabledInfo}
						price={this.props.burger.totalPrice}
						purchasable={this.state.purchasable}
						ordered={this.purchaseHandler}
					/>
				</Aux>
			);

			orderSummary = (
				<OrderSummary
					ingredients={this.props.burger.ingredients}
					cancelOrder={this.purchaseCancelHandler}
					continueOrder={this.purchaseContinueHandler}
					price={this.props.burger.totalPrice}
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

const mapStateToProps = (state) => {
	return {
		burger: state.burger,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateBurger: (ingredients, totalPrice) =>
			dispatch({
				type: actionTypes.UPDATE_BURGER,
				ingredients: ingredients,
				totalPrice: totalPrice,
			}),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilder, api()));
