//import part:
//base components of react-native:
import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import {View, Text, 
        ActivityIndicator, TouchableOpacity
} from "react-native";

//style components:
import{ StyledContainer, Innercontainer,
        Logo, StyledSearchInput, 
        StyledFormArea, StyledInputLabel, StyledTextInput,
        LeftIcon, RightIcon, StyledButton, ButtonText,
        Msgline, Emptyline,
        ExtraView, ExtraText, ExtraLink, ExtraTextLink,
        SocialButtonPart, Colors, StatusBarHeight
} from "./../components/style_components";

//icon components:
import {Octicons, Ionicons, AntDesign, 
        Fontisto, MaterialCommunityIcons
} from "@expo/vector-icons";

//scroll component:
import Scroll_component from './../components/scroll_component';

//header component:
import {HomeHeader, SearchHeader} from '../components/header_components';

//formik:
import { Formik } from 'formik';

//Colors:
const {brand, darklight, white, i_extra} = Colors;

const render_header = ({handleBlur, handleChange, 
                        handleSubmit, values, navigation}) => {
    const isLogin = values.isLogin;
    return(
        <View style={{
                backgroundColor: brand,
                paddingTop: StatusBarHeight + 8,
                paddingLeft: 10,
                paddingRight: 0,
        }}>
            <StyledFormArea style={{
                flexDirection: 'row',
                width: '90%'}}>
                <MySearchInput
                    placeholder="Searching here"
                    placeholderTextColor={darklight}
                    onChangeText={handleChange('search')}
                    onBlur={handleBlur('search')}
                    handleSubmit={handleSubmit}
                    value={values.search}
                />
                <TouchableOpacity style={{
                    top: 8,
                    left: 2,}}
                    onPress = {() => {
                        if (isLogin == true){
                            console.log("This is your shopping cart");
                        }
                        else{
                            navigation.navigate("Login", {isLogin});
                        }
                    }}
                >
                    <AntDesign name="shoppingcart"
                        size={30} color={white}/>
                </TouchableOpacity>
            </StyledFormArea>
        </View>
    )
}

const HomeScreen = ({navigation, route}) => {
    var isLogin = route.params.isLogin;
    console.log("Home:", isLogin)
    var app_reseted = true;
    const checkIslogin = (app_reseted) => {
        if (app_reseted == true){

        }

    }
    return (
        <Scroll_component scrollEnabled={false}>
            <StyledContainer style={{
            }}>
                <Innercontainer style={{
                    alignItems: 'stretch', 
                    paddingLeft: 0, 
                    paddingRight: 0,
                }}>
                    <StatusBar style = "light"/>
                    <Formik 
                        initialValues={{search: '', isLogin}}
                        onSubmit={(values) => {
                            if (values.search.length > 0){
                                console.log(values.search);
                                navigation.navigate("Search result", 
                                                    values);
                            }
                    }}>
                        {({handleChange, handleBlur,
                        handleSubmit, values}) =>
                        (
                            render_header({handleBlur, handleChange, 
                                        handleSubmit, 
                                        values, navigation})
                        )}
                    </Formik>
                </Innercontainer>
            </StyledContainer>
        </Scroll_component>
    )
}

const MySearchInput = ({handleSubmit, ...props}) => {
    return (
        <View style={{
            width: '98%',
            paddingRight: 5,
        }}>
            <StyledSearchInput {...props}/>
            <RightIcon 
                style={{top: 11.5}}
                onPress={handleSubmit}
            >
                    <Ionicons name="search-outline"
                        size={25} color={brand}/>
            </RightIcon>
        </View>
    )
}

export default HomeScreen;