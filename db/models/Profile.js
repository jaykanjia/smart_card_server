const mongoose = require("mongoose");

// Define the schema for the 'socialLinks' subdocument
const socialLinkSchema = new mongoose.Schema({
	title: { type: String, required: true },
	link: { type: String, required: true },
	icon: { type: String },
});

// Define the schema for the 'contactDetails' subdocument
const contactDetailSchema = new mongoose.Schema({
	title: { type: String, required: true },
	icon: { type: String },
	value: { type: String, required: true },
	tag: { type: String },
});

// Define the main schema for the document
const profileSchema = mongoose.Schema({
	userId: { type: String, required: true },
	profileImage: { type: String },
	bannerImage: { type: String },
	name: { type: String, required: true },
	designation: { type: String, required: true },
	about: { type: String, required: true },
	socialLinks: { type: [socialLinkSchema] }, // An array of 'socialLinks' subdocuments
	contactDetails: { type: [contactDetailSchema] }, // An array of 'contactDetails' subdocuments
	registeredAt: { type: Date, default: Date.now() },
});

const Profile = mongoose.model("profiles", profileSchema);

module.exports = Profile;
