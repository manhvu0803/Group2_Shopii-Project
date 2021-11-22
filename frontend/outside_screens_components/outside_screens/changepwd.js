//import part:
import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import{ StyledContainer, Innercontainer,
        Title, SubTitle,
        StyledFormArea, StyledInputLabel, StyledTextInput,
        LeftIcon, RightIcon,
        StyledButton, ButtonText,
        Colors
} from "./../components/style_components";
import {View} from "react-native";
import {Octicons, Ionicons} from "@expo/vector-icons";
import Scroll_component from './../components/scroll_component';


//formik:
import { Formik } from 'formik';

//Colors:
const {brand, darklight, white, i_extra} = Colors;


//Login implementation:
const ChangePwd = ({navigation}) =>{
    const [hidePwd, setHiddenpwd] = useState(true);
    const [hideconfirmPwd, setHiddenconfirmpwd] = useState(true);

    return (
        <Scroll_component>
            <StyledContainer style={{paddingTop: 75}}>
                <StatusBar style="dark"/>
                <Innercontainer>

                    <Formik
                    initialValues={{newpassword: '', confirmpassword: ''}}
                    onSubmit={(values) => {
                        console.log(values);
                        navigation.popToTop();
                    }}>
                        {({handleChange, handleBlur,
                        handleSubmit, values}) =>
                        (<StyledFormArea>
                            <MyTextInput
                            label="New password"
                            icon="lock"
                            placeholder="* * * * * * * *"
                            placeholderTextColor={darklight}
                            onChangeText={handleChange('newpassword')}
                            onBlur={handleBlur('newpassword')}
                            value={values.newpassword}
                            secureTextEntry = {hidePwd}
                            isPassword={true}
                            hidePassword = {hidePwd}
                            setHiddenPassword = {setHiddenpwd}
                            />
                            <MyTextInput
                            label="Confirm password"
                            icon="lock"
                            placeholder="* * * * * * * *"
                            placeholderTextColor={darklight}
                            onChangeText={handleChange('confirmpassword')}
                            onBlur={handleBlur('confirmpassword')}
                            value={values.confirmpassword}
                            secureTextEntry = {hideconfirmPwd}
                            hideconfirmPwd={true}
                            hideConfirmPassword = {hideconfirmPwd}
                            setHiddenConfirmPassword = {setHiddenconfirmpwd}
                            />

                            <StyledButton onPress={handleSubmit}>
                                <ButtonText>
                                    Change password
                                </ButtonText>
                                <Octicons name="pencil"
                                color={white} size={25}/>
                            </StyledButton>
                        </StyledFormArea>)}
                    </Formik>
                </Innercontainer>
            </StyledContainer>
        </Scroll_component>
    );
}

const MyTextInput = ({label, icon,
    isPassword, hidePassword, setHiddenPassword,
    hideconfirmPwd, hideConfirmPassword, setHiddenConfirmPassword,
    ...props}) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={i_extra}/>
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props}/>
            {isPassword && (
                <RightIcon onPress={() => setHiddenPassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? "md-eye-off" : "md-eye"}
                    size={30} color={darklight}/>
                </RightIcon>
            )}
            {hideconfirmPwd && (
                <RightIcon onPress={() =>
                setHiddenConfirmPassword(!hideConfirmPassword)}>
                    <Ionicons name={hideConfirmPassword ?
                    "md-eye-off" : "md-eye"}
                    size={30} color={darklight}/>
                </RightIcon>
            )}
        </View>
    )
}

export default ChangePwd;