const jwt = require("jsonwebtoken");
const User = require("../db/models/User");

const varifyToken = function (req, res) {
	const token = req.header("auth-token");
	if (!token) return res.status(401).json({ error: "Access Denied" });
	try {
		const jwt_key = process.env.JWT_SECRET_KEY;
		const varifiedUser = jwt.verify(token, jwt_key);
		return varifiedUser;
	} catch (error) {
		return res.status(403).json({ error });
	}
};

const varifyUser = async function (req, res, next) {
	const varifiedUser = varifyToken(req, res);
	// console.log(varifiedUser);
	try {
		const result = await User.findById(varifiedUser.id);
		if (!result) return res.status(400).json({ message: "invalid User" });
		req.body.user = varifiedUser;
		next();
	} catch (error) {
		return res.status(403).json({ error });
	}
};

module.exports = { varifyUser, varifyToken };
