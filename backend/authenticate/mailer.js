const mailer = require("nodemailer");

const transport = mailer.createTransport({
	service: "Gmail",
	auth: {
		user: "",
		pass: ""
	}
})

exports.sendVerifyMail = function(code, mailAdress) {
	let message = {
		to: mailAdress,
		subject: "Shopii verification",
		text: `Your test code is ${code}`
	}
	
	transport.sendMail(message, (err, info) => {
		if (err) {
			console.error(err);
			return;
		}
	
		console.log(`Sent: ${info.messageId}`);
	})
}