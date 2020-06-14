import React from "react";
import styles from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";
import { connect } from "react-redux";

const BuildControls = (props) => {
	let buildControls = null;
	if (props.burger.ingredients) {
		buildControls = Object.keys(props.burger.ingredients).map(
			(ingredient, index) => {
				return (
					<BuildControl
						label={ingredient}
						key={ingredient + index}
						ingredientAdded={() => props.ingredientAdded(ingredient)}
						ingredientRemoved={() => props.ingredientRemoved(ingredient)}
						disabled={props.disabled[ingredient]}
					/>
				);
			}
		);
	}

	return (
		<div className={styles.BuildControls}>
			<p>
				Current Price: <strong>{props.burger.totalPrice.toFixed(2)} $</strong>
			</p>
			{buildControls}
			<button
				className={styles.OrderButton}
				disabled={!props.purchasable}
				onClick={props.ordered}
			>
				Order Now
			</button>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		burger: state.burger,
	};
};

export default connect(mapStateToProps, null)(BuildControls);
