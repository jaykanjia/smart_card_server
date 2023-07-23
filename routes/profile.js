const router = require("express").Router();
const Profile = require("../db/models/Profile");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { varifyUser } = require("./varifyToken");

router.get("/:id", async (req, res) => {
	try {
		const id = req.params.id;
		// check profile in db
		const user = await Profile.findOne({ userId: id });
		// if user not found
		if (!user) return res.status(404).send({ error: `Profile not found` });
		// if user found
		return res.status(200).send({ message: `Profile data`, data: user });
	} catch (error) {
		return res.status(500).send({ error: `Server error ${error}` });
	}
});

router.get("/", varifyUser, async (req, res) => {
	try {
		const id = req.body.user.id;
		// check profile in db
		const user = await Profile.findOne({ userId: id });
		// if user not found
		if (!user) return res.status(404).send({ error: `Profile not found` });
		// if user found
		return res.status(200).send({ message: `Profile data`, data: user });
	} catch (error) {
		return res.status(500).send({ error: `Server error ${error}` });
	}
});

router.post("/", varifyUser, async (req, res) => {
	try {
		const id = req.body.user.id;
		// check profile in db
		const user = await Profile.findOne({ userId: id });
		if (user) {
			return res.status(200).send({ message: `Already profile created` });
		}
		// create new profile object
		const newProfile = new Profile({
			userId: req.body.user.id,
			...req.body.data,
		});
		// save profile into the database
		const result = await newProfile.save();
		// if success
		if (result) return res.status(200).send({ message: `Profile Created` });
	} catch (error) {
		return res.status(500).send({ error: `Server error ${error}` });
	}
});

module.exports = router;
