import { useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Button from "@/components/ui/Button";
import getStripe from "@/utils/getStripe";
import { LoadingContext } from "@/store/LoadingContextProvider";
import { StatusContext } from "@/store/StatusContextProvider";
import { AuthModalContext } from "@/store/AuthModalContextProvider";
import { TeamContext } from "@/store/TeamContextProvider";
import { useSession } from "next-auth/react";
import {
	freePlan,
	proPlanMonthly,
	premiumPlanMonthly,
	proPlanAnnual,
	premiumPlanAnnual,
	freePlanFeatures,
	proPlanFeatures,
	premiumPlanFeatures,
} from "@/config/constants";
import { getSubscriptionPlanName, getSubscriptionPlanPrice, getSubscriptionPlanPriceId, getCurrentSubscriptionTier } from "@/utils/Helpers";
import Pill from "@/components/ui/Pill";
import Tick from "@/components/ui/Tick";
import Cross from "@/components/ui/Cross";

const Pricing = ({ manageSubscription }) => {
	const { setLoading } = useContext(LoadingContext);
	const { setError } = useContext(StatusContext);
	const { currentTeam } = useContext(TeamContext);
	const router = useRouter();

	const { data: session, status } = useSession();
	const { setAuthModalOpen } = useContext(AuthModalContext);

	// Check for which plan the team is subscribed to
	const subscriptionPlan = getCurrentSubscriptionTier(currentTeam?.subscription);

	const buySubscription = async (stripePriceId) => {
		if (status === "authenticated" && session && session.user) {
			if (currentTeam && currentTeam._id) await redirectToCheckout(stripePriceId);
			else router.push("/billing");
		} else {
			setAuthModalOpen(true);
		}
	};

	const redirectToCheckout = async (stripePriceId) => {
		if (status === "authenticated" && session && session.user) {
			setLoading({ status: true, title: "Please wait for a moment..." });

			try {
				const link = `/api/stripe/checkout-session`;
				const { data } = await axios.get(link, { params: { stripePriceId: stripePriceId, teamId: currentTeam._id } });
				const stripe = await getStripe();
				// Redirect to Stripe Checkout
				await stripe.redirectToCheckout({ sessionId: data.id });
				setLoading({ status: false });
			} catch (error) {
				console.error("Checkout error:", error);
				setLoading({ status: false });
				setError({
					title: "Something went wrong",
					message: error.message,
					showErrorBox: true,
				});
			}
		} else {
			setAuthModalOpen(true);
		}
	};

	const [billingPeriod, setBillingPeriod] = useState("monthly");

	return (
		<section>
			<div className="mt-10 flex items-center justify-center">
				<div className="w-fit bg-gray-200 rounded-full p-1">
					<button
						className={`${
							billingPeriod == "monthly" ? "bg-primary-500 text-light-100" : "bg-gray-200 text-gray-700"
						} py-2 px-8 text-sm rounded-full focus:outline-none transition duration-200`}
						onClick={() => setBillingPeriod("monthly")}
					>
						Monthly billing
					</button>
					<button
						className={`${
							billingPeriod == "annual" ? "bg-primary-500 text-light-100" : "bg-gray-200 text-gray-700"
						} py-2 px-8 text-sm rounded-full focus:outline-none transition duration-200`}
						onClick={() => setBillingPeriod("annual")}
					>
						Yearly billing
					</button>
				</div>
			</div>

			<div className="mt-8 lg:mt-8 space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
				<div className="w-full flex flex-col justify-between px-6 py-8 xl:px-8 xl:py-10 mx-auto max-w-lg text-center rounded-lg border shadow border-gray-100 bg-light-100 text-dark-600">
					<div>
						<h3 className="mb-4 text-[26px] font-semibold">{getSubscriptionPlanName(freePlan)}</h3>
						<p className="text-dark-400 text-lg">Best option to get started and try things out.</p>
						<div className="flex justify-center items-baseline mt-8">
							<span className="mr-2 text-5xl font-extrabold">${getSubscriptionPlanPrice(freePlan)}</span>
							<span className="text-dark-400">forever</span>
						</div>

						<ul role="list" className="mt-8 space-y-4 text-left">
							{freePlanFeatures.map((item, idx) => {
								return (
									<li className="flex items-center text-base space-x-3" key={idx}>
										{item.available ? <Tick /> : <Cross />}
										<span>{item.name}</span>
									</li>
								);
							})}
						</ul>
					</div>

					{subscriptionPlan == getSubscriptionPlanName(freePlan) ? (
						<Button
							type="button"
							variant={"secondary"}
							onClick={() => {
								router.push("/settings");
							}}
							classes="text-lg px-8 py-3 mt-8"
						>
							Get Started Now
						</Button>
					) : null}
				</div>

				<div className="w-full flex flex-col justify-between px-6 py-8 xl:px-8 xl:py-10 mx-auto max-w-lg text-center rounded-lg border shadow border-gray-100 bg-light-100 text-dark-600">
					<div>
						<h3 className="mb-4 text-[26px] font-semibold">
							<i className="fa-solid fa-crown text-gradient-pricing-standard mr-2"></i>
							{billingPeriod == "monthly" ? getSubscriptionPlanName(proPlanMonthly) : getSubscriptionPlanName(proPlanAnnual)}
						</h3>
						<p className="text-dark-400 text-lg">Begin transforming your ideas into production-ready websites fast!</p>
						<div className="flex justify-center items-baseline mt-8">
							<span className="mr-2 text-5xl font-extrabold">
								${billingPeriod == "monthly" ? getSubscriptionPlanPrice(proPlanMonthly) : getSubscriptionPlanPrice(proPlanAnnual)}
							</span>
							<span className="text-dark-400">/ {billingPeriod == "monthly" ? "month" : "year"}</span>
						</div>

						<ul role="list" className="mt-8 space-y-4 text-left">
							{proPlanFeatures.map((item, idx) => {
								return (
									<li className="flex items-center text-base space-x-3" key={idx}>
										{item.available ? <Tick /> : <Cross />}
										<span>{item.name}</span>
									</li>
								);
							})}
						</ul>
					</div>

					{(billingPeriod == "monthly" && subscriptionPlan == getSubscriptionPlanName(proPlanMonthly)) ||
					(billingPeriod == "annual" && subscriptionPlan == getSubscriptionPlanName(proPlanAnnual)) ? (
						<Button
							type="button"
							variant={"secondary"}
							onClick={() => {
								if (manageSubscription) manageSubscription();
								else router.push("/settings");
							}}
							classes="text-lg px-8 py-3 mt-8"
						>
							Manage Subscription
						</Button>
					) : subscriptionPlan == getSubscriptionPlanName(freePlan) ? (
						<Button
							type="button"
							variant={"primary"}
							onClick={() => {
								if (billingPeriod == "monthly") buySubscription(getSubscriptionPlanPriceId(proPlanMonthly));
								else buySubscription(getSubscriptionPlanPriceId(proPlanAnnual));
							}}
							classes="text-lg px-8 py-3 mt-8"
						>
							Choose Plan
						</Button>
					) : null}
				</div>

				<div className="w-full flex flex-col justify-between px-6 py-8 xl:px-8 xl:py-10 mx-auto max-w-lg text-center rounded-lg border shadow border-gray-100 bg-light-100 text-dark-600">
					<div className="relative">
						<Pill variant={"tertiary"} classes={"absolute -top-[30px] -right-6 text-xs"} rounded={true}>
							Most Popular
						</Pill>
						<h3 className="mb-4 text-[26px] font-semibold">
							<i className="fa-solid fa-crown text-gradient-pricing-pro mr-2"></i>
							{billingPeriod == "monthly" ? getSubscriptionPlanName(premiumPlanMonthly) : getSubscriptionPlanName(premiumPlanAnnual)}
						</h3>
						<p className="text-dark-400 text-lg">Get all the power you need to launch products at lightning speed!</p>
						<div className="flex justify-center items-baseline mt-8">
							<span className="mr-2 text-5xl font-extrabold">
								${billingPeriod == "monthly" ? getSubscriptionPlanPrice(premiumPlanMonthly) : getSubscriptionPlanPrice(premiumPlanAnnual)}
							</span>
							<span className="text-dark-400">/ {billingPeriod == "monthly" ? "month" : "year"}</span>
						</div>

						<ul role="list" className="mt-8 space-y-4 text-left">
							{premiumPlanFeatures.map((item, idx) => {
								return (
									<li className="flex items-center text-base space-x-3" key={idx}>
										{item.available ? <Tick /> : <Cross />}
										<span>{item.name}</span>
									</li>
								);
							})}
						</ul>
					</div>

					{(billingPeriod == "monthly" && subscriptionPlan == getSubscriptionPlanName(premiumPlanMonthly)) ||
					(billingPeriod == "annual" && subscriptionPlan == getSubscriptionPlanName(premiumPlanAnnual)) ? (
						<Button
							type="button"
							variant={"secondary"}
							onClick={() => {
								if (manageSubscription) manageSubscription();
								else router.push("/settings");
							}}
							classes="text-lg px-8 py-3 mt-8"
						>
							Manage Subscription
						</Button>
					) : subscriptionPlan == getSubscriptionPlanName(freePlan) ? (
						<Button
							type="button"
							variant={"primary"}
							onClick={() => {
								if (billingPeriod == "monthly") buySubscription(getSubscriptionPlanPriceId(premiumPlanMonthly));
								else buySubscription(getSubscriptionPlanPriceId(premiumPlanAnnual));
							}}
							classes="text-lg px-8 py-3 mt-8"
						>
							Choose Plan
						</Button>
					) : null}
				</div>
			</div>
		</section>
	);
};

export default Pricing;
