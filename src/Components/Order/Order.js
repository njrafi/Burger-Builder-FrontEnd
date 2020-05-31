import React from "react";
import styles from "./Order.module.css";

const Order = (props) => {
	return (
		<div className={styles.Order}>
			<p>
				Ingredients: Salad({props.ingredients.salad}) Cheese(
				{props.ingredients.cheese}) Meat({props.ingredients.meat}) Bacon(
				{props.ingredients.bacon})
			</p>
			<p>
				Price: <strong>{props.price.toFixed(2)} $</strong>
			</p>
		</div>
	);
};
export default Order;
