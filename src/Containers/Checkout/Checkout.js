import React, { Component } from "react";
import { Route } from "react-router-dom";
import CheckoutSummary from "../../Components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";
class Checkout extends Component {
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
					ingredients={this.props.burger.ingredients}
					checkoutCancelHandler={this.checkoutCancelHandler}
					checkoutContinueHanler={this.checkoutContinueHanler}
				/>
				<Route
					path={this.props.match.url + "/contact-data"}
					render={() => <ContactData />}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		burger: state.burger,
	};
};

export default connect(mapStateToProps, null)(Checkout);
