//import all needed module of react native:
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, 
        TransitionPresets, 
} from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//import screen components:
import Login from './../outside_screens/login';
import MailInput from './../outside_screens/mail_input';
import MailVerify from './../outside_screens/mail_verify';
import InforInput from "./../outside_screens/infor_input";
import UsnPwdCreate from "../outside_screens/usnpwd_create";
import ChangePwd from './../outside_screens/changepwd';
import InsideStack from "./inside_stack";

//import colors for style:
import {Colors} from "./../components/style_components";

//import icons:
import { Ionicons } from "@expo/vector-icons";


import { CredentialsContext } from './../components/context_component';


const {brand} = Colors;
const Stack = createStackNavigator();

const RootStack = () => {
    return (
        <CredentialsContext.Consumer>
            {({storedCredentials}) => (
                <NavigationContainer>
                    <Stack.Navigator
                    screenOptions={{
                        headerTintColor: brand,
                        headerShown: false,
                        headerTitle: '',
                        headerLeftContainerStyle: {
                            paddingleft: 20
                        },
                        headerTitleStyle: {
                            fontSize: 25,
                        },
                        headerShadowVisible: false,
                        headerBackImage: () => 
                            <Ionicons name="chevron-back" 
                                size={30} color={brand}/>,
                        ...TransitionPresets.SlideFromRightIOS,
                    }}  
                    initialRouteName="Inside Stack"
                    >
                        <Stack.Screen 
                            name="Inside Stack" component={InsideStack}
                            options={{
                                ...TransitionPresets.DefaultTransition,
                                gestureDirection:"horizontal-inverted",
                            }}
                        />
    
                        <Stack.Screen options={{
                        title:"Login",
                        headerTitleAlign:'center',
                        headerBackImage: () => 
                            <Ionicons name="chevron-down" 
                                size={30} color={brand}/>,
                        ...TransitionPresets.RevealFromBottomAndroid,
                        }}
                        name="Login" component={Login}/>
    
                        <Stack.Screen options={{
                        title:"Mail Input",
                        headerTitleAlign:'center',
                        }}
                        name="MailInput" component={MailInput}/>
    
                        <Stack.Screen options={{
                        title:"Mail verify",
                        headerTitleAlign:'center',
                        }}
                        name="MailVerify" component={MailVerify}/>
    
                        <Stack.Screen options={{
                        title:"Personal information",
                        headerTitleAlign:'center',
                        }}
                        name="InforInput" component={InforInput}/>
    
                        <Stack.Screen options={{
                        title:"Create account",
                        headerTitleAlign:'center',
                        }}
                        name="UsnPwdCreate" component={UsnPwdCreate}/>
    
                        <Stack.Screen options={{
                        title:"Change password",
                        headerTitleAlign:'center',
                        }}
                        name="ChangePwd" component={ChangePwd}/>
                    </Stack.Navigator>
                </NavigationContainer>
            )}
        </CredentialsContext.Consumer>
    )
}

export default RootStack;