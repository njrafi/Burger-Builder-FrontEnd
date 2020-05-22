import React from "react";
import burgerLogo from "../../Assets/images/burger-logo.png";
import styles from "./Logo.module.css";
const Logo = (props) => {
	return (
		<div className={styles.Logo}>
			<img src={burgerLogo} alt="MyBurger"></img>
		</div>
	);
};

export default Logo;
