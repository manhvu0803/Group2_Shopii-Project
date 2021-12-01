The server is hosted at shopii-spirit.herokuapp.com
To access the server, contact nmvu19

Ready
https://shopii-spirit.herokuapp.com/ready
Respond true if the server is ready

Login
https://shopii-spirit.herokuapp.com/login?username=<username>&password=<password>
Respond: a json that contain:
- existed: true if the user exists
- password: true if the password is correct
- sessionId: the ID of this login session,
- data: contain user data if the user exists and the password is correct

Register
https://shopii-spirit.herokuapp.com/verify?email=<email address>
The server will sent an email to that address
Respond: a json that contain:
- existed: true if that mail address is already registered
- verifyCodeSent: true if the code is sent
https://shopii-spirit.herokuapp.com/verify?email=<email address>&verifycode=<code>
Respond: a json that contain:
- verified: true if the code is correct

Register
https://shopii-spirit.herokuapp.com/register?email=<verified email address>&<user info queries>
Respond:
	200 OK if the server has received the data
	A json {invalid: bool, reason: "..."} if the username is invalid
