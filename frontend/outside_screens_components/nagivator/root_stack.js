import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from './../outside_screens/login';
import MailInput from './../outside_screens/mail_input';
import MailVerify from './../outside_screens/mail_verify';
import InforInput from "./../outside_screens/infor_input";
import ChangePwd from './../outside_screens/changepwd';

import {Colors} from "./../components/style_components";


const {brand} = Colors;
const Stack = createNativeStackNavigator();

const RootStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
            screenOptions={{
                headerTintColor: brand,
                headerTitle: '',
                headerLeftContainerStyle: {
                    paddingleft: 20
                }
            }}  
            initialRouteName="Login"
            >
                <Stack.Screen options={{title:"Login page",
                headerTitleAlign:'center',
                headerTitleStyle: {fontWeight: 'bold',
                fontSize: 30,
                }}}
                name="Login" component={Login}/>

                <Stack.Screen options={{
                title: "Mail input",
                headerTitleAlign:'center',
                headerTitleStyle: {fontWeight: 'bold',
                fontSize: 30,
                }}}
                name="MailInput" component={MailInput}/>

                <Stack.Screen options={{
                title: "Mail verifying",
                headerTitleAlign:'center',
                headerTitleStyle: {fontWeight: 'bold',
                fontSize: 30,
                }}}
                name="MailVerify" component={MailVerify}/>

                <Stack.Screen options={{
                title:"Sign-up",
                headerTitleAlign:'center',
                headerTitleStyle: {fontWeight: 'bold',
                fontSize: 30,
                }}}
                name="InforInput" component={InforInput}/>

                <Stack.Screen options={{
                title:"Change password",
                headerTitleAlign:'center',
                headerTitleStyle: {fontWeight: 'bold',
                fontSize: 30,
                }}}
                name="ChangePwd" component={ChangePwd}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootStack;