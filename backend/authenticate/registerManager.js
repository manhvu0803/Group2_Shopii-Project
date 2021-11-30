const mailer = require("./mailer");

const sessions = new Map();
const sessionDuration = 1000 * 60 * 60 * 24;

exports.checkExpiration = function(email)
{
	return sessions.get(email).timeCreated - Date.now() > sessionDuration;
}

exports.newLoginSession = function(email)
{
	let code = Math.floor(Math.random() * 900000) + 100000;
	sessions.set(email, {timeCreated: Date.now(), verifyCode: code});
	mailer.sendVerifyMail(code, email);
}

exports.verify = function(email, code)
{
	return exports.checkExpiration(email) && code === sessions.get(email).verifyCode;
}

exports.updateSessionData = function(email, newData)
{
	let data = sessions.get(email);
	for (let prop in newData)
		data[prop] = newData[prop];
}

exports.removeSessionData = function(email, property)
{
	delete sessions.get(email)[property];
}

exports.getSession = function(email)
{
	if (exports.checkExpiration(email))
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