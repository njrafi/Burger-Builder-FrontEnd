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
			Country: {
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

	orderHandler = (event) => {
		event.preventDefault();
		this.setState({
			loading: true,
		});
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.totalPrice,
			customer: {
				name: this.state.orderForm.name.value,
				email: this.state.orderForm.email.value,
				address: {
					street: this.state.orderForm.street.value,
					zipCode: this.state.orderForm.zipCode.value,
					country: this.state.orderForm.country.value,
				},
			},
			deliveryMethod: this.state.orderForm.deliveryMethod.value,
		};

		api()
			.post("/orders.json", order)
			.then((response) => {
				this.props.history.replace("/");
			})
			.catch((err) => {
				this.props.history.replace("/");
			});
	};

	render() {
		const formElementsArray = [];
		for (let key in this.state.orderForm)
			formElementsArray.push(
				<Input {...this.state.orderForm[key]} key={key} />
			);
		return (
			<div className={styles.ContactData}>
				<h4> Enter your Contact Data</h4>
				<form>
					{formElementsArray}
					<Button buttonType="Success" onClick={this.orderHandler}>
						ORDER
					</Button>
				</form>
			</div>
		);
	}
}

export default withRouter(ContactData);
