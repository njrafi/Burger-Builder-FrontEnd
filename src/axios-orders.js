import axios from "axios";
import { loadProgressBar } from "axios-progress-bar";

let axiosInstance;

const api = () => {
    console.log(process.env.REACT_APP_API_ENDPOINT)
	if (axiosInstance == null) {
		axiosInstance = axios.create({
			baseURL: process.env.REACT_APP_API_ENDPOINT,
		});

		loadProgressBar(null, axiosInstance);
	}
	return axiosInstance;
};

export default api;
