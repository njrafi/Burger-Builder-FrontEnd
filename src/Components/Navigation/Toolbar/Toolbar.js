import React from "react";
import styles from "./Toolbal.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";

const Toolbar = (props) => {
	return (
		<header className={styles.Toolbar}>
			<div>MENU</div>
			<Logo />
			<NavigationItems />
		</header>
	);
};

export default Toolbar;
