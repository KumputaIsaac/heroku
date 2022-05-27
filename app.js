require("dotenv").config();
const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const houseRoute = require("./routes/house");
const app = express();

// connect to mongo
mongoose.connect(
	process.env.MONGO_URL,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => {
		console.log("database is connected");
	}
);

// middleware
// shoulda imported cors normal but kelvin said this will make more sense so
app.use(
	cors({
		origin: "*",
	})
);

app.use(express.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.get("/", function (req, res) {
	res.send("Hello World");
});

// routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/house", houseRoute);

app.listen(process.env.PORT, () =>
	console.log(`listening on ${process.env.PORT} `)
);
