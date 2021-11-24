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

app.get("/register", (req, res) => {
	let username = req.query["username"]
	let userData = {
		Password = req.query["password"],
		Age = req.query["age"],
		Address = req.query["address"],
		Email = req.query["email"],
		Phone = req.query["phone"],
		Sex = req.query["sex"]
	}
})

app.listen(port, () => { console.log(`Listening on port ${port}`); });