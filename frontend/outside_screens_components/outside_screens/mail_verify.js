//import part:
//style components:
import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import{ StyledContainer, Innercontainer,
        Msgline,
        StyledFormArea, StyledInputLabel, StyledTextInput,
        LeftIcon,
        StyledButton, ButtonText,
        Colors
} from "./../components/style_components";

//base components of react-native:
import {View, TouchableWithoutFeedback, Keyboard, 
        ActivityIndicator
} from "react-native";

//icon components:
import {Octicons} from "@expo/vector-icons";

//API client axios:
import axios from 'axios';

//formik:
import { Formik } from 'formik';

//Colors:
const {darklight, i_extra, white} = Colors;


//Mail verify implementation:
const MailVerify = ({navigation, route}) =>{
    const {goto, email} = route.params

    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    const handleMailVerify = (credentials, setSubmitting) => {
        handleMessage(null);
        const codeveri = credentials.code;
        const  url = ("https://wise-jellyfish-33.loca.lt/mailinput?"
                    +"email="+email+"&verifycode="+codeveri);
        console.log(url);
        navigation.replace(goto, {email});
        setSubmitting(false);
        /* axios.get(url).then((response) => {
            const result = response.data;
            const {valid_code} = result;
            console.log(valid_code);
            if (valid_code !== true){
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
            <StyledContainer style={{paddingTop: 200}}>
                <StatusBar style="dark"/>
                <Innercontainer>
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