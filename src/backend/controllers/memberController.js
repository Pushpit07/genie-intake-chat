import mongoose from "mongoose";
import Member from "../models/member";
import TeamInvites from "../models/teamInvites";
import ErrorHandler from "@/backend/utils/errorHandler";
import catchAsyncErrors from "@/backend/middlewares/catchAsyncErrors";

// add to db => /api/member
const createMember = catchAsyncErrors(async (req, res) => {
	const userId = req.user._id || req.user.id;
	const { teamId } = req.body;

	const invite = await TeamInvites.findOne({ teamId: teamId, invitedUserEmail: req.user.email });
	if (!invite) {
		return next(new ErrorHandler("You do not have an invite to this team", 404));
	}
	invite.accepted = true;
	await invite.save();

	const member = await Member.create({ userId, teamId, role: "member" });

	res.status(200).json({
		success: true,
		member,
	});
});

// get member => /api/member/:id
const getMember = catchAsyncErrors(async (req, res) => {
	const member = await Member.findById(req.query.id);

	res.status(200).json({
		success: true,
		member,
	});
});

// update member => /api/member/:id
const updateMember = catchAsyncErrors(async (req, res, next) => {
	let member = await Member.findById(req.query.id);
	if (!member) {
		return next(new ErrorHandler("No member found with this id", 404));
	}

	member = await Member.findByIdAndUpdate(req.query.id, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});
	res.status(200).json({ success: true, member });
});

// delete member => /api/member/:id
const deleteMember = catchAsyncErrors(async (req, res, next) => {
	const member = await Member.findById(req.query.id);
	if (!member) {
		return next(new ErrorHandler("No member found with this id", 404));
	}
	if (member.role === "admin") {
		return next(new ErrorHandler("Cannot remove admin", 404));
	}

	await member.remove();
	res.status(200).json({ success: true, message: "Removed successfully" });
});

// get team members => /api/member
const getTeamMembers = catchAsyncErrors(async (req, res) => {
	const { teamId } = req.query;

	const members = await Member.aggregate([
		{
			$match: {
				teamId: mongoose.Types.ObjectId(teamId),
			},
		},
		{
			$lookup: {
				from: "users",
				let: { memberUserId: "$userId" },
				pipeline: [
					{
						$match: {
							$expr: {
								$and: [{ $eq: ["$_id", "$$memberUserId"] }],
							},
						},
					},
				],
				as: "user",
			},
		},
	]);

	res.status(200).json({
		success: true,
		members,
	});
});

export { createMember, getMember, updateMember, deleteMember, getTeamMembers };
