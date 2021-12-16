const express = require("express");
const morgan = require("morgan");

const db = require("./data/database.js");
const verifyManager = require("./authenticate/verifyManager");
const sessionManager = require("./authenticate/sessionManager");

function parseUserData(username, data)
{
	if (data["dob"] && !parseInt(data["dob"]))
		throw new TypeError("Date of birth is not epoch");

	if (data["password"] && data["password"].length < 8)
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
	let email = req.query["email"];

	if (username)
		user = await db.getUser(username);
	else {
		user = await db.getUserByEmail(email);
		username = await db.getUsernameByEmail(email)
	}

	let response = {
		registered: false,
		password: false,
		data: null,
		sessionId: null,
		error: null
	};

	if (user != null) {
		response.registered = true;
		if (user.password === req.query["password"]) {
			response.password = true;
			response.sessionId = sessionManager.newSession(username);
			response.data = Object.assign({}, user);
			delete response.data.password;
		}
	};

	res.json(response);
})

app.get("/verify", async (req, res) => {
	let email = req.query.email;
	let verifyCode = req.query.verifycode;
	let response = {
		verified: false,
		verifyCodeSent: false,
		error: null
	}

	if (verifyCode) {
		if (verifyManager.verify(email, verifyCode))
			response.verified = true;
	}
	else if (email) {
		verifyManager.newLoginSession(email);
	}

	if (verifyManager.getSession(email))
		response.verifyCodeSent = true;

	res.json(response);
})

app.get("/forgotpassword", async (req, res) => {
	let email = req.query.email;
	let password = req.query.password;
	let response = {
		registered: false,
		passwordUpdated: false,
		error: null
	}
	
	if (!verifyManager.getSession(email).verified)
		response.error = "email not verified";
	else if (password) {
		if (response.verified) {
			db.updateFieldByEmail(email, "password", password);
			verifyManager.deleteSession(email);
			response.passwordUpdated = true;
			response.registered = true;
		}
	}
	else if (await db.getUserByEmail(email)) {
		verifyManager.newLoginSession(email);
		response.registered = true;
	};

	res.json(response);
})

app.get("/register", async (req, res) => {
	let response = {
		infoReceived: false,
		registrationCompleted: false,
		error: null,
	}

	try {
		let email = req.query.email;
		if (!email || !verifyManager.getSession(email).verified)
			throw new Error("email not verified");

		let username = req.query["username"];
		if (username) {
			if (!username.match(/^[a-zA-Z]/))
				throw new Error("invalid first character");
			else if (await db.getUser(username))
				throw new Error("username registered");
		}

		let userData = parseUserData(username, req.query);
		verifyManager.updateSessionData(email, userData);
		response.infoReceived = true;

		if (verifyManager.completed(email)) {
			let newUser = verifyManager.finalize(email);
			await db.registerUser(newUser.username, newUser.data);
			response.registrationCompleted = true;
		}
	}
	catch (e) {
		response.error = e.message;
	}

	res.json(response);
})

app.get("/product", (req, res) => {
	res.sendStatus(202);
})

function sessionHandle(req, res, next)
{
	let sessionId = req.query.sessionid;
	let response = {
		sessionExisted: false,
		sessionExpired: false,
		error: null
	}

	let check = sessionManager.check(sessionId);
	if (check !== null) {
		response.sessionExisted = true;
		if (!check)
			response.sessionExpired = true;
	}

	res.locals.response = response;
	next();
}

app.use("/delete", sessionHandle);

app.get("/delete", async (req, res) => {
	let sessionId = req.query.sessionid;
	let response = res.locals.response;

	sessionManager.deleteSession(sessionId);

	try {
		await db.deleteUser(sessionManager.getUser(sessionId));
		response.accountDeleted = true;
	}
	catch (e) {
		response.accountDeleted = false;
		response.error = e.message;
	}

	res.json(response);
})

app.use("/edit", sessionHandle)

app.get("/edit", async (req, res) => {
	let username = sessionManager.getUser(req.query.sessionId);
	let response = res.locals.response;
	
	try {
		await db.updateFields(username, req)
		response.infoUpdated = true;
	}
	catch (e) {
		response.infoUpdated = false;
		response.error = e.message;
	}

	res.json(response);
})

app.listen(port, () => { console.log(`Listening on port ${port}`); });