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

// Create project reducer
export const createProjectReducer = (state = {}, action) => {
	switch (action.type) {
		case CREATE_PROJECT_REQUEST:
			return {
				loading: true,
			};
		case CREATE_PROJECT_SUCCESS:
			return {
				loading: false,
				success: true,
				project: action.payload.project,
			};
		case CREATE_PROJECT_FAIL:
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

// Get project reducer
export const getProjectReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_PROJECT_REQUEST:
			return {
				loading: true,
			};
		case GET_PROJECT_SUCCESS:
			return {
				loading: false,
				success: true,
				project: action.payload.project,
			};
		case GET_PROJECT_FAIL:
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

// Update project reducer
export const updateProjectReducer = (state = {}, action) => {
	switch (action.type) {
		case UPDATE_PROJECT_REQUEST:
			return {
				loading: true,
			};
		case UPDATE_PROJECT_SUCCESS:
			return {
				loading: false,
				isUpdated: action.payload,
			};
		case UPDATE_PROJECT_RESET:
			return {
				loading: false,
				isUpdated: false,
			};
		case UPDATE_PROJECT_FAIL:
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

// Delete project reducer
export const deleteProjectReducer = (state = {}, action) => {
	switch (action.type) {
		case DELETE_PROJECT_REQUEST:
			return {
				loading: true,
			};
		case DELETE_PROJECT_SUCCESS:
			return {
				loading: false,
				isDeleted: action.payload,
			};
		case DELETE_PROJECT_RESET:
			return {
				loading: false,
				isDeleted: false,
			};
		case DELETE_PROJECT_FAIL:
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
