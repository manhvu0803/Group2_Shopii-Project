The server is hosted at https://shopii-spirit.herokuapp.com

## Ready

/ready

Respond true if the server is ready

## Login
/login?username={username}&password={password}

Respond: a json that contain:
- registered: true if the user exists
- password: true if the password is correct
- sessionId: the ID of this login session,
- data: contain user data if the user exists and the password is correct

## Verify
/verify?email={email address}

The server will sent an email to that address

Respond: a json that contain:
- registered: true if that mail address is already registered
- verifyCodeSent: true if the code is sent

/verify?email={email address}&verifycode={code}

Respond: a json that contain:
- verified: true if the code is correct

## Register
/register?email={verified email address}&{user info queries}

Respond: A json that contains
- {verified: false} if the email isn't verified
- {infoReceived: true} if the info is received properly
- {invalid: bool, reason: "..."} if the username is invalid
- {registrationCompleted: true} if the user info is completed and user is registered

## Forgot password
/forgotpassword?email={email address}

Respond: a json that contain:
- registered: true if that mail address is already registered
- verifyCodeSent: true if the code is sent

/forgotpassword?email={email address}&verifycode={code}

Respond: a json that contain:
- verified: true if the code is correct

/forgotpassword?email={verified email address}&password={code}

Respond: a json that contains:
- passwordUpdated: true if the the email is verified and the password is updated