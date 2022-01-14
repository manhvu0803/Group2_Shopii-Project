The server is hosted at https://shopii-spirit.herokuapp.com

## Ready
/ready

Respond true if the server is ready

## Login
/login?username={username}&password={password}

/login?email={email address}&password={password}

Respond: a json that contain:
- registered: true if the user exists
- password: true if the password is correct
- sessionId: the ID of this login session
- data: contain user data if the user exists and the password is correct
- error: null if there aren't any error

## Verify
/verify?email={email address}

The server will sent a code to that mail address

/verify?email={email address}&verifycode={code}

Respond: a json that contain:
- verified: true if the email is verified and ready to be used
- verifyCodeSent: true if the code is sent

## Register
/register?email={verified email address}&{user info queries}

Password string must have 8 or more characters

Respond: A json that contains
- infoReceived: true if the info is received properly
- registrationCompleted: true if the user info is completed and user is registered
- error: null if there aren't any error

## Forgot password
/forgotpassword?email={verified email address}&password={string with length > 8}

Respond: a json that contains:
- registered: true if the email is linked with an account and can be used to reset password
- passwordUpdated: true if the the email is verified and the password is updated
- error: null if there aren't any error

## Edit account info
/edit?sessionid={session ID}&{user info queries}

Respond: a json that contains:
- sessionExisted: true if the session ID is correct
- sessionExpired: true if the session is still active
- error: null if there aren't any error
- infoUpdated: true if user info is edited

## Delete account
/delete?sessionid={session ID}

Respond: a json that contains:
- sessionExisted: true if the session ID is correct
- sessionExpired: true if the session is still active
- error: null if there aren't any error
- accountDeleted: true if user info and account is deleted


## Get product categories
/category
Respond: list of categories

## Get product
/product?pid={product id}<br/>
/product?category={category name}&page={page number}<br/>
/product?searchquery={query string}

Respond: a json that contains:
- existed: true if there are at least 1 product
- categoryExisted: true if the category exists
- error: null if there aren't any error
- data: product(s) data