import mongoose from "mongoose";
import Team from "../models/team";
import ErrorHandler from "@/backend/utils/errorHandler";
import catchAsyncErrors from "@/backend/middlewares/catchAsyncErrors";
import { sendTeamInvite } from "@/backend/controllers/invitesController";

// add to db => /api/team
const createTeam = catchAsyncErrors(async (req, res) => {
	const userId = req.user._id || req.user.id;
	const { name, collaborators } = req.body;
	const team = await Team.create({ name, createdBy: userId });

	// Add collaborators
	if (collaborators && collaborators.length > 0) {
		for (let i = 0; i < collaborators.length; i++) {
			if (collaborators[i].email) {
				req.body = { ...req.body, teamId: team._id, email: collaborators[i].email };
				await sendTeamInvite(req, res);
			}
		}
	}

	res.status(200).json({
		success: true,
		team,
	});
});

// get team => /api/team/:id
const getTeam = catchAsyncErrors(async (req, res) => {
	const team = await Team.findById(req.query.id);

	res.status(200).json({
		success: true,
		team,
	});
});

// update team => /api/team/:id
const updateTeam = catchAsyncErrors(async (req, res, next) => {
	let team = await Team.findById(req.query.id);
	if (!team) {
		return next(new ErrorHandler("No team found with this id", 404));
	}

	team = await Team.findByIdAndUpdate(req.query.id, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});
	res.status(200).json({ success: true, team });
});

// delete team => /api/team/:id
const deleteTeam = catchAsyncErrors(async (req, res, next) => {
	const userId = req.user._id || req.user.id;

	const team = await Team.findById(req.query.id);
	if (!team) {
		return next(new ErrorHandler("No team found with this id", 404));
	}
	if (team.isDefault) {
		return next(new ErrorHandler("Cannot delete default team", 404));
	}
	if (team.createdBy.toString() !== userId.toString()) {
		return next(new ErrorHandler("Only team admin can delete this team", 404));
	}

	await team.remove();
	res.status(200).json({ success: true, message: "Deleted successfully" });
});

// get my teams => /api/team
const getMyTeams = catchAsyncErrors(async (req, res) => {
	const userId = req?.user?._id || req?.user?.id;

	const teams = await Team.aggregate([
		{
			$lookup: {
				from: "members",
				localField: "_id",
				foreignField: "teamId",
				as: "teamMembers",
			},
		},
		{
			$match: {
				"teamMembers.userId": mongoose.Types.ObjectId(userId),
			},
		},
		{
			$lookup: {
				from: "projects",
				let: { teamId: "$_id" },
				pipeline: [
					{
						$match: {
							$expr: {
								$and: [{ $eq: ["$teamId", "$$teamId"] }],
							},
						},
					},
				],
				as: "projects",
			},
		},
		{
			$lookup: {
				from: "members",
				let: { teamId: "$_id" },
				pipeline: [
					{
						$match: {
							$expr: {
								$and: [{ $eq: ["$teamId", "$$teamId"] }],
							},
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
				],
				as: "members",
			},
		},
		{
			$lookup: {
				from: "teaminvites",
				let: { teamId: "$_id" },
				pipeline: [
					{
						$match: {
							$expr: {
								$and: [{ $eq: ["$teamId", "$$teamId"] }],
							},
						},
					},
					{
						$lookup: {
							from: "users",
							let: { inviterUserId: "$inviterId" },
							pipeline: [
								{
									$match: {
										$expr: {
											$and: [{ $eq: ["$_id", "$$inviterUserId"] }],
										},
									},
								},
							],
							as: "inviter",
						},
					},
				],
				as: "invites",
			},
		},
		{
			$lookup: {
				from: "subscriptions",
				let: { teamId: "$_id" },
				pipeline: [
					{
						$match: {
							$expr: {
								$and: [{ $eq: ["$team", "$$teamId"] }],
							},
						},
					},
					{
						$sort: {
							createdAt: -1,
						},
					},
					{
						$lookup: {
							from: "users",
							localField: "user",
							foreignField: "_id",
							as: "billingUser",
						},
					},
					{
						$addFields: {
							billingUser: { $arrayElemAt: ["$billingUser", 0] },
						},
					},
				],
				as: "subscriptions",
			},
		},
		{
			$project: {
				_id: 1,
				name: 1,
				createdAt: 1,
				createdBy: 1,
				isDefault: 1,
				members: {
					$map: {
						input: "$members",
						as: "member",
						in: {
							_id: "$$member._id",
							userId: "$$member.userId",
							role: "$$member.role",
							user: {
								$first: "$$member.user",
							},
						},
					},
				},
				invites: {
					$map: {
						input: "$invites",
						as: "invitedMember",
						in: {
							_id: "$$invitedMember._id",
							inviterId: "$$invitedMember.inviterId",
							invitedUserEmail: "$$invitedMember.invitedUserEmail",
							accepted: "$$invitedMember.accepted",
							inviter: {
								$first: "$$invitedMember.inviter",
							},
						},
					},
				},
				projects: 1,
				subscription: { $first: "$subscriptions" },
			},
		},
		{
			$sort: {
				createdAt: -1,
			},
		},
	]);

	res.status(200).json({
		success: true,
		teams,
	});
});

export { createTeam, getTeam, updateTeam, deleteTeam, getMyTeams };
