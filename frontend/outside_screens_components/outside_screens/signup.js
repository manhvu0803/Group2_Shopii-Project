//import part:
import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import{ StyledContainer, Innercontainer,
        Title, SubTitle,
        StyledFormArea, StyledInputLabel, StyledTextInput,
        LeftIcon, RightIcon,
        StyledButton, ButtonText,
        Colors
} from "./../components/style_components";
import {View, TouchableOpacity} from "react-native";
import {Octicons, Ionicons} from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import Scroll_component from './../components/scroll_component';


//formik:
import { Formik } from 'formik';

//Colors:
const {brand, darklight, white} = Colors;


//Login implementation:
const Signup = ({navigation}) =>{
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
            <StyledContainer>
                <StatusBar style="dark"/>
                <Innercontainer>
                
                    <Title>Shopii</Title>
                    <SubTitle>Sign-up page</SubTitle>
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
                    initialValues={{fullname: '', email: '',
                    dateOfBrith: '', password: '',
                    confirmpassword: ''}}
                    onSubmit={(values) => {
                    console.log(values);}
                    }>
                        {({handleChange, handleBlur,
                        handleSubmit, values}) =>
                        (<StyledFormArea>
                            {/*account input:*/}
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
                            label="User account"
                            icon="mail"
                            placeholder="Email, username, phonenumber"
                            placeholderTextColor={darklight}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            keyboardType="email-address"
                            />

                            <MyTextInput
                            label="Date of birth"
                            icon="calendar"
                            placeholder="Sat Jan 01 2000"
                            placeholderTextColor={darklight}
                            onChangeText={handleChange('dateOfBirth')}
                            onBlur={handleBlur('dateOfBirth')}
                            value={dob ? values.dateOfBrith = dob.toDateString() : ''}
                            isDate={true}
                            editable={false}
                            showDatePicker={showDatePicker}
                            />

                            {/*password input:*/}
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
                            isPassword={true}
                            hidePassword = {hideconfirmPwd}
                            setHiddenPassword = {setHiddenconfirmpwd}
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

const MyTextInput = ({label, icon,
    isPassword, hidePassword, setHiddenPassword, isDate, showDatePicker,
    ...props}) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand}/>
            </LeftIcon>
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
            {isPassword && (
                <RightIcon onPress={() => setHiddenPassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? "md-eye-off" : "md-eye"}
                    size={30} color={darklight}/>
                </RightIcon>
            )}
        </View>
    )
}

export default Signup;