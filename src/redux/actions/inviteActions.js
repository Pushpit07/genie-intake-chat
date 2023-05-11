import axios from "axios";
import absoluteUrl from "next-absolute-url";
import {
	ACCEPT_TEAM_INVITE_REQUEST,
	ACCEPT_TEAM_INVITE_SUCCESS,
	ACCEPT_TEAM_INVITE_FAIL,
	MY_TEAM_INVITES_SUCCESS,
	MY_TEAM_INVITES_FAIL,
	CLEAR_ERRORS,
} from "../constants/inviteConstants";

// Accept team invite
export const acceptTeamInvite = (req, inviteId, teamId) => async (dispatch) => {
	try {
		dispatch({ type: ACCEPT_TEAM_INVITE_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
				cookie: req.headers.cookie,
			},
		};
		const { origin } = absoluteUrl(req);
		const { data } = await axios.post(`${origin}/api/team/accept-invite`, { inviteId, teamId }, config);

		dispatch({ type: ACCEPT_TEAM_INVITE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: ACCEPT_TEAM_INVITE_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Get my team invites
export const getMyTeams = () => async (dispatch) => {
	try {
		const { data } = await axios.get(`/api/team`);

		dispatch({
			type: MY_TEAM_INVITES_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: MY_TEAM_INVITES_FAIL,
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
