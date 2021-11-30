This folder contains all the outside screens, which includes:
_login screen (done UI, done with login process, try to make the sign in with Google and Facebook work)
_sign-up screen (second version UI, wait to text the sign-up process)
_get back password screen (second version UI, wait to text the change password process)
All the screens is impletemented with expo react native.


The packages need to have to run those file are (will update when needed):
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


To run the project correctly with expo (until now):
_Create a project by using expo init <Project's name>
_Put outside_screens, components, navigator folder into the folder of the project which you was just created
_Put the image Logo.png in to the assets folder (will be generate automatically with your project)
_Only import RootStack from './nagivator/root_stack'; in Apps.js file to run the project.
(Not sure if these files can work with project created with react-native-cli)

Request:
_Login: https://wise-jellyfish-33.loca.lt/login?username=<username>&password=<password>
_Mail input: https://wise-jellyfish-33.loca.lt/mailinput?email=<email>
_Mail verify: "https://wise-jellyfish-33.loca.lt/mailverify?email=<email>&verifycode=<codeverify>
_Information input: https://wise-jellyfish-33.loca.lt/information_input?email=<email>&fullname=<fullname>&dateofbrith=<dateOfBirth>&phoneumber=<phonenb>&gender=<gender>&address=<address>
_Create username and password: https://wise-jellyfish-33.loca.lt/create_username_pass?email=<email>&username=<username>&password=<password>
_Change password: https://wise-jellyfish-33.loca.lt/changepassword?email=<email>&newpassword=<newpassword>