const firebase = require("firebase-admin/app")
const firestore = require("firebase-admin/firestore")
const serviceAccount = require("./ServiceAccountKey.json")

const app = firebase.initializeApp({
	credential: firebase.cert(serviceAccount)
});

const db = firestore.getFirestore();

const users = new Map()

db.collection("accounts").get().then((res) => {
	res.forEach((doc) => {
		let data = doc.data().password;
		users.set(doc.id, data);
	})
});

exports.getUsers = function(username, debug=false)
{
	if (users.has(username))
		return data;
	else {
		if (debug)
			console.log(`User '${username}' does not exists`)
		return null;
	}
}

exports.newUser = async function(username, password)
{
	if (password.length < 8) {
		console.log("Password is too short");
		return;
	}
	
	users.set(username, password);
	const user = await db.collection("accounts").doc(username);
	await user.set({
		password: password
	})
	
	console.log("User set up successfully");
}