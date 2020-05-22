import React from "react";
import styles from "./DrawerToggle.module.css";

const DrawerToggle = (props) => {
	return (
		<div className={styles.DrawerToggle} onClick={props.onClick}>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
};

export default DrawerToggle;
