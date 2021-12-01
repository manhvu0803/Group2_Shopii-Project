const mailer = require("./mailer");
const firestore = require("firebase-admin/firestore")

const sessions = new Map();
const sessionDuration = 1000 * 60 * 30; // 60 minutes

exports.expired = function(email)
{
	let obj = sessions.get(email);
	if (!obj)
		return true;
	return Date.now() - obj.timeCreated > sessionDuration;
}

exports.newLoginSession = function(email)
{
	let code = Math.floor(Math.random() * 900000) + 100000;
	sessions.set(email, {timeCreated: Date.now(), verifyCode: code});
	mailer.sendVerifyMail(code, email);
}

exports.verify = function(email, code)
{
	if (!exports.expired(email) && code == sessions.get(email).verifyCode) {
		sessions.get(email).verified = true;
		console.log("Verified email");
		return true;
	}
	return false;
}

exports.updateSessionData = function(email, newData)
{
	if (!sessions.get(email).verified)
		return;
	let data = sessions.get(email);
	for (let prop in newData)
		if (newData[prop])
			data[prop] = newData[prop];
}

exports.removeSessionData = function(email, property)
{
	delete sessions.get(email)[property];
}

exports.getSession = function(email)
{
	if (exports.expired(email))
		return null;
	return sessions.get(email);
}

exports.deleteSession = function(email)
{
	return sessions.delete(email);
}

exports.completed = function(email)
{
	let data = sessions.get(email);
	return data.username_ && data.password && data.dob && data.address && data.phone && data.sex
}

exports.finalize = function(email_)
{
	let dt = sessions.get(email_);;
	let newUser = {
		username: dt.username_,
		data: {
			password: dt.password,
			dob: firestore.Timestamp.fromMillis(parseInt(dt.dob)),
			address: dt.address,
			phone: dt.phone,
			sex: dt.sex,
			email: email_
		}
	}
	sessions.delete(email_);
	return newUser;
}