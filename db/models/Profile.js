const mongoose = require("mongoose");

// Define the schema for the 'socialLinks' subdocument
const socialLinkSchema = {
	title: { type: String, required: true },
	link: { type: String, required: true },
	icon: { type: String },
};

// Define the main schema for the document
const profileSchema = mongoose.Schema({
	userId: { type: String, required: true },
	profileImage: { type: String },
	bannerImage: { type: String },
	name: { type: String, required: true },
	designation: { type: String, required: true },
	about: { type: String, required: true },
	socialLinks: { type: [socialLinkSchema] }, // An array of 'socialLinks' subdocuments
	contactDetails: {
		phoneNumber: { type: String },
		email: { type: String },
		address: { type: String },
		website: { type: String },
	},
	registeredAt: { type: Date, default: Date.now() },
});

const Profile = mongoose.model("profiles", profileSchema);

module.exports = Profile;
