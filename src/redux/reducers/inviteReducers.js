import {
	ACCEPT_TEAM_INVITE_REQUEST,
	ACCEPT_TEAM_INVITE_SUCCESS,
	ACCEPT_TEAM_INVITE_FAIL,
	MY_TEAM_INVITES_SUCCESS,
	MY_TEAM_INVITES_FAIL,
	CLEAR_ERRORS,
} from "../constants/inviteConstants";

// Accept team invite reducer
export const acceptTeamInviteReducer = (state = {}, action) => {
	switch (action.type) {
		case ACCEPT_TEAM_INVITE_REQUEST:
			return {
				loading: true,
			};
		case ACCEPT_TEAM_INVITE_SUCCESS:
			return {
				loading: false,
				success: true,
				team: action.payload.team,
			};
		case ACCEPT_TEAM_INVITE_FAIL:
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

// My team invites reducer
export const myTeamInvitesReducer = (state = { invites: [] }, action) => {
	switch (action.type) {
		case MY_TEAM_INVITES_SUCCESS:
			return {
				invites: action.payload.invites,
			};
		case MY_TEAM_INVITES_FAIL:
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
