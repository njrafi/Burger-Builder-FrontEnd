import React from "react";
import styles from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
	{
		label: "Salad",
		type: "salad",
	},
	{
		label: "Bacon",
		type: "bacon",
	},
	{
		label: "Cheese",
		type: "cheese",
	},
	{
		label: "Meat",
		type: "meat",
	},
];
const BuildControls = (props) => {
	return (
		<div className={styles.BuildControls}>
			<p>
				Current Price: <strong>{props.price.toFixed(2)} $</strong>
			</p>
			{controls.map((ctrl, index) => {
				return (
					<BuildControl
						label={ctrl.label}
						key={ctrl.label + index}
						ingredientAdded={() => props.ingredientAdded(ctrl.type)}
						ingredientRemoved={() => props.ingredientRemoved(ctrl.type)}
						disabled={props.disabled[ctrl.type]}
					/>
				);
			})}
		</div>
	);
};

export default BuildControls;
