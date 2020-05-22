import React from "react";
import Aux from "../../../hoc/Auxilary";
import Button from "../../UI/Button/Button";

const OrderSummary = (props) => {
	const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
		return (
			<li key={igKey}>
				<span style={{ textTransform: "capitalize" }}>{igKey}</span> :{" "}
				{props.ingredients[igKey]}
			</li>
		);
	});
	return (
		<Aux>
			<h3 style={{ textAlign: "center" }}>Your order</h3>
			<p>A delicious burger with the following ingredients: </p>
			<ul>{ingredientSummary}</ul>
			<p style={{ textAlign: "center" }}>
				<strong>Total Price: {props.price}</strong>
			</p>
			<Button buttonType="Success" onClick={props.continueOrder}>
				Checkout
			</Button>
			<Button onClick={props.cancelOrder} buttonType="Danger">
				Cancel
			</Button>
		</Aux>
	);
};

export default OrderSummary;
