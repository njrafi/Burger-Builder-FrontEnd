import React, { Component } from "react";
import Button from "../../../Components/UI/Button/Button";
import styles from "./ContactData.module.css";
import api from "../../../axios-orders";
import { withRouter } from "react-router-dom";
import Input from "../../../Components/UI/Input/Input";
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
				valid: true,
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
				valid: true,
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
				valid: true,
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
				valid: true,
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
				valid: true,
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
			},
		},
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
		if (!process.env.NODE_ENV || process.env.NODE_ENV === "development")
			console.log(updatedOrderForm[formKey]);
		this.setState({
			orderForm: updatedOrderForm,
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
			ingredients: this.props.ingredients,
			price: this.props.totalPrice,
			customer: customerData,
		};

		api()
			.post("/orders.json", order)
			.then((response) => {
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
					<Button buttonType="Success">ORDER</Button>
				</form>
			</div>
		);
	}
}

export default withRouter(ContactData);
