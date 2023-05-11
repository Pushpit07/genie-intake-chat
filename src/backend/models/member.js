import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	teamId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Team",
		required: true,
	},
	role: {
		type: String,
		default: "member",
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.models.Member || mongoose.model("Member", memberSchema);
