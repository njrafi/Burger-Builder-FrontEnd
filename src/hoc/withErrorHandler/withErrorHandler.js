import React, { Component } from "react";
import Auxilary from "../Auxilary";
import Modal from "../../Components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, api) => {
	return class extends Component {
		state = {
			error: null,
		};

		componentDidMount() {
			api().interceptors.request.use((req) => {
				this.setState({ error: null });
				return req;
			});
			api().interceptors.response.use(
				(res) => res,
				(error) => {
					this.setState({ error: error });
					return Promise.reject(error);
				}
			);
		}

		componentWillUnmount() {
			api().interceptors.request.eject(this.requestInterceptor);
			api().interceptors.response.eject(this.responseInterceptor);
		}

		errorConfirmedHandler = () => {
			console.log("error confirm handler called");
			this.setState({ error: null });
		};

		render() {
			return (
				<Auxilary>
					<Modal
						show={this.state.error}
						modalClosed={this.errorConfirmedHandler}
					>
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<WrappedComponent {...this.props} />
				</Auxilary>
			);
		}
	};
};

export default withErrorHandler;
