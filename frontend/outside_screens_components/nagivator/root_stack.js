import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from './../outside_screens/login';
import Signup from './../outside_screens/signup';
import ForgotPwd from './../outside_screens/forgot_pwd';

import {Colors} from "./../components/style_components";


const {primary, tertiary} = Colors;
const Stack = createNativeStackNavigator();

const RootStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'transparent'
                },
                headerTintColor: tertiary,
                headerTitle: '',
                headerLeftContainerStyle: {
                    paddingleft: 20
                }
            }}  
            initialRouteName="Login"
            >
                <Stack.Screen options={{headerShown:false}}
                name="Login" component={Login}/>
                <Stack.Screen options={{animation:'slide_from_right',
                headerShadowVisible: false}}
                name="Signup" component={Signup}/>
                <Stack.Screen options={{animation:'slide_from_right',
                headerShadowVisible: false}}
                name="ForgotPwd" component={ForgotPwd}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootStack;