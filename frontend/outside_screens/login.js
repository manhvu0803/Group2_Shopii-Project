//import part:
import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import{ StyledContainer, Innercontainer,
        Logo, SubTitle,
        StyledFormArea, StyledInputLabel, StyledTextInput,
        LeftIcon, RightIcon, StyledButton, ButtonText,
        Msgline, Emptyline,
        ExtraView, ExtraText, ExtraLink, ExtraTextLink,
        SocialButtonPart, Colors
} from "./style_components";
import {View, Text} from "react-native";
import {Octicons, Ionicons, Fontisto} from "@expo/vector-icons";


//formik:
import { Formik } from 'formik';

//Colors:
const {brand, darklight, white} = Colors;


//Login implementation:
const Login = () =>{
    const [hidePwd, setHiddenpwd] = useState(true);


    return (
        <StyledContainer>
            <StatusBar style="dark"/>
            <Innercontainer>
                
                <Logo resizeMode="cover"
                        source={require('./../assets/Logo.png')}/>
                <SubTitle>Login page</SubTitle>

                <Formik
                    initialValues={{email: '', password: ''}}
                    onSubmit={(values) => {
                        console.log(values);}
                    }>
                    {({handleChange, handleBlur,
                    handleSubmit, values}) =>
                    (<StyledFormArea>
                        {/*account input:*/}
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
                        
                        {/*under account input part:*/}
                        <Msgline>...</Msgline>

                        <ExtraLink>
                            <ExtraTextLink forgotpwd={true}>
                                Forgot password?
                            </ExtraTextLink>
                        </ExtraLink>

                        <StyledButton signin={true} onPress={handleSubmit}>
                            <ButtonText signin={true}> Login </ButtonText>
                            <Octicons name="sign-in" color={white} size={25}/>
                        </StyledButton>

                        <Emptyline/>

                        <ExtraView>
                            <ExtraText>Don't have account already? </ExtraText>
                            <ExtraLink>
                                <ExtraTextLink>Sign-up</ExtraTextLink>
                            </ExtraLink>
                        </ExtraView>

                        <View style={{flex: 1}}>
                            <Text style={{textAlign: "center"}}>
                                or sign-in with
                            </Text>
                        </View>
                        <SocialButtonPart>
                            <StyledButton google={true} onPress={handleSubmit}>
                                <Fontisto name="google" color={white} size={17}/>
                                <ButtonText google={true}>
                                    Google
                                </ButtonText>
                            </StyledButton>
                        
                            <StyledButton fb={true} onPress={handleSubmit}>
                                <Fontisto name="facebook" color={white} size={17}/>
                                <ButtonText fb={true}>
                                    Facebook
                                </ButtonText>
                            </StyledButton>
                        </SocialButtonPart>
                    </StyledFormArea>)}
                </Formik>
            </Innercontainer>
        </StyledContainer>
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
        </View>
    )
}

export default Login;