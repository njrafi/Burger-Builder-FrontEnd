import React, { Component } from "react";
import { Route } from "react-router-dom";
import CheckoutSummary from "../../Components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
class Checkout extends Component {
	state = {
		ingredients: {
			salad: 0,
			meat: 0,
			cheese: 0,
			bacon: 0,
		},
		totalPrice: 0,
	};

	componentDidMount() {
		this.setState({
			ingredients: this.props.location.state?.ingredients,
			totalPrice: this.props.location.state?.totalPrice,
		});
	}

	checkoutCancelHandler = () => {
		this.props.history.goBack();
	};

	checkoutContinueHanler = () => {
		this.props.history.replace(this.props.match.url + "/contact-data");
	};

	render() {
		console.log(this.props.match.url + "/contact-data");
		return (
			<div>
				<CheckoutSummary
					ingredients={this.state.ingredients}
					checkoutCancelHandler={this.checkoutCancelHandler}
					checkoutContinueHanler={this.checkoutContinueHanler}
				/>
				<Route
					path={this.props.match.url + "/contact-data"}
					render={() => (
						<ContactData
							ingredients={this.state.ingredients}
							totalPrice={this.state.totalPrice}
						/>
					)}
				/>
			</div>
		);
	}
}

export default Checkout;
