import React from "react";
import styles from "./Toolbal.module.css";
import Logo from "../../Logo/Logo";

const Toolbar = (props) => {
	return (
		<header className={styles.Toolbar}>
			<div>MENU</div>
			<Logo />
			<nav>....</nav>
		</header>
	);
};

export default Toolbar;
