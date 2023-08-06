const router = require("express").Router();
const User = require("../db/models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
	res.json("api route set");
});

router.post("/login", async (req, res) => {
	try {
		// check user in db
		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(403).send({ error: "invalid email", loginFlag: false });
		// check password
		const validatePassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validatePassword)
			return res
				.status(403)
				.send({ error: "invalid password", loginFlag: false });
		// generate jwt token
		const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
		const token = jwt.sign(
			{ id: user._id, email: user.email },
			JWT_SECRET_KEY,
			{
				expiresIn: "24h",
			}
		);
		// send success response
		return res.header("auth-token", token).status(200).send({
			message: "User Loged in Successfully",
			loginFlag: true,
			authToken: token,
			userInfo: user.name,
		});
	} catch (error) {
		return res.status(500).send({ error: `Server error ${error}` });
	}
});

router.post("/register", async (req, res) => {
	try {
		// check user in db
		const user = await User.findOne({ email: req.body.email });
		// if user found
		if (user)
			return res.status(200).send({ message: "user already registerd" });
		// if user not found
		// generate hashed password
		const SALT = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT));
		const hashedPassword = await bcrypt.hash(req.body.password, SALT);
		// create new user object
		const newUser = new User({
			name: req.body.name,
			email: req.body.email,
			password: hashedPassword,
		});
		// save user to db
		const result = await newUser.save();
		const { password, ...restUser } = result._doc;
		// send success response
		return res.status(200).send({
			message: "User Registered Successfully",
			restUser,
		});
	} catch (err) {
		return res.status(500).send({ error: `server error, ${err}` });
	}
});

module.exports = router;
