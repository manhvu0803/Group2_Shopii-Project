const express = require("express");
const morgan = require("morgan");
const db = require("./database");

let port = 3000;
if (process.argv.length > 2) port = parseInt(process.argv[2]);

const app = express();
app.use(morgan("short"));

app.get("/login", async (req, res) => {
	let username = req.query["username"];
	let mailAddress = req.query["email"];

	if (username)
		user = db.getUser(username);
	else
		user = db.getUserByEmail(mailAddress);

	let respond = {
		existed: false,
		password: false,
		data: null
	};

	if (user != null) {
		respond.existed = true;
		if (user.password === req.query["password"]) {
			respond.password = true;
			respond.data = Object.assign({}, user);
			delete respond.data.password;
		}
	};

	res.json(respond);
})

app.get("/register", async (req, res) => {
	let username = req.query["username"]
	let userData = {
		password: req.query["password"],
		age: req.query["age"],
		address: req.query["address"],
		email: req.query["email"],
		phone: req.query["phone"],
		sex: req.query["sex"]
	}
	
	await db.registerUser(username, userData);
	res.sendStatus(200);
})

app.get("/product", (req, res) => {
	res.sendStatus(200);
})

app.listen(port, () => { console.log(`Listening on port ${port}`); });