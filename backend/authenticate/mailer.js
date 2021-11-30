const mailer = require("nodemailer");

const transport = mailer.createTransport({
	service: "Gmail",
	auth: {
		user: "",
		pass: ""
	}
})

exports.sendVerifyMail = function(code, mailAddress) {
	let message = {
		to: mailAddress,
		subject: "Shopii verification",
		text: `Your test code is ${code}`
	}
	
	transport.sendMail(message, (err, info) => {
		if (err) {
			console.error(err);
			return;
		}
	
		console.log(`Sent verify email`);
	})
}