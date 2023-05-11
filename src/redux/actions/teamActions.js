import axios from "axios";
import absoluteUrl from "next-absolute-url";
import {
	CREATE_TEAM_REQUEST,
	CREATE_TEAM_SUCCESS,
	CREATE_TEAM_FAIL,
	GET_TEAM_REQUEST,
	GET_TEAM_SUCCESS,
	GET_TEAM_FAIL,
	UPDATE_TEAM_REQUEST,
	UPDATE_TEAM_SUCCESS,
	UPDATE_TEAM_RESET,
	UPDATE_TEAM_FAIL,
	DELETE_TEAM_REQUEST,
	DELETE_TEAM_SUCCESS,
	DELETE_TEAM_RESET,
	DELETE_TEAM_FAIL,
	MY_TEAMS_SUCCESS,
	MY_TEAMS_FAIL,
	CLEAR_ERRORS,
} from "../constants/teamConstants";

// Create team
export const createTeam = (body) => async (dispatch) => {
	try {
		dispatch({ type: CREATE_TEAM_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.post(`/api/team`, body, config);

		dispatch({ type: CREATE_TEAM_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: CREATE_TEAM_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Get team
export const getTeam = (id) => async (dispatch) => {
	try {
		dispatch({ type: GET_TEAM_REQUEST });

		const { data } = await axios.get(`/api/team/${id}`);

		dispatch({
			type: GET_TEAM_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: GET_TEAM_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Update team
export const updateTeam = (id, body) => async (dispatch) => {
	try {
		dispatch({ type: UPDATE_TEAM_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.put(`/api/team/${id}`, body, config);

		dispatch({
			type: UPDATE_TEAM_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: UPDATE_TEAM_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Delete team
export const deleteTeam = (id) => async (dispatch) => {
	try {
		dispatch({ type: DELETE_TEAM_REQUEST });

		const { data } = await axios.delete(`/api/team/${id}`);

		dispatch({ type: DELETE_TEAM_SUCCESS, payload: data.success });
	} catch (error) {
		dispatch({
			type: DELETE_TEAM_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Get my teams
export const getMyTeams = () => async (dispatch) => {
	try {
		const { data } = await axios.get(`/api/team`);

		dispatch({
			type: MY_TEAMS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: MY_TEAMS_FAIL,
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
