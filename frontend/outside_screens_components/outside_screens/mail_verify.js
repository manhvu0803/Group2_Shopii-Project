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
import { goto } from './login';


//formik:
import { Formik } from 'formik';

//Colors:
const {darklight, i_extra} = Colors;


//Login implementation:
const MailVerify = ({navigation}) =>{

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}
        touchSoundDisabled={true} 
        >
            <StyledContainer style={{paddingTop: 200}}>
                <StatusBar style="dark"/>
                <Innercontainer>

                    <Formik
                    initialValues={{code: ''}}
                    onSubmit={(values) => {
                    console.log(values);
                    navigation.replace(goto);}
                    }>
                        {({handleChange, handleBlur,
                        handleSubmit, values}) =>
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

export default MailVerify;