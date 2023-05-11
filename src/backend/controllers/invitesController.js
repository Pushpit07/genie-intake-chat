import mongoose from "mongoose";
import Team from "../models/team";
import TeamInvites from "../models/teamInvites";
import Member from "../models/member";
import ErrorHandler from "@/backend/utils/errorHandler";
import catchAsyncErrors from "@/backend/middlewares/catchAsyncErrors";
import { sendEmailViaAWS_SES } from "@/backend/modules/email";
const { InvitationTemplate } = require("@/backend/modules/email/template/invitation");
import { product_name } from "@/config/constants";
import absoluteUrl from "next-absolute-url";

const sendTeamInviteEmail = catchAsyncErrors(async (req, res) => {
	const invite = await sendTeamInvite(req, res);

	res.status(200).json({
		success: true,
		invite,
	});
});

const sendTeamInvite = catchAsyncErrors(async (req, res) => {
	const userId = req.user._id || req.user.id;
	const { teamId, email } = req.body;
	const team = await Team.findById(teamId);

	const invite = await TeamInvites.create({ inviterId: userId, teamId: teamId, invitedUserEmail: email });

	const { origin } = absoluteUrl(req);
	const joinInvitationLink = `${origin}/join-team/accept-invite?invite=${invite._id}&team=${teamId}`;

	const invitationData = InvitationTemplate(req.user.name, team.name, product_name, joinInvitationLink).toString();
	await sendEmailViaAWS_SES({
		emailBody: invitationData,
		emailSubject: `You've been invited to join ${req.user.name}'s team on ${product_name}`,
		emailTo: email,
		emailFrom: process.env.AWS_SENDER_EMAIL,
	});

	return invite;
});

const acceptTeamInvite = catchAsyncErrors(async (req, res, next) => {
	const { inviteId, teamId } = req.body;
	const userId = req.user._id || req.user.id;

	const existingMember = await Member.findOne({ userId, teamId });
	if (existingMember) {
		return next(new ErrorHandler("You are already a member of this team", 403));
	}

	const team = await Team.findById(teamId);
	if (!team) {
		return next(new ErrorHandler("No team found with this id", 404));
	}

	const invite = await TeamInvites.findById(inviteId);
	if (!invite) {
		return next(new ErrorHandler("No invite found with this id", 404));
	}
	if (invite.invitedUserEmail !== req.user.email) {
		return next(new ErrorHandler("You are not invited to this team", 403));
	}
	invite.accepted = true;
	await invite.save();

	await Member.create({ userId, teamId: team, role: "member" });

	res.status(200).json({
		success: true,
		team,
	});
});

export { sendTeamInviteEmail, sendTeamInvite, acceptTeamInvite };
