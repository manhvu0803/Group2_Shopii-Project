## What we have done:
This folder contains all the screens finished of project, which includes:
_Outside screens such as login screen, sign-up screen, get back password screen.
_Inside screens such as home, me, my shopping cart, my order, my account, my profile.

All the screens is impletemented with expo react native.


## Needed packages:
The packages need to have to run those files are (will update when needed):
_expo-cli (install by using command npm install -g expo-cli)
_formik (install by using command expo install formik)
_styled-components (install by using command expo install styled-components)
_expo-constants (install by using command expo install expo-constants)
_date time picker pakage (install by using command expo install @react-native-community/datetimepicker)
_navigation pakages (installby using these commands:
			+npm install @react-navigation/native
			+expo install react-native-screens react-native-safe-area-context
			+npm install @react-navigation/native-stack
)
_axios (install by using command expo install axios)
_async-storage (install by using command npm install @react-native-async-storage/async-storage)


## How to run the project:
After having installed all need packages, to run the project correctly with expo (until now):
_Create a project by using expo init <Project's name>
_Put all folder and App.js (inside frontend folder) into the folder of the project which you was just created.
_Copy all image in folder pics and put into the folder assets 
(it will be created automatically when project is created).
_Open the project folder in your IDE (for us, we used VSCode).
_Open file app.json and change the path of "icon" to ./assets/my_icon.png 
and the path of "image" (of "splash") to "./assets/my_splash.png"
_Make sure to installed the android SDK and have 1 AVD (Android Virtual Device) 
or you can use your real Android phone.
_Open terminal, cd to project folder, run npm start to start the project.
_On the website opened, choose to run on Android Virtual Device or real device 
(do not run on iphone because our app is made to work on android).
(Not sure if these files can work with project created with react-native-cli)


## Request (copy from readme.md of backend):
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
/product?pid={product id}
/product?category={category name}&page={page number}
/product?searchquery{query string}

Respond: a json that contains:
- existed: true if there are at least 1 product
- categoryExisted: true if the category exists
- error: null if there aren't any error
- data: product(s) data