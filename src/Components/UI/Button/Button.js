import React from "react";
import styles from "./Button.module.css";

const Button = (props) => {
	console.log("in button");
	console.log([styles.Button, styles[props.buttonType]].join(" "));
	console.log([styles.Button, styles[props.buttonType]]);
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
