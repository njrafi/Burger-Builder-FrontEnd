import React from "react";
import Aux from "../../hoc/Auxilary";
import styles from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";

const Layout = (props) => {
	return (
		<Aux>
			<Toolbar />
			<main className={styles.Content}>{props.children}</main>
		</Aux>
	);
};

export default Layout;
