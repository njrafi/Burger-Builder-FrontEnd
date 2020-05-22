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
			{controls.map((ctrl, index) => {
				return (
					<BuildControl
						label={ctrl.label}
						key={ctrl.label + index}
						ingredientAdded={() => props.ingredientAdded(ctrl.type)}
						ingredientRemoved={() => props.ingredientRemoved(ctrl.type)}
					/>
				);
			})}
		</div>
	);
};

export default BuildControls;
