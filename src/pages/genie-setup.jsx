import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { StatusContext } from "@/store/StatusContextProvider";
import { LoadingContext } from "@/store/LoadingContextProvider";
import { createTeam, clearErrors } from "@/redux/actions/teamActions";
import { sleep } from "@/utils/Sleep";
import Head from "next/head";
import { title_main_page, meta_description } from "@/config/constants";
import ScrollToPageTop from "@/utils/ScrollToPageTop";
import Sidebar from "@/components/GenieSetup/Sidebar";
import ConnectTwitter from "@/components/GenieSetup/ConnectTwitter";
import NameDetails from "@/components/GenieSetup/NameDetails";
import AddPersonality from "@/components/GenieSetup/AddPersonality";
import AddInterests from "@/components/GenieSetup/AddInterests";
import FinishSetup from "@/components/GenieSetup/FinishSetup";
import ActionButtons from "@/components/GenieSetup/ActionButtons";

export default function CreateTeam() {
	const router = useRouter();

	const [step, setStep] = useState(parseInt(router.query.step) || 1);
	const lastStep = 5;
	const [pageTitle, setPageTitle] = useState("Connect Twitter");

	useEffect(() => {
		if (step == 1) {
			router.replace("/genie-setup?step=1");
			setPageTitle("Connect Twitter");
		} else if (step == 2) {
			router.replace("/genie-setup?step=2");
			setPageTitle("Enter your name");
		} else if (step == 3) {
			router.replace("/genie-setup?step=3");
			setPageTitle("Add Personality");
		} else if (step == 4) {
			router.replace("/genie-setup?step=4");
			setPageTitle("Add Interests");
		} else if (step == 5) {
			router.replace("/genie-setup?step=5");
			setPageTitle("Finish setup");
		}
	}, [step]);

	// Continue to next step
	const nextStep = () => {
		setStep((currStep) => currStep + 1);
	};

	// Revert to previous step
	const prevStep = () => {
		if (step == 1) return;
		setStep((currStep) => currStep - 1);
	};

	// Form values
	const [formValues, setFormValues] = useState({ name: "", collaborators: [{ email: "" }] });
	const onFieldChange = (e) => {
		if (e.target.name.includes("collaborators")) {
			const index = parseInt(e.target.name.replace("collaborators", ""));
			setFormValues({
				...formValues,
				collaborators: [...formValues.collaborators.slice(0, index), { email: e.target.value }, ...formValues.collaborators.slice(index + 1)],
			});
		} else {
			setFormValues({ ...formValues, [e.target.name]: e.target.value });
		}
	};

	const addCollaborator = () => {
		setFormValues({
			...formValues,
			collaborators: [...formValues.collaborators, { email: "" }],
		});
	};

	const dispatch = useDispatch();
	const { setSuccess, setError } = useContext(StatusContext);
	const { setLoading } = useContext(LoadingContext);
	const { success, error, team } = useSelector((state) => state.createTeam);

	useEffect(() => {
		if (success && team) {
			setSuccess((prevState) => ({
				...prevState,
				title: "Team created",
				message: "You will now be redirected to your team page",
				showSuccessBox: true,
			}));
			localStorage.removeItem("selectedTeam");
			sleep(2000).then(() => {
				router.push(`/settings`);
			});
			return;
		}
		if (error) {
			setLoading({ status: false });
			setError({
				title: "Something went wrong",
				message: error,
				showErrorBox: true,
			});
			dispatch(clearErrors());
		}
	}, [dispatch, error, success]);

	const submitHandler = () => {
		setLoading({ status: true });
		dispatch(createTeam(formValues));
	};

	const step1Values = { formValues, onFieldChange };
	const step2Values = { formValues, onFieldChange, addCollaborator };
	const step3Values = {};

	const webpageTitle = `${pageTitle} | ${title_main_page}`;
	return (
		<>
			<Head>
				<title>{webpageTitle}</title>
				<meta name="description" content={meta_description} />
			</Head>
			<ScrollToPageTop samePage={true} changingValue={step} />

			<main className="flex flex-col items-center justify-center w-full bg-midnight-900">
				<div className="w-full max-w-[1920px] flex justify-center items-start">
					<div className="relative w-full h-full flex flex-col md:flex-row">
						<Sidebar step={step} setStep={setStep} />

						<form
							onSubmit={(e) => {
								e.preventDefault();
								if (step == lastStep) submitHandler();
								else nextStep();
							}}
							className="basis-full md:basis-4/5 flex flex-col pt-32 pb-24 md:px-24 px-8 gap-y-6 bg-midnight-900 min-h-screen"
						>
							{step == 1 ? (
								<ConnectTwitter {...step1Values} />
							) : step == 2 ? (
								<NameDetails {...step1Values} />
							) : step == 3 ? (
								<AddPersonality {...step2Values} />
							) : step == 4 ? (
								<AddInterests {...step2Values} />
							) : (
								<FinishSetup {...step3Values} />
							)}

							<ActionButtons step={step} lastStep={lastStep} prevStep={prevStep} />
						</form>
					</div>
				</div>
			</main>
		</>
	);
}
