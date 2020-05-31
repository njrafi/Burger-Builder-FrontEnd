import axios from "axios";
import { loadProgressBar } from "axios-progress-bar";

let axiosInstance;

const api = () => {
	if (axiosInstance == null) {
		axiosInstance = axios.create({
			baseURL: process.env.REACT_APP_FIREBASE_URL,
		});
		loadProgressBar(null, axiosInstance);
	}
	return axiosInstance;
};

export default api;
