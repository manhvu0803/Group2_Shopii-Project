const express = require("express");
const morgan = require("morgan");

const db = require("./database");
const registerManager = require("./authenticate/registerManager");

let port = process.env.PORT || 3000;
if (process.argv.length > 2)
	port = parseInt(process.argv[2]);

const app = express();
app.use(morgan(":method :url :status [:date[clf]] :response-time ms"));

app.get("/login", async (req, res) => {
	let username = req.query["username"];
	let mailAddress = req.query["email"];

	if (username)
		user = await db.getUser(username);
	else
		user = await db.getUserByEmail(mailAddress);

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

app.get("/verify", (req, res) => {
	let email = req.query.email;
	let verifyCode = req.query.verifycode;

	if (db.getUserByEmail(email)) {
		res.json({existed: true});
		return;
	}
	else if (verifyCode) {
		if (registerManager.verify(email, verifyCode))
			res.json({ verified: true });
		else
			res.json({ verified: false });
		return;
	}

	registerManager.newLoginSession(email);
	res.json({ verifyCodeSent: true });
})

app.get("/register", async (req, res) => {
	// Check if email is being used for registering
	let email = req.query.email;
	if (!email || !registerManager.getSession(email).verified) {
		res.json({ verified: false });
		return;
	}

	// Check username
	let username = req.query["username"];
	
	if (username) {
		let error = null;
		if (!username.match(/^[a-zA-Z]/))
			error = "invalid first character";
		else if (await db.getUser(username))
			error = "username existed";

		if (error) {
			res.json({
				invalid: true,
				reason: error
			});
			return;
		}
	}

	// Parse user data
	let userData = {
		username_: username,
		password: req.query["password"],
		dob: req.query["dob"],
		address: req.query["address"],
		phone: req.query["phone"],
		sex: req.query["sex"]
	}
	registerManager.updateSessionData(email, userData);
	
	// Write to database when date is completed
	if (registerManager.completed(email)) {
		let newUser = registerManager.finalize(email);
		await db.registerUser(newUser.username, newUser.data);
		res.json({ registered: true });
		return;
	}

	res.sendStatus(200);
})

app.get("/product", (req, res) => {
	res.sendStatus(200);
})

app.listen(port, () => { console.log(`Listening on port ${port}`); });