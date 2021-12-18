//import part:
//base components of react-native:
import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import {View, TouchableWithoutFeedback, Keyboard, 
        ActivityIndicator
}from "react-native";

//style components:
import{ StyledContainer, Innercontainer,
        Msgline,
        StyledFormArea, StyledInputLabel, StyledTextInput,
        LeftIcon,
        StyledButton, ButtonText,
        Colors
} from "./../components/style_components";

//icon components:
import {Octicons} from "@expo/vector-icons";

//API client axios:
import axios from 'axios';


//formik:
import { Formik } from 'formik';

//Colors:
const {darklight, i_extra, white} = Colors;


//Mail input implementation:
const MailInput = ({navigation, route}) =>{
    const {goto} = route.params

    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    const handleMailInput = (credentials, setSubmitting) => {
        handleMessage(null);
        const email = credentials.email;
        const  url = ("https://shopii-spirit.herokuapp.com/verify?"
                    +"email="+email);
        console.log(url);
        /* navigation.navigate("MailVerify", {goto, email});
        setSubmitting(false); */
        axios.get(url).then((response) => {
            const result = response.data;
            const {registered, verifyCodeSent} = result;
            if (goto === "InforInput"){
                if (registered === true){
                    handleMessage("Error: This email already used " 
                                + "for an account.", false);
                }
                else{
                    if (verifyCodeSent === true){
                        navigation.navigate("MailVerify", {goto, email});
                    }
                    else{
                        handleMessage("Error: Error occurred while sending "
                                + "verify code. Please try again", false);
                    }
                }
            }
            else{
                if (registered === true){
                    if (verifyCodeSent === true){
                        navigation.navigate("MailVerify", {goto, email});
                    }
                    else{
                        handleMessage("Error: Error occurred while sending "
                                + "verify code. Please try again", false);
                    }
                }
                else{
                    handleMessage("Error: This email has not been used "
                                + "for any account.", false);
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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}
        touchSoundDisabled={true} 
        >
            <StyledContainer style={{paddingTop: 200}}>
                <StatusBar style="dark"/>
                <Innercontainer>
                    <Formik
                    initialValues={{email: ''}}
                    onSubmit={(values, {setSubmitting}) => {
                        if (values.email==""){
                            handleMessage("Please input your email first.");
                            setSubmitting(false);
                        }
                        else{
                            handleMailInput(values, setSubmitting);
                        }
                    }}>
                        {({handleChange, handleBlur,
                        handleSubmit, values, isSubmitting}) =>
                        (<StyledFormArea>
                            {/*account input:*/}

                            <MyTextInput
                            label="Your mail"
                            icon="mail"
                            placeholder="abc123@gmail.com"
                            placeholderTextColor={darklight}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            keyboardType="email-address"
                            />

                            <Msgline type={messageType}>
                                {message}
                            </Msgline>

                            {!isSubmitting && (<StyledButton
                            onPress={handleSubmit}>
                                <ButtonText>
                                    Next
                                </ButtonText>
                            </StyledButton>)}

                            {isSubmitting && (<StyledButton
                            disabled={true}>
                                <ActivityIndicator size="large"
                                color={white}/>
                            </StyledButton>
                            )}
                        </StyledFormArea>)}
                    </Formik>
                </Innercontainer>
            </StyledContainer>
        </TouchableWithoutFeedback>
    );
}

const MyTextInput = ({label, icon,
    ...props}) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={i_extra}/>
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props}/>
        </View>
    )
}

export default MailInput;