import mongoose from "mongoose";
import Member from "./member";

const teamSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please enter a name"],
		trim: true,
		maxLength: [100, "Name cannot exceed 100 characters"],
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	isDefault: {
		type: Boolean,
		default: false,
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

// adding user to member model
teamSchema.post("save", async function () {
	const member = await Member.findOne({ userId: this.createdBy, teamId: this._id });
	if (!member) await Member.create({ userId: this.createdBy, teamId: this._id, role: "admin" });
});

export default mongoose.models.Team || mongoose.model("Team", teamSchema);
