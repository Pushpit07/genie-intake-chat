import { useState, useEffect, createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyTeams } from "@/redux/actions/teamActions";

const defaultState = "";

const defaultContext = {
	teams: [],
	currentTeam: defaultState,
	setCurrentTeam: () => {},
};
export const TeamContext = createContext(defaultContext);

function TeamContextProvider({ children }) {
	const [currentTeam, setCurrentTeam] = useState(defaultState);
	const { teams } = useSelector((state) => state.myTeams);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getMyTeams());
	}, [dispatch]);

	useEffect(() => {
		if (teams && teams[0]) {
			console.log(teams);
			const storedTeamId = localStorage.getItem("selectedTeam");

			if (storedTeamId) {
				const team = teams.find((team) => team._id === storedTeamId);
				const teamIndex = teams.findIndex((team) => team._id === storedTeamId);
				if (teamIndex !== -1) {
					teams.splice(teamIndex, 1);
					teams.unshift(team);
				}
				setCurrentTeam(team);
				return;
			}
			setCurrentTeam(teams[0]);
			localStorage.setItem("selectedTeam", teams[0]._id);
		}
	}, [teams]);

	const onCurrentTeamChange = (e) => {
		const selectedIndex = e.target.options[e.target.selectedIndex].dataset.index;
		setCurrentTeam(teams[selectedIndex]);
		localStorage.setItem("selectedTeam", teams[selectedIndex]._id);

		const otherSelect = e.target.id === "teams" ? document.getElementById("sidebarTeams") : document.getElementById("teams");
		if (otherSelect) otherSelect.value = teams[selectedIndex].name;
	};

	return <TeamContext.Provider value={{ teams, currentTeam, setCurrentTeam, onCurrentTeamChange }}>{children}</TeamContext.Provider>;
}

export default TeamContextProvider;
