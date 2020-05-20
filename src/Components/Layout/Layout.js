import React from "react";
import Aux from "../../hoc/Auxilary";
import styles from "./Layout.module.css";

const Layout = (props) => {
	return (
		<Aux>
			<div>Toolbar, SideDrawer, Backdrop</div>
			<main className={styles.Content}>{props.children}</main>
		</Aux>
	);
};

export default Layout;
