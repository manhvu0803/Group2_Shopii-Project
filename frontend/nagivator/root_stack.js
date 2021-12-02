import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from './../outside_screens/login';
import MailInput from './../outside_screens/mail_input';
import MailVerify from './../outside_screens/mail_verify';
import InforInput from "./../outside_screens/infor_input";
import UsnPwdCreate from "../outside_screens/usnpwd_create";
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
                },
                headerTitleStyle: {
                    fontSize: 25,
                }
            }}  
            initialRouteName="Login"
            >
                <Stack.Screen options={{
                title:"Login",
                headerTitleAlign:'center',}}
                name="Login" component={Login}/>

                <Stack.Screen options={{
                title:"Mail Input",
                headerTitleAlign:'center',}}
                name="MailInput" component={MailInput}/>

                <Stack.Screen options={{
                title:"Mail verify",
                headerTitleAlign:'center',}}
                name="MailVerify" component={MailVerify}/>

                <Stack.Screen options={{
                title:"Personal information",
                headerTitleAlign:'center',}}
                name="InforInput" component={InforInput}/>

                <Stack.Screen options={{
                title:"Create account",
                headerTitleAlign:'center',}}
                name="UsnPwdCreate" component={UsnPwdCreate}/>

                <Stack.Screen options={{
                title:"Change password",
                headerTitleAlign:'center',}}
                name="ChangePwd" component={ChangePwd}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootStack;