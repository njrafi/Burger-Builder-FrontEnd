import React from "react";

import styles from "./Input.module.css";

const Input = (props) => {
	let inputElement = null;
	let validationError = null;
	let inputClasses = [styles.InputElement];
	if (!props.valid) {
		inputClasses.push(styles.Invalid);
	}

	if (!props.valid) {
		validationError = (
			<p className={styles.ValidationError}>
				{props.errorMessage
					? props.errorMessage
					: "Please enter a valid Value!"}
			</p>
		);
	}

	switch (props.elementType) {
		case "input":
			inputElement = (
				<input
					className={inputClasses.join(" ")}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			);
			break;
		case "textarea":
			inputElement = (
				<textarea
					className={inputClasses.join(" ")}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			);
			break;
		case "select":
			inputElement = (
				<select
					className={inputClasses.join(" ")}
					value={props.value}
					onChange={props.changed}
				>
					{props.elementConfig.options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.displayValue}
						</option>
					))}
				</select>
			);
			break;
		default:
			inputElement = (
				<input
					className={inputClasses.join(" ")}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			);
	}
	return (
		<div className={styles.Input}>
			{/* <label className={styles.Label}>{props.elementConfig.placeholder}</label> */}
			{inputElement}
			{validationError}
		</div>
	);
};

export default Input;
