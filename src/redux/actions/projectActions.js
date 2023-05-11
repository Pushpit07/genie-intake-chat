import axios from "axios";
import {
	CREATE_PROJECT_REQUEST,
	CREATE_PROJECT_SUCCESS,
	CREATE_PROJECT_FAIL,
	GET_PROJECT_REQUEST,
	GET_PROJECT_SUCCESS,
	GET_PROJECT_FAIL,
	UPDATE_PROJECT_REQUEST,
	UPDATE_PROJECT_SUCCESS,
	UPDATE_PROJECT_RESET,
	UPDATE_PROJECT_FAIL,
	DELETE_PROJECT_REQUEST,
	DELETE_PROJECT_SUCCESS,
	DELETE_PROJECT_RESET,
	DELETE_PROJECT_FAIL,
	CLEAR_ERRORS,
} from "../constants/projectConstants";

// Create project
export const createProject = (body) => async (dispatch) => {
	try {
		dispatch({ type: CREATE_PROJECT_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.post(`/api/project`, body, config);

		dispatch({ type: CREATE_PROJECT_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: CREATE_PROJECT_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Get project
export const getProject = (id) => async (dispatch) => {
	try {
		dispatch({ type: GET_PROJECT_REQUEST });

		const { data } = await axios.get(`/api/project/${id}`);

		dispatch({
			type: GET_PROJECT_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: GET_PROJECT_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Update project
export const updateProject = (id, body) => async (dispatch) => {
	try {
		dispatch({ type: UPDATE_PROJECT_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.put(`/api/project/${id}`, body, config);

		dispatch({
			type: UPDATE_PROJECT_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: UPDATE_PROJECT_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Delete project
export const deleteProject = (id) => async (dispatch) => {
	try {
		dispatch({ type: DELETE_PROJECT_REQUEST });

		const { data } = await axios.delete(`/api/project/${id}`);

		dispatch({ type: DELETE_PROJECT_SUCCESS, payload: data.success });
	} catch (error) {
		dispatch({
			type: DELETE_PROJECT_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Clear errors
export const clearErrors = () => async (dispatch) => {
	dispatch({
		type: CLEAR_ERRORS,
	});
};
