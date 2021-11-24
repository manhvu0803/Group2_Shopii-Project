const express = require("express");
const morgan = require("morgan");
const firebase = require("./firebase");

let port = 3000;
if (process.argv.length > 2) port = parseInt(process.argv[2]);

const app = express();
app.use(morgan("short"));

app.get("/login", async (req, res) => {
	let username = req.query["username"];
	user = firebase.getUser(username);
	
	let respond = {existed: false, password: false, data: null};
	if (user != null) {
		respond.existed = true;
		if (user.password === req.query["password"]) {
			delete user.password;
			respond.password = true;
			respond.data = user
		}
	};

	res.json(respond);
})

app.post("/register", (req, res) => {
	let username = req.query["username"]
	let userData = {
		password: req.query["password"],
		age: req.query["age"],
		address: req.query["address"],
		email: req.query["email"],
		phone: req.query["phone"],
		sex: req.query["sex"]
	}
})

app.listen(port, () => { console.log(`Listening on port ${port}`); });