import React from "react";
import styles from "./Toolbal.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DraerToggle";

const Toolbar = (props) => {
	return (
		<header className={styles.Toolbar}>
			<DrawerToggle onClick={props.openSideDrawer} />
			<div className={styles.Logo}>
				<Logo />
			</div>
			<nav className={styles.DesktopOnly}>
				<NavigationItems />
			</nav>
		</header>
	);
};

export default Toolbar;
