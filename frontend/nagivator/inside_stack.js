//import basic needed module of react native:
import React from "react";
import { createStackNavigator, 
        TransitionPresets, 
} from "@react-navigation/stack";

//import screens:
import Tabs from "./inside_tabs";
import SearchResultScreen from "../inside_screens/search_result_screen";
import ProductScreen from "../inside_screens/product_screen";
import UserProfile from "../inside_screens/user_profile";
import UserAccount from "../inside_screens/user_account";
import Shoppingcart from "../inside_screens/shoppingcart";
import MyOrder from "../inside_screens/ordered_screen";


const Stack = createStackNavigator();

const InsideStack = ({route}) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
            }}  
            initialRouteName="Tabs"
        >
            <Stack.Screen
                name="Tabs" component={Tabs}
                options={{
                    ...TransitionPresets.ScaleFromCenterAndroid,
                }}
            />

            <Stack.Screen
                name="Search result" component={SearchResultScreen}
            />

            <Stack.Screen
                name="Product detail" component={ProductScreen}
            />

            <Stack.Screen
                name="My Profile" component={UserProfile}
            />

            <Stack.Screen
                name="My Account" component={UserAccount}
            />

            <Stack.Screen
                name="My Shopping cart" component={Shoppingcart}
            />

            <Stack.Screen
                name="My Order" component={MyOrder}
            />
        </Stack.Navigator>
    )
}

export default InsideStack;