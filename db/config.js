const mongoose = require("mongoose");

mongoose
	.connect(process.env.DB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("DB connected Successfully");
	})
	.catch((err) => {
		console.log("error during DB connection", err);
	});
