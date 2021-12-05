const express = require("express");
const morgan = require("morgan");

const db = require("./data/database.js");
const loginManager = require("./authenticate/verifyManager");

function parseUserData(username, data)
{
	if (data["dob"] && !parseInt(data["dob"]))
		throw new TypeError("Date of birth is not epoch");

	if (data["password"] && data["password"].length <= 8)
		throw new Error("password is too short")

	return {
		username_: username,
		password: data["password"],
		dob: data["dob"],
		address: data["address"],
		phone: data["phone"],
		sex: data["sex"]
	}
}

let port = process.env.PORT || 3000;
if (process.argv.length > 2)
	port = parseInt(process.argv[2]);

const app = express();
app.use(morgan(":method :status [:date[clf]] :response-time ms"));

app.get("/ready", (req, res) => {
	res.send(db.ready());
});

app.get("/login", async (req, res) => {
	let username = req.query["username"];
	let mailAddress = req.query["email"];

	if (username)
		user = await db.getUser(username);
	else
		user = await db.getUserByEmail(mailAddress);

	let respond = {
		registered: false,
		password: false,
		data: null,
		error: null
	};

	if (user != null) {
		respond.registered = true;
		if (user.password === req.query["password"]) {
			respond.password = true;
			respond.data = Object.assign({}, user);
			delete respond.data.password;
		}
	};

	res.json(respond);
})

app.get("/verify", async (req, res) => {
	let email = req.query.email;
	let verifyCode = req.query.verifycode;
	let respond = {
		verified: false,
		verifyCodeSent: false,
		error: null
	}

	if (verifyCode) {
		if (loginManager.verify(email, verifyCode))
			respond.verified = true;
	}
	else if (email) {
		loginManager.newLoginSession(email);
	}

	if (loginManager.getSession(email))
		respond.verifyCodeSent = true;

	res.json(respond);
})

app.get("/forgotpassword", async (req, res) => {
	let email = req.query.email;
	let password = req.query.password;
	let respond = {
		registered: false,
		passwordUpdated: false,
		error: null
	}
	
	if (!loginManager.getSession(email).verified)
		respond.error = "email not verified";
	else if (password) {
		if (respond.verified) {
			db.updateFieldByEmail(email, "password", password);
			loginManager.deleteSession(email);
			respond.passwordUpdated = true;
			respond.registered = true;
		}
	}
	else if (await db.getUserByEmail(email)) {
		loginManager.newLoginSession(email);
		respond.registered = true;
	};

	res.json(respond);
})

app.get("/register", async (req, res) => {
	let respond = {
		infoReceived: false,
		registrationCompleted: false,
		error: null,
	}

	try {
		let email = req.query.email;
		if (!email || !loginManager.getSession(email).verified)
			throw new Error("email not verified");

		let username = req.query["username"];
		if (username) {
			if (!username.match(/^[a-zA-Z]/))
				throw new Error("invalid first character");
			else if (await db.getUser(username))
				throw new Error("username registered");
		}

		let userData = parseUserData(username, req.query);
		loginManager.updateSessionData(email, userData);
		respond.infoReceived = true;

		if (loginManager.completed(email)) {
			let newUser = loginManager.finalize(email);
			await db.registerUser(newUser.username, newUser.data);
			respond.registrationCompleted = true;
		}
	}
	catch (e) {
		respond.error = e.message;
	}

	res.json(respond);
})

app.get("/product", (req, res) => {
	res.sendStatus(202);
})

app.listen(port, () => { console.log(`Listening on port ${port}`); });