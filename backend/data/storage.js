const firebaseSt = require("firebase-admin/storage");

exports.Storage = class Storage
{
	constructor(app)
	{
		this.ready = false;
		this.fileDuration = 1000 * 60 * 60 * 24 * 7;
		this.bucket = firebaseSt.getStorage(app).bucket();
		
		this.bucket.exists().then((res) => {
			if (res[0])
				console.log("Connected to storage");
			else
				throw new Error("Can't connect to storage");

			this.ready = true;
		})
	}

	async getFileUrl(path)
	{
		let file = this.bucket.file(path);
		let exists = await file.exists();

		if (!exists[0])
			return null;

		let urls = await file.getSignedUrl({
			action: "read", 
			expires: Date.now() + this.fileDuration
		});
		return urls[0];
	}

	async getProfilePicUrl(username)
	{
		let url = await this.getFileUrl(`users/${username}/profilepic.jpg`);

		if (!url)
			console.error(`${username}'s profile picture not found`);
		else
			console.log(`Got ${username} profile picture`);

		return url;
	}
	
	async getProductImageUrl(pid, num = 1)
	{
		let url = this.getFileUrl(`products/${pid}/${num}.jpg`);
		if (!url)
			console.error(`${pid}'s image no.${num} not found`);

		return url;
	}
}