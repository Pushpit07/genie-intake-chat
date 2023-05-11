/**************************************************************************/
/**************************    Product details   **************************/
/**************************************************************************/
export const product_name = "Genie Intake Chat";
export const product_url = "https://idea2business.xyz";
export const product_website_legal = "https://www.idea2business.xyz";
export const domain = "idea2business.xyz";
export const contact_email = "team@idea2business.xyz";
export const company_name = "Musixverse Technologies Pvt. Ltd.";

export const twitter_url = "https://twitter.com/_idea2business";
export const twitter_handle = "@_idea2business";
export const linkedin_url = "https://www.linkedin.com/company/idea-2-business";

/**************************************************************************/
/**********************    SEO Meta Descriptions   ************************/
/**************************************************************************/
export const title_main_page = "Genie Intake Chat";
export const meta_description = "Get your landing page production ready from day 0.";
export const reportabug_meta_description =
	"Feedback is vital to make our services even better. With a bug reporting form and email, it's easy to report issues you encounter and request enhancements to any services or functionalities on our platform. You'll directly influence the platform's development and help us make it better for you.";
export const contactus_meta_description =
	"Just send us your questions or concerns by filling out the shortest contact form you've ever seen and we will give you the help you need. Start Here.";
export const privacy_meta_description =
	"This Privacy Policy is meant to help you understand what information we collect, why we collect it, and how you can update, manage, export, and delete your information.";
export const cancellation_and_refund_meta_description =
	"This Cancellation and Refund Policy is meant to help you understand the procedure for refunds and cancellation of subscriptions.";

/**************************************************************************/
/**************************    Subscription   *****************************/
/**************************************************************************/
// Replace these values with the values of the latest subscription object
export const freePlan = "Free";
export const proPlanMonthly = "Pro (monthly)";
export const premiumPlanMonthly = "Premium (monthly)";
export const proPlanAnnual = "Pro (annual)";
export const premiumPlanAnnual = "Premium (annual)";

export const stripeBillingPortalLink = "https://billing.stripe.com/p/login/test_9AQ3eE3BS5Oz9wY144?prefilled_email=";

// version: {<obj>}
// Do not remove any new version object, only add new ones
// Prices are in USD
export const subscriptionPlans = {
	1: {
		freeSubscription: {
			monthly: {
				name: "Free",
				price: 0,
				stripePriceId: "",
			},
			annual: {
				name: "Free",
				price: 0,
				stripePriceId: "",
			},
		},
		proSubscription: {
			monthly: {
				name: "Pro (monthly)",
				price: 19,
				stripePriceId: "price_1N2vvVSHK7LspLaMGw942RoD",
				validForDays: 30,
			},
			annual: {
				name: "Pro (annual)",
				price: 79,
				stripePriceId: "price_1N2vvVSHK7LspLaMYXMhvbzp",
				validForDays: 365,
			},
		},
		premiumSubscription: {
			monthly: {
				name: "Premium (monthly)",
				price: 29,
				stripePriceId: "price_1N2naKSHK7LspLaMFfoD0CYC",
				validForDays: 30,
			},
			annual: {
				name: "Premium (annual)",
				price: 129,
				stripePriceId: "price_1N2naLSHK7LspLaMHUK7xlSN",
				validForDays: 365,
			},
		},
	},
	// 2: {
	// 	freeSubscription: { name: freePlan, price: 0 },
	// 	proSubscription: { name: proPlan, price: 2, validForDays: 7 },
	// 	premiumSubscription: { name: premiumPlan, price: 5, validForDays: 30 },
	// },
};

export const freePlanFeatures = [
	{ name: "1 Team", available: true },
	{ name: "1 Project", available: true },
	{ name: "1 Team Member", available: true },
	{ name: "Vercel Hosting", available: true },
	{ name: "Custom Domain", available: false },
	{ name: "Basic Analytics", available: false },
	{ name: "AWS Hosting", available: false },
];

export const proPlanFeatures = [
	{ name: "3 Teams", available: true },
	{ name: "3 Projects per Team", available: true },
	{ name: "5 Members per Team", available: true },
	{ name: "Vercel Hosting", available: true },
	{ name: "Custom Domain", available: true },
	{ name: "Basic Analytics", available: true },
	{ name: "AWS Hosting", available: false },
];

export const premiumPlanFeatures = [
	{ name: "10 Teams", available: true },
	{ name: "10 Projects per Team", available: true },
	{ name: "10 Members per Team", available: true },
	{ name: "Vercel Hosting", available: true },
	{ name: "Custom Domain", available: true },
	{ name: "Advanced Analytics", available: true },
	{ name: "AWS Hosting", available: true },
];
