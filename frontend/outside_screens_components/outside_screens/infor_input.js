//import part:
import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import{ StyledContainer, Innercontainer,
        StyledFormArea, StyledInputLabel, StyledTextInput,
        LeftIcon, RightIcon,
        StyledButton, ButtonText,
        Colors
} from "./../components/style_components";
import {View, TouchableOpacity}from "react-native";
import {Octicons, Ionicons,
        MaterialIcons, MaterialCommunityIcons
} from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import Scroll_component from './../components/scroll_component';


//formik:
import { Formik } from 'formik';

//Colors:
const {brand, darklight, white, i_extra} = Colors;


//Login implementation:
const InforInput = ({navigation}) =>{
    const [hidePwd, setHiddenpwd] = useState(true);
    const [hideconfirmPwd, setHiddenconfirmpwd] = useState(true);
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date(2000, 0 ,1));

    //Actual date of birth to be sent:
    const [dob, setDob] = useState();
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        setDob(currentDate)
    }

    const showDatePicker = () => {
        setShow(true);
    }

    return (
        <Scroll_component>
            <StyledContainer style={{paddingTop: 20}}>
                <StatusBar style="dark"/>
                <Innercontainer>
                
                    {show && (
                        <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode='date'
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                        />
                    )}

                    <Formik
                    initialValues={{fullname: '', dateOfBrith: '',
                    phonenb: '', username: '', password: '',
                    confirmpassword: ''}}
                    onSubmit={(values) => {
                    console.log(values);
                    navigation.popToTop();
                    }}>
                        {({handleChange, handleBlur,
                        handleSubmit, values}) =>
                        (<StyledFormArea>
                            {/*user informations input:*/}
                            <MyTextInput
                            label="Full name"
                            icon="person"
                            placeholder="Nguyen Van A"
                            placeholderTextColor={darklight}
                            onChangeText={handleChange('fullname')}
                            onBlur={handleBlur('fullname')}
                            values={values.fullname}
                            />

                            <MyTextInput
                            label="Date of birth"
                            icon="calendar"
                            placeholder="Sat Jan 01 2000"
                            placeholderTextColor='black'
                            onChangeText={handleChange('dateOfBirth')}
                            onBlur={handleBlur('dateOfBirth')}
                            value={dob ?
                                   values.dateOfBrith = dob.toDateString()
                                   : ''}
                            isDate={true}
                            editable={false}
                            showDatePicker={showDatePicker}
                            />

                            <MyTextInput
                            label="Phone number"
                            icon="contact-phone"
                            placeholder="Your phone number"
                            placeholderTextColor={darklight}
                            onChangeText={handleChange('phonenb')}
                            onBlur={handleBlur('phonenb')}
                            value={values.phonenb}
                            isPhone={true}
                            />
                            
                            {/*account input:*/}
                            <MyTextInput
                            label="Username"
                            icon="rename-box"
                            placeholder="Email, username, phonenumber"
                            placeholderTextColor={darklight}
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            value={values.username}
                            isUsername={true}
                            />

                            <MyTextInput
                            label="Password"
                            icon="lock"
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
                            <MyTextInput
                            label="Confirm password"
                            icon="lock"
                            placeholder="* * * * * * * *"
                            placeholderTextColor={darklight}
                            onChangeText={handleChange('confirmpassword')}
                            onBlur={handleBlur('confirmpassword')}
                            value={values.confirmpassword}
                            secureTextEntry = {hideconfirmPwd}
                            isConfirmPassword={true}
                            hideConfirmPassword = {hideconfirmPwd}
                            setHiddenConfirmPassword = {setHiddenconfirmpwd}
                            />

                            <StyledButton
                            onPress={handleSubmit}>
                                <ButtonText>
                                    Sign-up
                                </ButtonText>
                                <Ionicons name="ios-create"
                                color={white} size={25}/>
                            </StyledButton>
                        </StyledFormArea>)}
                    </Formik>
                </Innercontainer>
            </StyledContainer>
        </Scroll_component>
    );
}

const MyTextInput = ({label, icon, isPhone, isDate, showDatePicker,
    isUsername, isPassword, hidePassword, setHiddenPassword,
    isConfirmPassword, hideConfirmPassword, setHiddenConfirmPassword,
    ...props}) => {
    return (
        <View>
            {isPhone && <LeftIcon style={{paddingLeft: 12}}>
                <MaterialIcons name={icon} size={30} color={i_extra}/>
            </LeftIcon>}
            
            {isUsername && <LeftIcon style={{paddingLeft: 11}}>
                <MaterialCommunityIcons name={icon} size={30}
                color={i_extra}/>
            </LeftIcon>}

            {(!isPhone && !isUsername) && <LeftIcon>
                <Octicons name={icon} size={30} color={i_extra}/>
            </LeftIcon>}
            
            <StyledInputLabel>{label}</StyledInputLabel>

            {!isDate && <StyledTextInput {...props}/>}
            {isDate && <TouchableOpacity onPress={showDatePicker}>
                <StyledTextInput {...props}/>
                </TouchableOpacity>}
            
            {isPassword && (
                <RightIcon onPress={() => setHiddenPassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? "md-eye-off" : "md-eye"}
                    size={30} color={darklight}/>
                </RightIcon>
            )}

            {isConfirmPassword && (
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

export default InforInput;