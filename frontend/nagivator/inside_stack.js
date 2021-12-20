//import basic needed module of react native:
import React from "react";
import { createStackNavigator, 
        TransitionPresets, 
} from "@react-navigation/stack";

//import screens:
import Tabs from "./inside_tabs";
import SearchResultScreen from "../inside_screens/search_result_screen";
import UserProfile from "../inside_screens/user_profile";


const Stack = createStackNavigator();

const InsideStack = ({route}) => {
    var isLogin = route.params ? route.params.isLogin : false;
    console.log("Inside Stack:", isLogin)
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
            }}  
            initialRouteName="Tabs"
        >
            <Stack.Screen
                name="Tabs" component={Tabs} initialParams={{isLogin}}
            />

            <Stack.Screen
                name="Search result" component={SearchResultScreen}
            />

            <Stack.Screen
                name="My profile" component={UserProfile}
            />

            <Stack.Screen
                name="My account" component={SearchResultScreen}
            />

            <Stack.Screen
                name="My shop" component={SearchResultScreen}
            />
        </Stack.Navigator>
    )
}

export default InsideStack;