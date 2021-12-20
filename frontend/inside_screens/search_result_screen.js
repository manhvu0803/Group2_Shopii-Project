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
                        handleSubmit, 
                        values, navigation, search}) => {
    return(
        <Scroll_component scrollEnabled={false}>
            <View style={{
                    backgroundColor: brand,
                    paddingTop: StatusBarHeight + 8,
                    paddingRight: 30,
                }}>
                    <StyledFormArea style={{
                        flexDirection: 'row',
                        width: '93%'}}>
                    <TouchableOpacity style={{
                            top: 5,
                            }}
                            onPress={() => {
                                navigation.goBack()
                            }}>
                        <Ionicons name="chevron-back"
                        size={35} color={white}/>
                    </TouchableOpacity>

                    <MySearchInput
                        placeholder={"Result for " + search}
                        placeholderTextColor={darklight}
                        onChangeText={handleChange('search')}
                        onBlur={handleBlur('search')}
                        handleSubmit={handleSubmit}
                        value={values.search}
                        keyboardType="email-address"
                    />
                    <TouchableOpacity style={{
                        top: 8,
                        left: 2,}}
                        onPress = {() => {
                            if (isLogin == true){
                                console.log("This is your shopping cart");
                            }
                            else{
                                var isLogin = values.isLogin;
                                navigation.navigate("Login", {isLogin});
                            }
                        }}
                    >
                        <AntDesign name="shoppingcart"
                            size={30} color={white}/>
                    </TouchableOpacity>
                </StyledFormArea>
            </View>
        </Scroll_component>
    )
}

const SearchResultScreen = ({navigation, route}) => {
    const {search, isLogin} = route.params;
    return (
        <View style={{
            width: '100%', height: '100%',
            flex: 1, backgroundColor: 'white',
        }}>
            <StatusBar style = "light"/>
            <Formik 
                initialValues={{search: '', isLogin}}
                onSubmit={(values) => {
                    if (values.search.length > 0){
                        console.log(values.search);
                        navigation.push("Search result", 
                                        values.search)
                    }
            }}>
                {({handleChange, handleBlur,
                handleSubmit, values}) =>
                (
                    render_header({handleBlur, handleChange, 
                                handleSubmit, 
                                values, navigation, search})
                    )}
            </Formik>
        </View>
    )
}

const MySearchInput = ({handleSubmit, ...props}) => {
    return (
        <View style={{
            width: '88%',
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

export default SearchResultScreen;