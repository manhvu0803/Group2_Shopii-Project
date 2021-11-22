//import part:
import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import{ StyledContainer, Innercontainer,
        Msgline,
        StyledFormArea, StyledInputLabel, StyledTextInput,
        LeftIcon,
        StyledButton, ButtonText,
        Colors
} from "./../components/style_components";
import {View, TouchableWithoutFeedback, Keyboard} from "react-native";
import {Octicons} from "@expo/vector-icons";


//formik:
import { Formik } from 'formik';

//Colors:
const {darklight, i_extra} = Colors;


//Login implementation:
const MailInput = ({navigation}) =>{

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}
        touchSoundDisabled={true} 
        >
            <StyledContainer style={{paddingTop: 200}}>
                <StatusBar style="dark"/>
                <Innercontainer>

                    <Formik
                    initialValues={{email: ''}}
                    onSubmit={(values) => {
                    console.log(values);
                    navigation.navigate("MailVerify");}
                    }>
                        {({handleChange, handleBlur,
                        handleSubmit, values}) =>
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

                            <Msgline style={{color: darklight}}>
                                ...
                            </Msgline>

                            <StyledButton
                            onPress={handleSubmit}>
                                <ButtonText>
                                    Next
                                </ButtonText>
                            </StyledButton>
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