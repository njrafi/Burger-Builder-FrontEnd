import React, { Component } from "react";
import Order from "../../Components/Order/Order";
import Spinner from "../../Components/UI/Spinner/Spinner";
import api from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
class Orders extends Component {
	state = {
		orders: null,
		loading: false,
	};

	componentDidMount() {
		this.setState({
			loading: true,
		});
		api()
			.get("/orders.json")
			.then((response) => {
				let orderArray = [];
				for (let [_, order] of Object.entries(response.data))
					orderArray.push(order);

				console.log(orderArray);
				this.setState({ orders: orderArray, loading: false });
			})
			.catch((err) => {
				console.log(err);
				this.setState({
					loading: false,
				});
			});
	}

	render() {
		if (this.state.loading) {
			return <Spinner />;
		}

		if (this.state.orders == null || this.state.orders.length == 0)
			return <h1> No Orders Found </h1>;

		console.log(this.state.orders);
		const orderComponents = this.state.orders.map((order) => {
			return (
				<Order ingredients={order.ingredients} price={order.price} />
			);
		});
		return <div>{orderComponents}</div>;
	}
}

export default withErrorHandler(Orders, api);
