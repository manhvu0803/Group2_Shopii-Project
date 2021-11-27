const firebase = require("firebase-admin/app")
const firestore = require("firebase-admin/firestore")
const serviceAccount = require("./ServiceAccountKey.json")

const app = firebase.initializeApp({
	credential: firebase.cert(serviceAccount)
});

const db = firestore.getFirestore();

const users = new Map()
const emailMap = new Map()

db.collection("accounts").get().then((res) => {
	console.log("Got user data from database");
	res.forEach((doc) => {
		let data = doc.data();
		users.set(doc.id, data);
		if (data.email)
			emailMap.set(data.email, data);
	})
});

exports.getUser = function(username, debug=false)
{
	if (users.has(username))
		return users.get(username);
	else {
		if (debug)
			console.log(`User '${username}' does not exists`)
		return null;
	}
}

exports.getUserByEmail = function(mailAdress, debug=false)
{
	if (emailMap.has(mailAdress))
		return emailMap.get(mailAdress);
	else {
		if (debug)
			console.log(`Can't find '${mailAdress}' in the database`)
		return null;
	}
}

exports.newUser = async function(username, userData)
{
	if (userData.password.length < 8) {
		console.log("Password is too short");
		return;
	}
	
	users.set(username, userData);
	const userDoc = await db.collection("accounts").doc(username);
	await userDoc.set(userData)
	
	console.log("New user written to database successfully");
}