import React, { Component } from "react";
import styles from "./Order.module.css";

const Order = (props) => {
	return (
		<div className={styles.Order}>
			<p>Ingredients: Salad(0) Cheese(0) Meat(0) Bacon(0)</p>
			<p>
				Price: <strong>100 teka</strong>
			</p>
		</div>
	);
};
export default Order;
