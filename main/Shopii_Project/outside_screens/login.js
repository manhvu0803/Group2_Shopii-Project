//import part:
//base components of react-native:
import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext } from "react";
import {View, Text, ActivityIndicator} from "react-native";

//style components:
import{ StyledContainer, Innercontainer,
        Logo, SubTitle,
        StyledFormArea, StyledInputLabel, StyledTextInput,
        LeftIcon, RightIcon, StyledButton, ButtonText,
        Msgline, Emptyline,
        ExtraView, ExtraText, ExtraLink, ExtraTextLink,
        SocialButtonPart, Colors, StatusBarHeight,
} from "./../components/style_components";

//icon components:
import {Octicons, Ionicons, Fontisto, MaterialCommunityIcons} from "@expo/vector-icons";

//scroll component:
import Scroll_component from './../components/scroll_component';

//API client axios:
import axios from 'axios';

//formik:
import { Formik } from 'formik';
import { TouchableOpacity } from 'react-native-gesture-handler';


import  AsyncStorage  from '@react-native-async-storage/async-storage';

import { CredentialsContext } from './../components/context_component';

//Colors:
const {brand, darklight, white, i_extra} = Colors;


//Login implementation:
const Login = ({navigation}) =>{
    var goto="";
    var isLogin = true;
    
    const [hidePwd, setHiddenpwd] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    const {storedCredentials, setStoredCredentials} = useContext(
                                                        CredentialsContext);

    const handleLogin = (credentials, setSubmitting) => {
        handleMessage(null);
        const {email, password} = credentials;
        var loginby = "username";
        const username_length = email.length;
        for (var i = 0; i < username_length; i++){
            if (email[i] == "@"){
                loginby = "email";
                break;
            }
        }
        const  url = ("https://shopii-spirit.herokuapp.com/login?"
                    + loginby + "=" + email + "&password="+password);
        axios.get(url).then((response) => {
            const result = response.data;
            const {registered, password, data, error, sessionId} = result;
            if (registered !== true || password !== true){
                handleMessage("Error: Invalid username or password.", 
                false);
            }
            else{
                isLogin = true;
                data["fullname"] = data.email;
                data["sessionId"] = sessionId;
                data["shopping cart"] = [];
                data["ordered list"] = [];
                data["product list"] = [];
                Persistlognin({data});
            }
            setSubmitting(false);
        }).catch((error) => {
            console.log(error.JSON);
            setSubmitting(false);
            handleMessage("An error occurred."+ 
            "Check your network and try again.");
        });
    };

    const handleMessage = (mess, type = false) => {
        setMessage(mess);
        setMessageType(type);
    };

    const Persistlognin = (credentials) => {
        AsyncStorage.setItem('ShopiiCridentials', JSON.stringify(credentials))
        .then(() => {
            setStoredCredentials(credentials);
            navigation.navigate("Inside Stack");
        })
        .catch((error) => {
            console.log(error);
            handleMessage("Persisting lognin failed.")
        })
    }

    return (
        <Scroll_component>
            <StyledContainer style={{
                paddingTop: 10 + StatusBarHeight,
                }}>
                <StatusBar style="dark"/>
                {/* header */}
                <View style={{
                    paddingLeft: 11.5,
                    paddingRight: 12,
                    backgroundColor: white,
                    width: "14%",
                }}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("Inside Stack");
                    }}>
                        <Ionicons name="chevron-down" 
                            size={30} color={brand}/>
                    </TouchableOpacity>
                </View>
                <Innercontainer style={{marginTop: 20}}>
                    <Logo resizeMode="cover"
                    source={require('./../assets/Logo.png')}/>

                    <SubTitle>
                        Login Page
                    </SubTitle>
                    
                    <Emptyline/>

                    <Formik
                        initialValues={{email: '', password: ''}}
                        onSubmit={(values, {setSubmitting}) => {
                            if (values.email=="" || values.password==""){
                                handleMessage("Please fill all the fields.");
                                setSubmitting(false);
                            }
                            else{
                                handleLogin(values, setSubmitting, isLogin);
                            }
                        }}>
                        {({handleChange, handleBlur,
                        handleSubmit, values, isSubmitting}) =>
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
                            <Msgline type={messageType}>
                                {message}
                            </Msgline>

                            <ExtraLink style={{width:'40%'}}>
                                <ExtraTextLink forgotpwd={true}
                                onPress={() =>{
                                goto="ChangePwd";
                                const reason="forgotpassword";
                                handleMessage(null);
                                navigation.navigate("MailInput", 
                                                    {goto, reason});}}
                                >
                                    Forgot password?
                                </ExtraTextLink>
                            </ExtraLink>

                            {!isSubmitting && (<StyledButton
                            onPress={handleSubmit}>
                                <ButtonText>
                                    Login
                                </ButtonText>
                                <Octicons name="sign-in"
                                color={white} size={25}/>
                            </StyledButton>
                            )}

                            {isSubmitting && (<StyledButton
                            disabled={true}>
                                <ActivityIndicator size="large"
                                color={white}/>
                            </StyledButton>
                            )}

                            <Emptyline style={{backgroundColor: darklight}}/>

                            <ExtraView>
                                <ExtraText>
                                    Don't have account already? 
                                </ExtraText>
                                <ExtraLink>
                                    <ExtraTextLink style= {{paddingLeft: 5}}
                                    onPress={() =>{ 
                                    goto="InforInput";
                                    handleMessage(null);
                                    navigation.navigate("MailInput", {goto});}}
                                    >
                                        Sign-up
                                    </ExtraTextLink>
                                </ExtraLink>
                            </ExtraView>

                            <Text style={{textAlign: "center"}}>
                                or sign-in with
                            </Text>
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
            {!isPassword && (
                <StyledTextInput {...props}/>
            )}
            {isPassword && (
                <StyledTextInput style={{paddingRight: 55}} {...props}/>
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


export default Login;