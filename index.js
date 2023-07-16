require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5001;
const path = require("path");

// import db
require("./db/config");

// import routes
// import api routes
// const adminRoute = require("./routes/admin");

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use(express.static(path.join(__dirname, "build")));

// route middleware
// api routes
// app.use("/api/admin", adminRoute);

// const buildPath = path.resolve(__dirname, "build");
// const indexPath = path.resolve(buildPath, "index.html");

// app.get("/*", (req, res) => {
// 	res.sendFile(indexPath);
// });

// start server
app.listen(PORT, () => {
	console.log(`Server started at port ${PORT}`);
});
