import React from "react";
import styles from "./NavigationItem.module.css";
import { NavLink } from "react-router-dom";

const NavigationItem = (props) => {
	return (
		<li className={styles.NavigationItem}>
			{/* <a href={props.link} className={props.active ? styles.active : null}>
				{props.children}
			</a> */}
			<NavLink to={props.link} exact activeClassName={styles.active}>
				{props.children}
			</NavLink>
		</li>
	);
};
export default NavigationItem;
