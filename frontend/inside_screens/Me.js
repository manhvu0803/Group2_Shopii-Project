//import part:
//base components of react-native:
import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import {View, Text, 
        ActivityIndicator, TouchableOpacity
} from "react-native";

//style components:
import{ StyledContainer, Innercontainer, window_width,
        Logo, StyledSearchInput,
        StyledFormArea, StyledInputLabel, StyledTextInput,
        LeftIcon, RightIcon, StyledButton, ButtonText,
        Msgline, Emptyline,
        ExtraView, ExtraText, ExtraLink, ExtraTextLink,
        SocialButtonPart, Colors, StatusBarHeight
} from "./../components/style_components";

//icon components:
import {Octicons, Ionicons, AntDesign, 
        Fontisto, MaterialIcons, Entypo
} from "@expo/vector-icons";

//scroll component:
import Scroll_component from './../components/scroll_component';

//header component:
import {HomeHeader, SearchHeader} from '../components/header_components';

//formik:
import { Formik } from 'formik';

//Colors:
const {brand, darklight, white, i_extra} = Colors;

const render_header = ({navigation}) => {
    return(
        <View style={{
                backgroundColor: brand,
                paddingTop: StatusBarHeight + 6,
                paddingLeft: 10,
                paddingRight: 0,
        }}>
            <StyledFormArea style={{
                width: '90%'}}>
                <StyledButton google={true} style={{
                    width: '25%', height: 35,
                    left: window_width*73/100,
                    marginBottom: 10,
                    backgroundColor: "white"}}
                    onPress = {() => {
                        navigation.navigate("Home");
                    }}
                >
                    <ButtonText 
                        style={{
                            color: brand,
                            paddingRight: 0,
                            fontSize: 14       
                        }}>
                        Logout
                    </ButtonText>
                </StyledButton>
            </StyledFormArea>
        </View>
    )
}

const MeScreen = ({navigation, route}) => {
    return (
        <StyledContainer style={{
        }}>
            <Innercontainer style={{
                alignItems: 'stretch', 
                paddingLeft: 0, 
                paddingRight: 0,
            }}>
                <StatusBar style = "light"/>
                
                {render_header({navigation})}
                <Scroll_component>
                <NavigatePart navigation={navigation}
                                type="profile"
                                text="My Profile"/>
                
                <NavigatePart navigation={navigation}
                                type="account"
                                text="My Account"/>
                
                <NavigatePart navigation={navigation}
                                type="shop"
                                text="My Shop"/>
                
                <NavigatePart navigation={navigation}
                                type="shopping cart"
                                text="My Shopping cart"/>
                
                <NavigatePart navigation={navigation}
                                type="order"
                                text="My Order"/>
                </Scroll_component>
            </Innercontainer>
        </StyledContainer>
    )
}

const NavigatePart = ({navigation, text, type}) => {
    return (
        <TouchableOpacity 
            style={{marginTop: 15, marginBottom: 10}}
            onPress={() => {
                }}>
            <View 
            style={{
            width: '100%', height: 75,
            backgroundColor: "white",
            flexDirection: 'row',
            alignContent: 'center', alignItems:'center',
            elevation: 5}}
        >
            {type=="profile"&&<LeftIcon style={{top: 22, paddingLeft: 10}}>
                <AntDesign name="profile" 
                                size={30} color={i_extra}/>
            </LeftIcon>}

            {type=="account"&&<LeftIcon style={{top: 22, paddingLeft: 9.5}}>
                <MaterialIcons name="account-box" size={30} color={i_extra}/>
            </LeftIcon>}

            {type=="shop"&&<LeftIcon style={{top: 22, paddingLeft: 9.5}}>
                <Entypo name="shop" size={30} color={i_extra}/>
            </LeftIcon>}

            {type=="shopping cart"&&
            <LeftIcon style={{top: 22, paddingLeft: 8.4}}>
                <AntDesign name="shoppingcart" size={30} color={i_extra}/>
            </LeftIcon>}

            {type=="order"&&<LeftIcon style={{top: 22, paddingLeft: 10}}>
                <Octicons name="package" size={30} color={i_extra}/>
            </LeftIcon>}
                <View style={{paddingLeft: 50}}>
                    <Text style={{fontSize: 20, fontWeight:'bold'}}>
                        {text}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default MeScreen;