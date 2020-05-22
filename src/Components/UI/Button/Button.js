import React from "react";
import styles from "./Button.module.css";

const Button = (props) => {
	return (
		<button
			className={[styles.Button, styles[props.buttonType]].join(" ")}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
};

export default Button;
