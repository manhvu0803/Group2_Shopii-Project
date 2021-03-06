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
const products = new Map();
const categoryMap = new Map();
//const products = new Map();

const storage = new fireStorage.Storage(app);

var isReady = false;

db.collection("users").get().then((res) => {
	res.forEach((doc) => {
		let data = doc.data();
		data.username = doc.id;
		data.dob = data.dob.toDate().toISOString().split("T")[0];
		users.set(doc.id, data);
		if (data.email)
			emailMap.set(data.email, doc.id);
	});
	isReady = true;
	console.log(`Loaded ${users.size} users`);
});

db.collection("products").get().then((res) => {
	res.forEach(async (doc) => {
		let data = doc.data();
		data.pid = doc.id;
		data.imageUrl = [];
		for (let i = 0; i < 2; i++) {
			let url = await storage.getProductImageUrl(data.pid, 1);
			data.imageUrl.push(url);
		}
		products.set(doc.id, data);

		let cat = data.category;
		if (!categoryMap.has(cat))
			categoryMap.set(cat, []);
		categoryMap.get(cat).push(data);
	});
});

exports.ready = function()
{
	return isReady && storage.ready;
}

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
		return exports.getUser(emailMap.get(mailAdress));
	else {
		if (debug)
			console.log(`Can't find '${mailAdress}' in the database`)
		return null;
	}
}

exports.getUsernameByEmail = function(mailAdress, debug=false)
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
	users.set(username, userData);
	emailMap.set(userData.email, username);
	let userDoc = db.collection("users").doc(username);
	await userDoc.set(userData);
	userData.dob = userData.dob.toDate().toISOString().split("T")[0];
	console.log("New user written to database successfully");
}

exports.updateField = async function(username, fieldName, newData)
{
	let user = users.get(username);
	user[fieldName] = newData;
	let userDoc = db.collection("users").doc(username);
	await userDoc.set(user);

	console.log("User data is updated")
}

exports.updateFields = async function(username, newData)
{
	let user = users.get(username);
	for (prop in user)
		if (newData[prop] !== undefined)
			user[prop] = newData[prop];
	let userDoc = db.collection("users").doc(username);
	await userDoc.set(user);

	console.log("User data is updated")
}

exports.updateFieldByEmail = function(email, fieldName, newData)
{	
	exports.updateField(emailMap.get(email), fieldName, newData);
}

exports.deleteUser = async function(username)
{
	let email = users.get(username).email;
	users.delete(username);
	if (email)
		emailMap.delete(email);

	await db.collection("users").doc(username).delete();
	console.log(`Deleted user ${username}`);
}

exports.getProduct = function(pid)
{
	return products.get(pid);
}

// return a map iterator
exports.getProductCategory = function()
{
	return categoryMap.keys();
}

exports.getProductByCategory = function(category, page)
{
	let cnt = 5;
	let res = [];
	let pds = categoryMap.get(category);
	if (!pds)
		return null;
	for (let i = 0; i < cnt && (i + cnt * page) < pds.length; i++)
		res.push(pds[i + cnt * page]);
	return res;
}

exports.getProductByQuery = function(query)
{
	let cnt = 5, page;
	let res = [];
	products.values.forEach(val => {
		if (val.name.includes(query) || val.description.includes(query))
			res.push(val);
	});
	return res;
}

