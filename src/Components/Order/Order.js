import React from "react";
import styles from "./Order.module.css";

const Order = (props) => {
	let ingredients = [];
	for (let ingredientName in props.ingredients)
		ingredients.push({
			name: ingredientName,
			amount: props.ingredients[ingredientName],
		});

	const ingredientOutput = ingredients.map((ingredient) => {
		return (
			<span
				style={{
					textTransform: "capitalize",
					display: "inline-block",
					margin: "0 8px",
					border: "1px solid #ccc",
					padding: "5px",
				}}
			>
				{ingredient.name} ({ingredient.amount})
			</span>
		);
	});
	return (
		<div className={styles.Order}>
			<p>Ingredients: {ingredientOutput}</p>
			<p>
				Price: <strong>{props.price.toFixed(2)} $</strong>
			</p>
		</div>
	);
};
export default Order;
