import React, { Component } from "react";
import Button from "../../../Components/UI/Button/Button";
import styles from "./ContactData.module.css";

class ContactData extends Component {
	state = {
		name: "NJ Rafi",
		email: "njrafibd@gmail.com",
		address: {
			street: "27 Avoy Das Lane",
			zipCode: 1203,
			country: "Bangladesh",
		},
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
					<Button buttonType="Success">ORDER</Button>
				</form>
			</div>
		);
	}
}

export default ContactData;
