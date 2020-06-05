import React, { Component } from "react";
import Button from "../../../Components/UI/Button/Button";
import styles from "./ContactData.module.css";
import api from "../../../axios-orders";
import { withRouter } from "react-router-dom";
import Input from "../../../Components/UI/Input/Input";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/actions";
class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Name",
				},
				value: "",
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			email: {
				elementType: "input",
				elementConfig: {
					type: "email",
					placeholder: "Email",
				},
				value: "",
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			street: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Street",
				},
				value: "",
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			zipcode: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "ZIP Code",
				},
				value: "",
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5,
				},
				errorMessage: "ZIP Code Length Must be 5",
				valid: false,
				touched: false,
			},
			country: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Country",
				},
				value: "",
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			deliveryMethod: {
				elementType: "select",
				elementConfig: {
					options: [
						{ value: "fastest", displayValue: "Fastest" },
						{ value: "cheapest", displayValue: "Cheapest" },
					],
				},
				value: "fastest",
				valid: true,
				touched: false,
			},
		},
		formIsValid: false,
		loading: false,
	};

	checkValidity(value, rules) {
		let isValid = true;
		if (!rules) return isValid;

		if (rules.required) isValid = value.trim() !== "" && isValid;
		if (rules.minLength)
			isValid = value.trim().length >= rules.minLength && isValid;
		if (rules.maxLength)
			isValid = value.trim().length <= rules.maxLength && isValid;

		return isValid;
	}

	inputChangeHandler = (value, formKey) => {
		console.log(value, formKey);
		const updatedOrderForm = { ...this.state.orderForm };
		updatedOrderForm[formKey].value = value;
		updatedOrderForm[formKey].valid = this.checkValidity(
			value,
			updatedOrderForm[formKey].validation
		);
		updatedOrderForm[formKey].touched = true;
		let formIsValid = true;
		for (let key in updatedOrderForm)
			formIsValid = formIsValid && updatedOrderForm[key].valid;

		if (!process.env.NODE_ENV || process.env.NODE_ENV === "development")
			console.log(updatedOrderForm[formKey]);
		this.setState({
			orderForm: updatedOrderForm,
			formIsValid: formIsValid,
		});
	};

	orderHandler = (event) => {
		console.log("Order Submitted to web");
		event.preventDefault();
		this.setState({
			loading: true,
		});

		let customerData = {};
		for (let formKey in this.state.orderForm)
			customerData[formKey] = this.state.orderForm[formKey].value;

		const order = {
			ingredients: this.props.burger.ingredients,
			price: this.props.burger.totalPrice,
			customer: customerData,
		};

		api()
			.post("/orders.json", order)
			.then((response) => {
				this.props.updateBurger(null, 4);
				this.props.history.replace("/");
			})
			.catch((err) => {
				console.log(err);
				this.props.history.replace("/");
			});
	};

	render() {
		const formElementsArray = [];
		for (let key in this.state.orderForm)
			formElementsArray.push(
				<Input
					{...this.state.orderForm[key]}
					key={key}
					changed={(event) => this.inputChangeHandler(event.target.value, key)}
				/>
			);
		return (
			<div className={styles.ContactData}>
				<h4> Enter your Contact Data</h4>
				<form onSubmit={this.orderHandler}>
					{formElementsArray}
					<Button buttonType="Success" disabled={!this.state.formIsValid}>
						ORDER
					</Button>
				</form>
			</div>
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
)(withRouter(ContactData));
