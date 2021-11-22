//import part:
import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import{ StyledContainer, Innercontainer,
        Logo,
        StyledFormArea, StyledInputLabel, StyledTextInput,
        LeftIcon, RightIcon, StyledButton, ButtonText,
        Msgline, Emptyline,
        ExtraView, ExtraText, ExtraLink, ExtraTextLink,
        SocialButtonPart, Colors, StatusBarHeight
} from "./../components/style_components";
import {View, Text} from "react-native";
import {Octicons, Ionicons, Fontisto, MaterialCommunityIcons} from "@expo/vector-icons";
import Scroll_component from './../components/scroll_component';


//formik:
import { Formik } from 'formik';

//Colors:
const {darklight, white, i_extra} = Colors;
var goto="";


//Login implementation:
const Login = ({navigation}) =>{
    const [hidePwd, setHiddenpwd] = useState(true);


    return (
        <Scroll_component>
            <StyledContainer style={{paddingTop: 5}}
            >
                <StatusBar style="dark"/>
                <Innercontainer>
                
                    <Logo resizeMode="cover"
                    source={require('./../assets/Logo.png')}/>
                    
                    <Emptyline/>

                    <Formik
                        initialValues={{email: '', password: ''}}
                        onSubmit={(values) => {
                            console.log(values);
                        }}>
                        {({handleChange, handleBlur,
                        handleSubmit, values}) =>
                        (<StyledFormArea>
                            {/*account input:*/}
                            <MyTextInput
                            label="User account"
                            placeholder="Email/username/phone"
                            placeholderTextColor={darklight}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            keyboardType="email-address"
                            />

                            {/*password input:*/}
                            <MyTextInput
                            label="Password"
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
                            <Msgline style={{color: darklight}}>
                                ...
                            </Msgline>

                            <ExtraLink style={{width:'40%'}}>
                                <ExtraTextLink forgotpwd={true}
                                onPress={() =>{
                                navigation.navigate("MailInput");
                                goto="ChangePwd"}}
                                >
                                    Forgot password?
                                </ExtraTextLink>
                            </ExtraLink>

                            <StyledButton
                            onPress={handleSubmit}>
                                <ButtonText>
                                    Login
                                </ButtonText>
                                <Octicons name="sign-in"
                                color={white} size={25}/>
                            </StyledButton>

                            <Emptyline style={{backgroundColor: darklight}}/>

                            <ExtraView>
                                <ExtraText style={{fontSize: 12}}>
                                    By using our services, you agree with our 
                                </ExtraText>
                                <ExtraLink>
                                    <ExtraTextLink style= {{paddingLeft: 5,
                                    fontSize: 12}}>
                                        Term of services
                                    </ExtraTextLink>
                                </ExtraLink>
                            </ExtraView>

                            <ExtraView>
                                <ExtraText>
                                    Don't have account already? 
                                </ExtraText>
                                <ExtraLink>
                                    <ExtraTextLink style= {{paddingLeft: 5}}
                                    onPress={() =>{
                                    navigation.navigate("MailInput");
                                    goto="InforInput"}}
                                    >
                                        Sign-up
                                    </ExtraTextLink>
                                </ExtraLink>
                            </ExtraView>

                            <Text style={{textAlign: "center"}}>
                                or sign-in with
                            </Text>
                            
                            <SocialButtonPart>
                                <StyledButton google={true}
                                onPress={handleSubmit}>
                                    <Fontisto name="google"
                                    color={white} size={17}/>
                                    <ButtonText google={true}>
                                        Google
                                    </ButtonText>
                                </StyledButton>
                        
                                <StyledButton fb={true}
                                onPress={handleSubmit}>
                                    <Fontisto name="facebook"
                                    color={white} size={17}/>
                                    <ButtonText fb={true}>
                                        Facebook
                                    </ButtonText>
                                </StyledButton>
                            </SocialButtonPart>
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
            {!isPassword && (
                <LeftIcon>
                    <MaterialCommunityIcons
                    name={"account-circle-outline"} size={32}
                    color={i_extra}/>
                </LeftIcon>
            )}
            {isPassword && (
                <LeftIcon style={{paddingLeft: 17}}>
                    <Octicons name={"lock"} size={30}
                    color={i_extra}/>
                </LeftIcon>
            )}
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
export {goto};