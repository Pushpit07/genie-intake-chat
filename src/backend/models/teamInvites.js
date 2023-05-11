import mongoose from "mongoose";

const teamInvitesSchema = new mongoose.Schema({
	inviterId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	teamId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Team",
		required: true,
	},
	invitedUserEmail: {
		type: String,
		required: [true, "Please enter an email"],
		trim: true,
		maxLength: [100, "Email cannot exceed 100 characters"],
	},
	accepted: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.models.TeamInvites || mongoose.model("TeamInvites", teamInvitesSchema);
