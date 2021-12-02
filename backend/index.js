const express = require("express");
const morgan = require("morgan");

const db = require("./data/database.js");
const registerManager = require("./authenticate/registerManager");

function parseUserData(username, data)
{
	if (data["dob"] && !parseInt(data["dob"]))
		throw new TypeError("Date of birth is not epoch");

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
		res.json({ registered: true });
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
	res.json({ registered: false, verifyCodeSent: true });
})

app.get("/forgotpassword", (req, res) => {
	let email = req.query.email;
	let code = req.query.verifycode;
	let password = req.query.password;

	if (password) {
		if (registerManager.getSession(email).verified) {
			db.updateFieldByEmail(email, "password", password);
			registerManager.deleteSession(email);
			res.json({ passwordUpdated: true });
		}
		else 
			res.json({ passwordUpdated: false });
		return;
	}
	
	if (code) {
		if (registerManager.verify(email, code)) {
			res.json({ verified: true });
		}
		else
			res.json({ verified: false });
		return;
	}

	if (db.getUserByEmail(email)) {
		registerManager.newLoginSession(email);
		res.json({ registered: true, verifyCodeSent: true });
		return;
	};

	res.json({ registered: false });
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
			error = "username registered";

		if (error) {
			res.json({
				invalid: true,
				reason: error
			});
			return;
		}
	}

	// Parse user data
	let userData;
	try {
		userData = parseUserData(username, req.query);
	}
	catch (e) {
		res.json({ error: e.message });
		return;
	}
	registerManager.updateSessionData(email, userData);
	
	// Write to database when date is completed
	if (registerManager.completed(email)) {
		let newUser = registerManager.finalize(email);
		await db.registerUser(newUser.username, newUser.data);
		res.json({ registered: true });
		return;
	}

	res.json({ infoReceived: true });
})

app.get("/product", (req, res) => {
	res.sendStatus(202);
})

app.listen(port, () => { console.log(`Listening on port ${port}`); });