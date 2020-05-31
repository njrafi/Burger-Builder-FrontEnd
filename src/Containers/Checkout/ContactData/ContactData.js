import React, { Component } from "react";
import Button from "../../../Components/UI/Button/Button";
import styles from "./ContactData.module.css";
import axios from "../../../axios-orders";
import { withRouter } from "react-router-dom";
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

		axios
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
					<input type="text" name="name" placeholder="Your Name" />
					<input type="text" name="email" placeholder="Your email" />
					<input type="text" name="street" placeholder="Street" />
					<input type="text" name="zipCode" placeholder="Zip Code" />
					<Button buttonType="Success" onClick={this.orderHandler}>
						ORDER
					</Button>
				</form>
			</div>
		);
	}
}

export default withRouter(ContactData);
