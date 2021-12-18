const firebaseSt = require("firebase-admin/storage");

exports.Storage = class Storage
{
	constructor(app)
	{
		this.ready = false;
		this.bucket = firebaseSt.getStorage(app).bucket();
		
		this.bucket.exists().then((res) => {
			if (res[0])
				console.log("Connected to storage");
			else
				throw new Error("Can't connect to storage");

			this.ready = true;
		})
	}

	async getProfilePicUrl(username)
	{
		let duration = 1000 * 60 * 60 * 24;
		let file = this.bucket.file(`users/${username}/profilepic.jpg`);
		let exists = await file.exists();

		if (!exists[0]) {
			console.error(`${username}'s profile picture not found`);
			return null;
		}
		
		console.log(`Got ${username} profile picture`);
		let urls = await file.getSignedUrl({action: "read", expires: Date.now() + duration});
		return urls[0];
	}
}