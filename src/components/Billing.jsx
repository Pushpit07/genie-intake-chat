import Button from "@/components/ui/Button";
import axios from "axios";
import { useContext } from "react";
import { useRouter } from "next/router";
import { StatusContext } from "@/store/StatusContextProvider";
import { LoadingContext } from "@/store/LoadingContextProvider";
import { TeamContext } from "@/store/TeamContextProvider";
import { freePlan, product_name } from "@/config/constants";
import { getSubscriptionPlanName, getCurrentSubscriptionTier } from "@/utils/Helpers";
import Pricing from "@/components/Pricing";

export default function Dashboard() {
	const { setError } = useContext(StatusContext);
	const { setLoading } = useContext(LoadingContext);
	const router = useRouter();

	const { currentTeam } = useContext(TeamContext);
	const subscriptionPlan = getCurrentSubscriptionTier(currentTeam?.subscription);

	const manageSubscription = async () => {
		setLoading({ status: true, title: "Please wait for a moment..." });

		try {
			const { data } = await axios.post(`/api/stripe/create-portal-session`);
			router.push(data.portalSessionUrl);
		} catch (error) {
			console.error("Portal session error:", error);
			setLoading({ status: false });
			setError({
				title: "Something went wrong",
				message: error.message,
				showErrorBox: true,
			});
		}
	};

	return (
		<div>
			<h1 className="font-semibold text-4xl">Billing</h1>

			{getSubscriptionPlanName(subscriptionPlan) !== freePlan ? (
				<div className="flex flex-col mt-8">
					<div className="flex flex-col items-center justify-center text-center">
						<span className="font-semibold">
							Your team ({currentTeam?.name}) is subscribed to the {getSubscriptionPlanName(subscriptionPlan)} plan.
						</span>
						<span>
							You can manage the subscription by clicking on the button below. The billing email is:{" "}
							{currentTeam?.subscription?.billingUser?.email}
						</span>
					</div>

					<div className="w-full flex justify-center mt-6">
						<div className="flex tems-center justify-center">
							<Button type="button" onClick={manageSubscription}>
								Manage Subscription
							</Button>
						</div>
					</div>
				</div>
			) : (
				<div className="flex flex-col mt-8">
					<div className="flex flex-col items-center justify-center text-center">
						<span className="font-semibold">
							Get a plan for your team ({currentTeam?.name}) to access the full potential of {product_name}
						</span>
					</div>
				</div>
			)}

			<Pricing manageSubscription={manageSubscription} />
		</div>
	);
}
