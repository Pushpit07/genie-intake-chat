import { combineReducers } from "redux";
import { authReducer, userReducer, loadedUserReducer, forgotPasswordReducer, adminGetAllUsersReducer, adminGetUserDetailsReducer } from "./userReducers";
import { createTeamReducer, getTeamReducer, updateTeamReducer, deleteTeamReducer, myTeamsReducer } from "./teamReducers";
import { acceptTeamInviteReducer, myTeamInvitesReducer } from "./inviteReducers";
import { createProjectReducer, getProjectReducer, updateProjectReducer, deleteProjectReducer } from "./projectReducers";

const reducer = combineReducers({
	auth: authReducer,
	user: userReducer,
	loadedUser: loadedUserReducer,
	allUsers: adminGetAllUsersReducer,
	userDetails: adminGetUserDetailsReducer,
	forgotPassword: forgotPasswordReducer,
	// team
	createTeam: createTeamReducer,
	getTeam: getTeamReducer,
	updateTeam: updateTeamReducer,
	deleteTeam: deleteTeamReducer,
	myTeams: myTeamsReducer,
	// invites
	acceptTeamInvite: acceptTeamInviteReducer,
	myTeamInvites: myTeamInvitesReducer,
	// project
	createProject: createProjectReducer,
	getProject: getProjectReducer,
	updateProject: updateProjectReducer,
	deleteProject: deleteProjectReducer,
});

export default reducer;
