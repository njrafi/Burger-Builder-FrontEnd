import React from "react";
import styles from "./BuildControl.module.css";

const BuildControl = (props) => {
	return (
		<div className={styles.BuildControl}>
			<button
				className={styles.Less}
				onClick={props.ingredientRemoved}
				disabled={props.disabled}
			>
				Less
			</button>
			<div className={styles.Label}>{props.label}</div>
			<button className={styles.More} onClick={props.ingredientAdded}>
				More
			</button>
		</div>
	);
};

export default BuildControl;
