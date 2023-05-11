import mongoose from "mongoose";
import Project from "../models/project";
import Team from "../models/team";
import ErrorHandler from "@/backend/utils/errorHandler";
import catchAsyncErrors from "@/backend/middlewares/catchAsyncErrors";

// add to db => /api/project
const createProject = catchAsyncErrors(async (req, res) => {
	const userId = req.user._id || req.user.id;
	const { name, teamId } = req.body;

	const team = await Team.findById(teamId);
	if (!team) {
		return next(new ErrorHandler("No team found with this id", 404));
	}

	const teamInfo = await Team.aggregate([
		{
			$match: {
				_id: mongoose.Types.ObjectId(teamId),
			},
		},
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
	]);
	const isMember = teamInfo[0].teamMembers.length > 0;
	if (!isMember) {
		return next(new ErrorHandler("You are not a member of this team", 401));
	}

	const project = await Project.create({ name, teamId, createdBy: userId });

	res.status(200).json({
		success: true,
		project,
	});
});

// get project => /api/project/:id
const getProject = catchAsyncErrors(async (req, res) => {
	const project = await Project.findById(req.query.id);

	res.status(200).json({
		success: true,
		project,
	});
});

// update project => /api/project/:id
const updateProject = catchAsyncErrors(async (req, res, next) => {
	let project = await Project.findById(req.query.id);
	if (!project) {
		return next(new ErrorHandler("No project found with this id", 404));
	}

	project = await Project.findByIdAndUpdate(req.query.id, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});
	res.status(200).json({ success: true, project });
});

// delete project => /api/project/:id
const deleteProject = catchAsyncErrors(async (req, res, next) => {
	const project = await Project.findById(req.query.id);
	if (!project) {
		return next(new ErrorHandler("No project found with this id", 404));
	}

	await project.remove();
	res.status(200).json({ success: true, message: "Deleted successfully" });
});

export { createProject, getProject, updateProject, deleteProject };
