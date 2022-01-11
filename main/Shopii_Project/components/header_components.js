//import part:
//base components of react-native:
import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import {View, Text, 
        ActivityIndicator, TouchableOpacity
} from "react-native";

//style components:
import{ StyledContainer, Innercontainer,
        Logo, window_width, MyRadioButton,
        StyledFormArea, StyledInputLabel, StyledSearchInput,
        LeftIcon, RightIcon, StyledButton, ButtonText,
        Msgline, Emptyline,
        ExtraView, ExtraText, ExtraLink, ExtraTextLink,
        SocialButtonPart, Colors, StatusBarHeight
} from "./style_components";

//icon components:
import {AntDesign, Ionicons, 
} from "@expo/vector-icons";

//scroll component:
import Scroll_component from './scroll_component';

//formik:
import { Formik } from 'formik';

//Colors:
const {brand, darklight, white, i_extra} = Colors;

const HomeHeader = () => {
    return (
        <View style={{
            backgroundColor: brand,
            paddingTop: StatusBarHeight + 8,
            paddingLeft: 10,
            paddingRight: 0,
            width: window_width,
            height: '11.5%',
        }}>
            <Formik 
                initialValues={{search: ''}}
                onSubmit={() => {
            }}>
                {({handleChange, handleBlur,
                handleSubmit, values}) =>
                (<StyledFormArea style={{
                    flexDirection: 'row',
                    width: '90%'}}>
                    <MySearchInput
                        placeholder="Searching here"
                        placeholderTextColor={darklight}
                        onChangeText={handleChange('search')}
                        onBlur={handleBlur('search')}
                        value={values.search}
                        keyboardType="email-address"
                    />
                    <TouchableOpacity style={{
                        top: 8,
                        left: 2,}}>
                        <AntDesign name="shoppingcart"
                            size={30} color={white}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        top: 7,
                        left: 10}}>
                        <Ionicons name="md-chatbubble-ellipses-outline"
                            size={30} color={white}/>
                    </TouchableOpacity>
                </StyledFormArea>)}
            </Formik>
        </View>
    )
}

const SearchHeader = () => {
    return (
        <StyledContainer style={{
            backgroundColor: brand,
            paddingTop: StatusBarHeight + 8,
            paddingLeft: 15,
            paddingRight: 30,
            width: window_width,
            height: '11.5%',
        }}>
            <Formik 
                initialValues={{search: ''}}
                onSubmit={() => {
            }}>
                {({handleChange, handleBlur,
                handleSubmit, values}) =>
                (<StyledFormArea style={{
                    flexDirection: 'row',
                    width: '93%'}}>
                    <TouchableOpacity style={{
                        top: 7.5,
                        right: 10,
                    }}>
                        <Ionicons name="caret-back-outline"
                            size={30} color={white}/>
                    </TouchableOpacity>
                    <MySearchInput
                        placeholder="Searching here"
                        placeholderTextColor={darklight}
                        onChangeText={handleChange('search')}
                        onBlur={handleBlur('search')}
                        value={values.search}
                        keyboardType="email-address"
                    />
                    <TouchableOpacity style={{
                        marginBottom: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        }}>
                        <AntDesign name="filter"
                            size={25} color={white}/>
                        <Text style={{
                            top: 9.5,
                            right: 5,
                            color: white}}>Filter</Text>
                    </TouchableOpacity>
                </StyledFormArea>)}
            </Formik>
        </StyledContainer>
    )
}

const MySearchInput = ({icon,
    isPassword, hidePassword, setHiddenPassword,
    ...props}) => {
    return (
        <View style={{
            width: '88%',
            paddingRight: 5,
        }}>
            <StyledSearchInput {...props}/>
            <RightIcon style={{top: 11.5}}>
                    <Ionicons name="search-outline"
                        size={25} color={brand}/>
            </RightIcon>
        </View>
    )
}

export {HomeHeader, SearchHeader};