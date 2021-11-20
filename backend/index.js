const express = require("express");
const morgan = require("morgan")
const firebase = require("./firebase");

const app = express();
app.use(morgan("short"));

app.post("/login", async (req, res) => {
	let data = req.body;
	console.log(data);
	res.send("Ok");
})

app.listen(3000, () => { console.log("Listening on port 3000"); });