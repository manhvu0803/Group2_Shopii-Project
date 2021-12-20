//import basic needed module of react native:
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { createBottomTabNavigator, 
        BottomTabBar,     
} from "@react-navigation/bottom-tabs";

//import screens:
import HomeScreen from "../inside_screens/homescreen";
import SearchResultScreen from "../inside_screens/search_result_screen";
import MeScreen from "../inside_screens/Me";

//import icons:
import { Ionicons } from "@expo/vector-icons";

//import colors for style:
import {Colors} from "./../components/style_components";


const {brand, darklight} = Colors;

const bottomTab = createBottomTabNavigator();

const Tabs = ({navigation, route}) => {
    var isLogin = route.params ? route.params.isLogin : false;
    isLogin = true;
    console.log("Tabs:", isLogin)
    return (
        <bottomTab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    borderTopWidth: 1,
                    elevation: 0,
                    height: 65,
                },
                tabBarLabelStyle: {
                    fontSize: 14,
                    paddingBottom: 7,
                },
                tabBarIconStyle: {
                    marginTop: 7
                }
            }}
            initialRouteName="Home"
        >
            <bottomTab.Screen
                name="Home"
                component={HomeScreen}
                initialParams={{isLogin}}
                options={{
                    tabBarIcon: ({focused=true}) => (
                        <Ionicons
                            name={focused ? "home" : "home-outline"}
                            size={30} 
                            color={focused ? brand : darklight}
                        />
                    )
                }}
            />

            <bottomTab.Screen
                name="Me"
                component={MeScreen}
                options={{
                    tabBarIcon: ({focused=true}) => (
                        <Ionicons
                            name={focused ? "person" : "person-outline"}
                            size={30} 
                            color={focused ? brand : darklight}
                        />
                    ),
                }}
                listeners={{
                    navigation: navigation,
                    tabPress: (e) => {
                        if (isLogin===false){
                            e.preventDefault();
                            navigation.navigate("Login", {isLogin});
                        }
                    }
                }}
            />
        </bottomTab.Navigator>
    )
}

export default Tabs;