import React from "react";
import NavigationItems from "../NavigationItems/NavigationItems";
import Logo from "../../Logo/Logo";
import styles from "./SideDrawer.module.css";
import Aux from "../../../hoc/Auxilary";
import Backdrop from "../../UI/Backdrop/Backdrop";

const SideDrawer = (props) => {
	let attachedClasses = [styles.SideDrawer, styles.Close];
	if (props.open) {
		attachedClasses = [styles.SideDrawer, styles.Open];
	}
	return (
		<Aux>
			<Backdrop show={props.open} clicked={props.closed} />
			<div className={attachedClasses.join(" ")}>
				<div className={styles.Logo}>
					<Logo />
				</div>
				<nav>
					<NavigationItems />
				</nav>
			</div>
		</Aux>
	);
};

export default SideDrawer;
