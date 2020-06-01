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
			},
			email: {
				elementType: "input",
				elementConfig: {
					type: "email",
					placeholder: "Email",
				},
				value: "",
			},
			street: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Street",
				},
				value: "",
			},
			zipcode: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "ZIP Code",
				},
				value: "",
			},
			country: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Country",
				},
				value: "",
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
			},
		},
		loading: false,
	};

	inputChangeHandler = (value, formKey) => {
		// console.log(event);
		// console.log(event.target.type);
		console.log(value, formKey);
		const updatedOrderForm = { ...this.state.orderForm };
		updatedOrderForm[formKey].value = value;
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
