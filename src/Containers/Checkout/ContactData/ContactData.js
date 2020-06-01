import React, { Component } from "react";
import Button from "../../../Components/UI/Button/Button";
import styles from "./ContactData.module.css";
import api from "../../../axios-orders";
import { withRouter } from "react-router-dom";
import Input from "../../../Components/UI/Input/Input";
class ContactData extends Component {
	state = {
		name: "NJ Rafi",
		email: "njrafibd@gmail.com",
		address: {
			street: "27 Avoy Das Lane",
			zipCode: 1203,
			country: "Bangladesh",
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
		return (
			<div className={styles.ContactData}>
				<h4> Enter your Contact Data</h4>
				<form>
					<Input type="text" name="name" label="Your Name" />
					<Input type="text" name="email" label="Your email" />
					<Input type="text" name="street" label="Street" />
					<Input type="text" name="zipCode" label="Zip Code" />
					<Button buttonType="Success" onClick={this.orderHandler}>
						ORDER
					</Button>
				</form>
			</div>
		);
	}
}

export default withRouter(ContactData);
