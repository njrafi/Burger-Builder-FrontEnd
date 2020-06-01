import React, { Component } from "react";
import Auxilary from "../Auxilary";
import Modal from "../../Components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		state = {
			error: null,
		};

		componentWillMount() {
			this.requestInterceptor = axios.interceptors.request.use((req) => {
				this.setState({ error: null });
				return req;
			});
			this.responseInterceptor = axios.interceptors.response.use(
				(res) => res,
				(error) => {
					console.log(error);
					this.setState({ error: error });
					return Promise.reject(error);
				}
			);
		}

		componentWillUnmount() {
			axios.interceptors.request.eject(this.requestInterceptor);
			axios.interceptors.response.eject(this.responseInterceptor);
		}

		errorConfirmedHandler = () => {
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
