import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please enter a name"],
		trim: true,
		maxLength: [100, "Name cannot exceed 100 characters"],
	},
	teamId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Team",
		required: true,
	},
	assets: {
		type: Array,
		default: [],
	},
	dom: {
		type: Object,
		default: {},
	},
	deploymentInfo: {
		type: Object,
		default: {},
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.models.Project || mongoose.model("Project", projectSchema);
