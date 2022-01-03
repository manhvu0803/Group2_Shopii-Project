//import part:
//base components of react-native
import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext } from "react";
import {View, TouchableOpacity, Text, ActivityIndicator, 
        Alert,
}from "react-native";

//style components:
import{ StyledContainer, Innercontainer, Title,
        StyledFormArea, StyledInputLabel, StyledTextInput,
        LeftIcon, Msgline,
        StyledButton, ButtonText, SocialButtonPart, 
        Colors, StatusBarHeight,
} from "../components/style_components";

//icon components:
import {Octicons, MaterialCommunityIcons, Ionicons,
} from "@expo/vector-icons";

//scroll component:
import Scroll_component from '../components/scroll_component';

//API client axios:
import axios from 'axios';

//formik:
import { Formik } from 'formik';

import  AsyncStorage  from '@react-native-async-storage/async-storage';

import { CredentialsContext } from './../components/context_component';

//Colors:
const {brand, darklight, white, i_extra} = Colors;


//Information input implementation:
const UserAccount = ({navigation, route}) =>{
    //const {email, data} = route.params;

    const [editing, setEditing] = useState(false)
    
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);

    const preCredentials = {...storedCredentials} || {};

    const handleChangeUsrename = (credentials, setSubmitting) => {
        handleMessage(null);
        const {username} = credentials;
        const url = ("https://shopii-spirit.herokuapp.com/edit?"
                    + "sessionid=" + preCredentials.data["sessionId"].toString()
                    + "&username=" + username);
        axios.get(url).then((response) => {
            const result = response.data;
            const {sessionExisted, sessionExpired, error, infoUpdated} = result;
            if (error == null && infoUpdated == true){
                Alert.alert("", "Change username successfully", [{text: "OK"}]);
                preCredentials.data.username = credentials.username;
                updateUsername(preCredentials);
            }
            else{
                handleMessage(error, false);
            }
            setSubmitting(false);
            setEditing(false);
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

    const updateUsername = (credentials) => {
        AsyncStorage.setItem('ShopiiCridentials', JSON.stringify(credentials))
        .then(() => {
            setStoredCredentials(credentials);
        })
        .catch((error) => {
            console.log(error);
            handleMessage("Updating username in this session failed.")
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
                    paddingBottom: 8,
                    backgroundColor: white,
                    width: "14%",
                }}>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack();
                    }}>
                        <Ionicons name="chevron-back" 
                            size={30} color={brand}/>
                    </TouchableOpacity>
                </View>
                <Innercontainer>
                    <Title style={{paddingBottom: 20}}>
                        Your Account
                    </Title>
                    <Formik
                    initialValues={{username: preCredentials.data.username}}
                    onSubmit={(values, {setSubmitting}) => {
                        if (values?.username.length == 0){
                            handleMessage("Please input a new username fields.");
                            setSubmitting(false);
                        }
                        else{
                            if (values?.username !== preCredentials?.data?.username){
                                var count_alphabet = 0;
                                var valid = true;
                                const length = values?.username.length;
                                const username = values.username || '';

                                const rgxSymbol = new RegExp(/@/, 'g');
                                const rgxLowerCase = new RegExp(/[a-z]/, 'g');
                                const rgxUpperCase = new RegExp(/[A-Z]/, 'g');

                                if(rgxSymbol.test(username) || (!rgxUpperCase.test(username) && !rgxLowerCase.test(username))) {
                                    handleMessage(
                                        "Username must have " 
                                    + "at least " 
                                    + "1 alphabet character "
                                    + "and cannot contain '@'.");
                                    setSubmitting(false);
                                }
                                else{
                                    handleChangeUsrename(values, 
                                                        setSubmitting,
                                                        setEditing);
                                }
                            }
                            else{
                                handleMessage("There is no change to save.");
                                setSubmitting(false);
                            }
                        }
                    }}>
                        {({handleChange, handleBlur,
                        handleSubmit, values, isSubmitting}) =>
                        (<StyledFormArea>
                            <MyTextView
                            label="Your mail"
                            icon="mail"
                            placeholder="abc123@gmail.com"
                            placeholderTextColor='black'
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={preCredentials.data.email}
                            keyboardType="email-address"
                            />
                            
                            {editing==false ?
                            <MyTextView
                            label="Username"
                            icon="rename-box"
                            placeholder="Username"
                            placeholderTextColor='black'
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            value={preCredentials.data.username}
                            isUsername={true}
                            />
                            :
                            <MyTextInput
                            label="Username"
                            icon="rename-box"
                            placeholder="Username"
                            placeholderTextColor={darklight}
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            value={values.username}
                            isUsername={true}
                            />
                            }

                            <PasswordPart navigation={navigation}/>

                            {editing==false && (<StyledButton
                            onPress={() => {setEditing(true)}}>
                                <ButtonText>
                                    Change username
                                </ButtonText>
                            </StyledButton>)}

                            {(editing==true && !isSubmitting) 
                            && (<SocialButtonPart>
                                <StyledButton save={true}
                                onPress={handleSubmit}>
                                    <ButtonText>Save</ButtonText>
                                </StyledButton>
                        
                                <StyledButton cancle={true}
                                onPress={() => {
                                    setEditing(false);
                                    handleMessage(null);
                                    values.username = preCredentials.data.username;
                                    }}>
                                    <ButtonText>Cancle</ButtonText>
                                </StyledButton>
                            </SocialButtonPart>)}

                            {(editing==true && isSubmitting) 
                            && (<StyledButton
                            disabled={true}>
                                <ActivityIndicator size="large"
                                color={white}/>
                            </StyledButton>
                            )}
                            <Msgline type={messageType}>
                                {message}
                            </Msgline>
                        </StyledFormArea>)}
                    </Formik>
                </Innercontainer>
            </StyledContainer>
        </Scroll_component>
    );
}

const MyTextInput = ({label, icon, isUsername,
    ...props}) => {
    
    return (
        <View>
            {isUsername && <LeftIcon style={{paddingLeft: 11}}>
                <MaterialCommunityIcons name={icon} size={30}
                color={i_extra}/>
            </LeftIcon>}
            {!isUsername && <LeftIcon>
                <Octicons name={icon} size={30} color={i_extra}/>
            </LeftIcon>}
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props}/>
        </View>
    )
}

const MyTextView = ({label, icon, isUsername, ...props}) => {
    return (
        <View>
            {isUsername && <LeftIcon style={{paddingLeft: 11}}>
                <MaterialCommunityIcons name={icon} size={30}
                color={i_extra}/>
            </LeftIcon>}
            {!isUsername && <LeftIcon>
                <Octicons name={icon} size={30} color={i_extra}/>
            </LeftIcon>}
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput  editable={false}
                style={{backgroundColor: white}}
                {...props}/>
        </View>
    )
}

const PasswordPart = ({navigation}) => {
    return (
        <TouchableOpacity 
            style={{paddingTop: 15, paddingBottom: 15}}
            onPress={() => {
                    const goto = "ChangePwd";
                    const reason="changepassword";
                    navigation.navigate("MailVerify", {goto, reason});
                }}>
            <View 
            style={{
            width: '100%',
            height: 120,
            backgroundColor: "white",
            flexDirection: 'row',
            alignContent: 'center',
            alignItems:'center',
            elevation: 5}}
        >
            <LeftIcon>
                <Octicons name="lock" size={30} color={i_extra}/>
            </LeftIcon>
                <View style={{paddingLeft: 50}}>
                    <Text style={{fontSize: 20, fontWeight:'bold'}}>
                        Change password
                    </Text>
                    <Text>Change password frequenly will keep you
                        safe for longer and remember
                    </Text>
                    <Text>
                        DO NOT let anyone untrusted know this information
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default UserAccount;