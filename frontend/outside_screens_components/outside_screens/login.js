//import part:
//style components:
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

//base components of react-native:
import {View, Text, ActivityIndicator} from "react-native";

//icon components:
import {Octicons, Ionicons, Fontisto, MaterialCommunityIcons} from "@expo/vector-icons";

//scroll component:
import Scroll_component from './../components/scroll_component';

//API client axios:
import axios from 'axios';


//formik:
import { Formik } from 'formik';

//Colors:
const {darklight, white, i_extra} = Colors;


//Login implementation:
const Login = ({navigation}) =>{
    var goto="";
    
    const [hidePwd, setHiddenpwd] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    const handleLogin = (credentials, setSubmitting) => {
        handleMessage(null);
        const {email, password} = credentials;
        const  url = ("https://wise-jellyfish-33.loca.lt/login?"
                    +"username=" + email + "&password="+password);
        axios.get(url).then((response) => {
            const result = response.data;
            const {existed, password, data} = result;
            console.log(data);
            if (existed !== true){
                handleMessage("Error: the account may not created yet.", 
                            existed);
            }
            else{
                if (password !== true){
                    handleMessage("Error: the password is not correct.", 
                            password);
                }
                else{
                    console.log("Welcome to our shopping app");
                }
                
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

    return (
        <Scroll_component>
            <StyledContainer style={{paddingTop: 10}}>
                <StatusBar style="dark"/>
                <Innercontainer>
                    <Logo resizeMode="cover"
                    source={require('./../assets/Logo.png')}/>
                    
                    <Emptyline/>

                    <Formik
                        initialValues={{email: '', password: ''}}
                        onSubmit={(values, {setSubmitting}) => {
                            if (values.email=="" || values.password==""){
                                handleMessage("Please fill all the fields.");
                                setSubmitting(false);
                            }
                            else{
                                handleLogin(values, setSubmitting);
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
                                handleMessage(null);
                                navigation.navigate("MailInput", {goto});}}
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