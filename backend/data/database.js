const firebase = require("firebase-admin/app");
const firestore = require("firebase-admin/firestore");
const fireStorage = require("./storage");

const serviceAccount = require("./ServiceAccountKey.json");

const app = firebase.initializeApp({
	credential: firebase.cert(serviceAccount),
	storageBucket: "projectshopiicnpm-d6027.appspot.com"
});

const db = firestore.getFirestore();

const users = new Map();
const emailMap = new Map();
//const products = new Map();

const storage = new fireStorage.Storage(app);

var ready = false;

db.collection("users").get().then((res) => {
	res.forEach((doc) => {
		let data = doc.data();
		users.set(doc.id, data);
		if (data.email)
			emailMap.set(data.email, data);
	});
	exports.ready = true;
	console.log(`Loaded ${users.size} users`);
});

/*
db.collection("products").get().then((res) => {
	res.forEach((doc) => {
		products.set(doc.id, doc.data());
	});
	console.log(`Loaded ${products.size} products`);
})
*/

exports.ready = function()
{
	return isReady && storage.ready;
};

exports.getUser = async function(username, debug=false)
{
	if (!users.has(username)) {
		if (debug)
			console.log(`User '${username}' does not exists`);
		return null;
	}
	
	let data = users.get(username);
	if (!data.profilePic)
		data.profilePic = await storage.getProfilePicUrl(username);
	return data;
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

exports.registerUser = async function(username, userData)
{
	if (userData.password.length < 8) {
		console.log("Password is too short");
		return;
	}
	
	users.set(username, userData);
	const userDoc = await db.collection("users").doc(username);
	await userDoc.set(userData)
	
	console.log("New user written to database successfully");
}

exports.getProduct = function(pid)
{
	return productId.get(pid);
}