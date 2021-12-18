const duration = 1000 * 60 * 60 * 24;
const sessions = new Map();

exports.newSession = function(username)
{
	let id = Math.floor(Math.random() * 10000000000000);
	let data = {
		username: username,
		created: Date.now(),
		lastUpdate: Date.now()
	};
	sessions.set(id, data);
	return id;
}

exports.getUser = function(id)
{
	return sessions.get(id).username;
}

exports.check = function(id)
{
	if (!sessions.has(id))
		return null;
		let data = sessions.get(id);
	if (data.lastUpdate + duration < Date.now())
		return false;
	
	data.lastUpdate = Date.now();
	return true;
}

exports.deleteSession = function(id)
{
	return sessions.delete(id);
}