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

// Create team reducer
export const createTeamReducer = (state = {}, action) => {
	switch (action.type) {
		case CREATE_TEAM_REQUEST:
			return {
				loading: true,
			};
		case CREATE_TEAM_SUCCESS:
			return {
				loading: false,
				success: true,
				team: action.payload.team,
			};
		case CREATE_TEAM_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

// Get team reducer
export const getTeamReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_TEAM_REQUEST:
			return {
				loading: true,
			};
		case GET_TEAM_SUCCESS:
			return {
				loading: false,
				success: true,
				team: action.payload.team,
			};
		case GET_TEAM_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

// Update team reducer
export const updateTeamReducer = (state = {}, action) => {
	switch (action.type) {
		case UPDATE_TEAM_REQUEST:
			return {
				loading: true,
			};
		case UPDATE_TEAM_SUCCESS:
			return {
				loading: false,
				isUpdated: action.payload,
			};
		case UPDATE_TEAM_RESET:
			return {
				loading: false,
				isUpdated: false,
			};
		case UPDATE_TEAM_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

// Delete team reducer
export const deleteTeamReducer = (state = {}, action) => {
	switch (action.type) {
		case DELETE_TEAM_REQUEST:
			return {
				loading: true,
			};
		case DELETE_TEAM_SUCCESS:
			return {
				loading: false,
				isDeleted: action.payload,
			};
		case DELETE_TEAM_RESET:
			return {
				loading: false,
				isDeleted: false,
			};
		case DELETE_TEAM_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

// My teams reducer
export const myTeamsReducer = (state = { teams: [] }, action) => {
	switch (action.type) {
		case MY_TEAMS_SUCCESS:
			return {
				teams: action.payload.teams,
			};
		case MY_TEAMS_FAIL:
			return {
				error: action.payload,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};
