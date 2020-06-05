import * as actionTypes from "../actions";

const initialState = {
	ingredients: null,
	totalPrice: 4.0,
};

const burger = (state = initialState, action) => {
	const newState = { ...state };
	switch (action.type) {
		case actionTypes.UPDATE_BURGER:
			newState.ingredients = action.ingredients;
			newState.totalPrice = action.totalPrice;
			break;
		default:
			console.log("default action in burger reducer");
	}
	return newState;
};

export default burger;
