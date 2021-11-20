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
const {brand, darklight, white} = Colors;


//Login implementation:
const Signup = ({navigation}) =>{
    const [hidePwd, setHiddenpwd] = useState(true);
    const [hideconfirmPwd, setHiddenconfirmpwd] = useState(true);

    return (
        <Scroll_component>
            <StyledContainer>
                <StatusBar style="dark"/>
                <Innercontainer>
                
                    <Title>Shopii</Title>
                    <SubTitle>Get back your password page</SubTitle>

                    <Formik
                    initialValues={{email: '', verifycode: '',
                    password: '', confirmpassword: ''}}
                    onSubmit={(values) => {
                        console.log(values);}
                    }>
                        {({handleChange, handleBlur,
                        handleSubmit, values}) =>
                        (<StyledFormArea>
                            <MyTextInput
                            label="User account"
                            icon="mail"
                            placeholder="Email, username, phonenumber"
                            placeholderTextColor={darklight}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            keyboardType="email-address"
                            />

                            <MyTextInput
                            label="Verify code"
                            icon="mail"
                            placeholder="XXXXXXXX"
                            placeholderTextColor={darklight}
                            onChangeText={handleChange('verifycode')}
                            onBlur={handleBlur('verifycode')}
                            value={values.verifycode}
                            keyboardType="email-address"
                            />

                            {/*password input:*/}
                            <MyTextInput
                            label="Password"
                            icon="lock"
                            placeholder="* * * * * * * *"
                            placeholderTextColor={darklight}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
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
                            isPassword={true}
                            hidePassword = {hideconfirmPwd}
                            setHiddenPassword = {setHiddenconfirmpwd}
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
    ...props}) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand}/>
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props}/>
            {isPassword && (
                <RightIcon onPress={() => setHiddenPassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? "md-eye-off" : "md-eye"}
                    size={30} color={darklight}/>
                </RightIcon>
            )}
            {isPassword && (
                <RightIcon onPress={() => setHiddenPassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? "md-eye-off" : "md-eye"}
                    size={30} color={darklight}/>
                </RightIcon>
            )}
        </View>
    )
}

export default Signup;