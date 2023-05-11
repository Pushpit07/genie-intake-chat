import { subscriptionPlans, freePlan, proPlanMonthly, premiumPlanMonthly, proPlanAnnual, premiumPlanAnnual } from "@/config/constants";

const getUTCTimestamp = (blockTimestamp) => {
	const pad = (n, s = 2) => `${new Array(s).fill(0)}${n}`.slice(-s);
	const d = new Date(blockTimestamp);

	return `${pad(d.getFullYear(), 4)}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}.${pad(
		d.getMilliseconds(),
		3
	)}`;
};
export const getTimestamp = (blockTimestamp) => {
	var date = new Date(blockTimestamp);
	var now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());

	return getUTCTimestamp(new Date(now_utc).toUTCString().toString().slice(0, 25));
};

export const getTimeDifference = (startDate, endDate, timeDiff = "") => {
	let diff;

	if (timeDiff) diff = timeDiff;
	else diff = endDate.getTime() - startDate.getTime();

	const yearDiff = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
	if (yearDiff > 0) {
		return yearDiff + (yearDiff === 1 ? " year ago" : " years ago");
	}

	const monthDiff = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
	if (monthDiff > 0) {
		return monthDiff + (monthDiff === 1 ? " month ago" : " months ago");
	}

	const dayDiff = Math.floor(diff / (1000 * 60 * 60 * 24));
	if (dayDiff > 0) {
		return dayDiff + (dayDiff === 1 ? " day ago" : " days ago");
	}

	const hourDiff = Math.floor(diff / (1000 * 60 * 60));
	if (hourDiff > 0) {
		return hourDiff + (hourDiff === 1 ? " hour ago" : " hours ago");
	}

	const minuteDiff = Math.floor(diff / (1000 * 60));
	if (minuteDiff > 0) {
		return minuteDiff + (minuteDiff === 1 ? " minute ago" : " minutes ago");
	}

	const secondDiff = Math.floor(diff / 1000);
	return secondDiff === 0 ? "just now" : secondDiff + secondDiff === 1 ? " second ago" : " seconds ago";
};

// export const getTimeDifference = (date1, date2) => {
// 	const diff = Math.abs(date1.getTime() - date2.getTime());
// 	const minute = 60 * 1000;
// 	const hour = 60 * minute;
// 	const day = 24 * hour;
// 	const week = 7 * day;
// 	const month = 30 * day;

// 	if (diff < minute) {
// 		return `${Math.floor(diff / 1000)} ${Math.floor(diff / 1000) == 1 ? "second" : "seconds"}`;
// 	} else if (diff < hour) {
// 		return `${Math.floor(diff / minute)} ${Math.floor(diff / minute) == 1 ? "minute" : "minutes"}`;
// 	} else if (diff < day) {
// 		return `${Math.floor(diff / hour)} ${Math.floor(diff / hour) == 1 ? "hour" : "hours"}`;
// 	} else if (diff < week) {
// 		return `${Math.floor(diff / day)} ${Math.floor(diff / day) == 1 ? "day" : "days"}`;
// 	} else if (diff < month) {
// 		return `${Math.floor(diff / week)} ${Math.floor(diff / week) == 1 ? "week" : "weeks"}`;
// 	} else {
// 		return `${Math.floor(diff / month)} ${Math.floor(diff / month) == 1 ? "month" : "months"}`;
// 	}
// };

export const removeAllWhiteSpaces = (str) => {
	return str.toString().replace(/\s+/g, "");
};

export const padZeros = (num, width) => {
	num = num + "";
	return num.length >= width ? num : new Array(width - num.length + 1).join("0") + num;
};

export const findByMatchingProperties = (set, properties) => {
	return set.filter(function (entry) {
		return Object.keys(properties).every(function (key) {
			return entry[key] === properties[key];
		});
	});
};

// Subscription helpers
export const getObjectWithHighestKey = (obj) => {
	let highestKey = null;
	let highestObj = null;
	for (const key in obj) {
		if (highestKey === null || key > highestKey) {
			highestKey = key;
			highestObj = obj[key];
		}
	}
	return highestObj;
};

export const getHighestKeyFromObject = (obj) => {
	let highestKey = null;
	let highestObj = null;
	for (const key in obj) {
		if (highestKey === null || key > highestKey) {
			highestKey = key;
			highestObj = obj[key];
		}
	}
	return parseInt(highestKey);
};

export const getLatestSubscriptionPlansVersion = () => {
	return getHighestKeyFromObject(subscriptionPlans);
};

export const getSubscriptionPlanName = (plan) => {
	return plan == freePlan
		? getObjectWithHighestKey(subscriptionPlans).freeSubscription.monthly.name
		: plan == proPlanMonthly
		? getObjectWithHighestKey(subscriptionPlans).proSubscription.monthly.name
		: plan == premiumPlanMonthly
		? getObjectWithHighestKey(subscriptionPlans).premiumSubscription.monthly.name
		: plan == proPlanAnnual
		? getObjectWithHighestKey(subscriptionPlans).proSubscription.annual.name
		: plan == premiumPlanAnnual
		? getObjectWithHighestKey(subscriptionPlans).premiumSubscription.annual.name
		: "";
};

export const getSubscriptionPlanPrice = (plan) => {
	return plan == freePlan
		? getObjectWithHighestKey(subscriptionPlans).freeSubscription.monthly.price
		: plan == proPlanMonthly
		? getObjectWithHighestKey(subscriptionPlans).proSubscription.monthly.price
		: plan == premiumPlanMonthly
		? getObjectWithHighestKey(subscriptionPlans).premiumSubscription.monthly.price
		: plan == proPlanAnnual
		? getObjectWithHighestKey(subscriptionPlans).proSubscription.annual.price
		: plan == premiumPlanAnnual
		? getObjectWithHighestKey(subscriptionPlans).premiumSubscription.annual.price
		: "";
};

export const getSubscriptionPlanPriceId = (plan) => {
	return plan == freePlan
		? getObjectWithHighestKey(subscriptionPlans).freeSubscription.monthly.stripePriceId
		: plan == proPlanMonthly
		? getObjectWithHighestKey(subscriptionPlans).proSubscription.monthly.stripePriceId
		: plan == premiumPlanMonthly
		? getObjectWithHighestKey(subscriptionPlans).premiumSubscription.monthly.stripePriceId
		: plan == proPlanAnnual
		? getObjectWithHighestKey(subscriptionPlans).proSubscription.annual.stripePriceId
		: plan == premiumPlanAnnual
		? getObjectWithHighestKey(subscriptionPlans).premiumSubscription.annual.stripePriceId
		: "";
};

export const getPriceFromStripePriceId = (stripePriceId) =>
	stripePriceId
		? getObjectWithHighestKey(subscriptionPlans).proSubscription.monthly.stripePriceId === stripePriceId
			? getObjectWithHighestKey(subscriptionPlans).proSubscription.monthly.price
			: getObjectWithHighestKey(subscriptionPlans).proSubscription.annual.stripePriceId === stripePriceId
			? getObjectWithHighestKey(subscriptionPlans).proSubscription.annual.price
			: getObjectWithHighestKey(subscriptionPlans).premiumSubscription.monthly.stripePriceId === stripePriceId
			? getObjectWithHighestKey(subscriptionPlans).premiumSubscription.monthly.price
			: getObjectWithHighestKey(subscriptionPlans).premiumSubscription.annual.stripePriceId === stripePriceId
			? getObjectWithHighestKey(subscriptionPlans).premiumSubscription.annual.price
			: 0
		: 0;

export const getPlanFromStripePriceId = (stripePriceId) =>
	stripePriceId
		? getObjectWithHighestKey(subscriptionPlans).proSubscription.monthly.stripePriceId === stripePriceId
			? getObjectWithHighestKey(subscriptionPlans).proSubscription.monthly.name
			: getObjectWithHighestKey(subscriptionPlans).proSubscription.annual.stripePriceId === stripePriceId
			? getObjectWithHighestKey(subscriptionPlans).proSubscription.annual.name
			: getObjectWithHighestKey(subscriptionPlans).premiumSubscription.monthly.stripePriceId === stripePriceId
			? getObjectWithHighestKey(subscriptionPlans).premiumSubscription.monthly.name
			: getObjectWithHighestKey(subscriptionPlans).premiumSubscription.annual.stripePriceId === stripePriceId
			? getObjectWithHighestKey(subscriptionPlans).premiumSubscription.annual.name
			: freePlan
		: freePlan;

export const getCurrentSubscriptionTier = (subscription) => {
	return subscription &&
		subscriptionPlans[subscription.version] &&
		subscription.stripe_priceId == subscriptionPlans[subscription.version].premiumSubscription.monthly.stripePriceId &&
		new Date(subscription.subscriptionValidUntil) > Date.now()
		? premiumPlanMonthly
		: subscription &&
		  subscriptionPlans[subscription.version] &&
		  subscription.stripe_priceId == subscriptionPlans[subscription.version].premiumSubscription.annual.stripePriceId &&
		  new Date(subscription.subscriptionValidUntil) > Date.now()
		? premiumPlanAnnual
		: subscription &&
		  subscriptionPlans[subscription.version] &&
		  subscription.stripe_priceId == subscriptionPlans[subscription.version].proSubscription.monthly.stripePriceId &&
		  new Date(subscription.subscriptionValidUntil) > Date.now()
		? proPlanMonthly
		: subscription &&
		  subscriptionPlans[subscription.version] &&
		  subscription.stripe_priceId == subscriptionPlans[subscription.version].proSubscription.annual.stripePriceId &&
		  new Date(subscription.subscriptionValidUntil) > Date.now()
		? proPlanAnnual
		: freePlan;
};
