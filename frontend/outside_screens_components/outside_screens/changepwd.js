//import part:
//base components already available in node_module:
import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import {View, ActivityIndicator, Alert} from "react-native";

//style components:
import{ StyledContainer, Innercontainer,
        StyledFormArea, StyledInputLabel, StyledTextInput,
        LeftIcon, RightIcon,
        StyledButton, ButtonText,
        Msgline,
        Colors
} from "./../components/style_components";
//icon components:
import {Octicons, Ionicons} from "@expo/vector-icons";

//scroll components:
import Scroll_component from './../components/scroll_component';

//formik:
import { Formik } from 'formik';

//Colors:
const {darklight, white, i_extra} = Colors;

//API client axios:
import axios from 'axios';

//Login implementation:
const ChangePwd = ({navigation, route}) =>{
    const {email} = route.params;

    const [hidePwd, setHiddenpwd] = useState(true);
    const [hideconfirmPwd, setHiddenconfirmpwd] = useState(true);

    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    const handleChangePWD = (credentials, setSubmitting) => {
        handleMessage(null);
        const {newpassword} = credentials;
        const  url = ("https://wise-jellyfish-33.loca.lt/login?" 
                    + "email=" + email + "&newpassword=" + newpassword);
        console.log(url);
        navigation.popToTop();
        Alert.alert("", "Change password successfully", 
                    [{text: "continue"}]);
        setSubmitting(false);
        /* axios.get(url).then(() => {
            navigation.popToTop();
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
        <Scroll_component>
            <StyledContainer style={{paddingTop: 75}}>
                <StatusBar style="dark"/>
                <Innercontainer>

                    <Formik
                    initialValues={{newpassword: '', confirmpassword: ''}}
                    onSubmit={(values, {setSubmitting}) => {
                        if (values.newpassword=="" || 
                            values.confirmpassword==""){
                            handleMessage("Please fill all the fields.");
                            setSubmitting(false);
                        }
                        else if (values.newpassword 
                                != 
                                values.confirmpassword){
                            handleMessage("Confirmpassword does not match"
                                        + "Password.");
                            setSubmitting(false);
                        }
                        else{
                            handleChangePWD(values, setSubmitting);
                        }
                    }}>
                        {({handleChange, handleBlur,
                        handleSubmit, values, isSubmitting}) =>
                        (<StyledFormArea>
                            <MyTextInput
                            label="New password"
                            icon="lock"
                            placeholder="* * * * * * * *"
                            placeholderTextColor={darklight}
                            onChangeText={handleChange('newpassword')}
                            onBlur={handleBlur('newpassword')}
                            value={values.newpassword}
                            secureTextEntry = {hidePwd}
                            isPassword={true}
                            hidePassword = {hidePwd}
                            setHiddenPassword = {setHiddenpwd}
                            />
                            <MyTextInput
                            label="Confirm password"
                            icon="lock"
                            placeholder="* * * * * * * *"
                            placeholderTextColor={darklight}
                            onChangeText={handleChange('confirmpassword')}
                            onBlur={handleBlur('confirmpassword')}
                            value={values.confirmpassword}
                            secureTextEntry = {hideconfirmPwd}
                            hideconfirmPwd={true}
                            hideConfirmPassword = {hideconfirmPwd}
                            setHiddenConfirmPassword = {setHiddenconfirmpwd}
                            />

                            <Msgline type={messageType}>
                                {message}
                            </Msgline>

                            {!isSubmitting && (<StyledButton
                            onPress={handleSubmit}>
                                <ButtonText>
                                    Change password
                                </ButtonText>
                                <Octicons name="pencil"
                                color={white} size={25}/>
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
        </Scroll_component>
    );
}

const MyTextInput = ({label, icon,
    isPassword, hidePassword, setHiddenPassword,
    hideconfirmPwd, hideConfirmPassword, setHiddenConfirmPassword,
    ...props}) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={i_extra}/>
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props}/>
            {isPassword && (
                <RightIcon onPress={() => setHiddenPassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? "md-eye-off" : "md-eye"}
                    size={30} color={darklight}/>
                </RightIcon>
            )}
            {hideconfirmPwd && (
                <RightIcon onPress={() =>
                setHiddenConfirmPassword(!hideConfirmPassword)}>
                    <Ionicons name={hideConfirmPassword ?
                    "md-eye-off" : "md-eye"}
                    size={30} color={darklight}/>
                </RightIcon>
            )}
        </View>
    )
}

export default ChangePwd;