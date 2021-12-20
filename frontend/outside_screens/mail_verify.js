//import part:
//base components of react-native:
import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import {View, TouchableWithoutFeedback, Keyboard, 
        ActivityIndicator, TouchableOpacity,
} from "react-native";

//style components:
import{ StyledContainer, Innercontainer,
        Title,
        Msgline,
        StyledFormArea, StyledInputLabel, StyledTextInput,
        LeftIcon,
        StyledButton, ButtonText,
        Colors, StatusBarHeight,
} from "./../components/style_components";

//icon components:
import {Octicons, Ionicons} from "@expo/vector-icons";

//API client axios:
import axios from 'axios';

//formik:
import { Formik } from 'formik';

//Colors:
const {brand, darklight, i_extra, white} = Colors;


//Mail verify implementation:
const MailVerify = ({navigation, route}) =>{
    const {goto, email} = route.params;
    const reason = route.params.reason ? route.params.reason : "";

    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    const handleMailVerify = (credentials, setSubmitting) => {
        handleMessage(null);
        const codeveri = credentials.code;
        const  url = ("https://shopii-spirit.herokuapp.com/verify?"
                    +"email="+email+"&verifycode="+codeveri);
        console.log(url);
        navigation.replace(goto, {email, reason});
        setSubmitting(false);
        /* axios.get(url).then((response) => {
            const result = response.data;
            const {verified} = result;
            console.log(result);
            if (verified !== true){
                handleMessage("Error: The verify code is " 
                            + "not correct.", false);
            }
            else{
                navigation.replace(goto, {email});
            }
            setSubmitting(false);
        }).catch((error) => {
            console.log(error.JSON);
            setSubmitting(false);
            handleMessage("An error occurred."+ 
            "Check your network and try again.");
        }); */
    };

    const handleMessage = (mess, type = false) => {
        setMessage(mess);
        setMessageType(type);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}
        touchSoundDisabled={true} 
        >
            <StyledContainer style={{
                paddingTop: 10 + StatusBarHeight,
                }}>
                <StatusBar style="dark"/>
                {/* header */}
                <View style={{
                    paddingLeft: 11.5,
                    paddingRight: 12,
                    paddingBottom: 20,
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
                    <Title style={{paddingBottom: 20}}>Mail Verify</Title>
                    <Formik
                    initialValues={{code: ''}}
                    onSubmit={(values, {setSubmitting}) => {
                        if (values.code==""){
                            handleMessage("Please input the verify code " 
                                        + "first.");
                            setSubmitting(false);
                        }
                        else{
                            handleMailVerify(values, setSubmitting);
                        }
                    }}>
                        {({handleChange, handleBlur,
                        handleSubmit, values, isSubmitting}) =>
                        (<StyledFormArea>
                            {/*account input:*/}

                            <MyTextInput
                            label="Verify code"
                            icon="key"
                            placeholder="Received code"
                            placeholderTextColor={darklight}
                            onChangeText={handleChange('code')}
                            onBlur={handleBlur('code')}
                            value={values.code}
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

export default MailVerify;