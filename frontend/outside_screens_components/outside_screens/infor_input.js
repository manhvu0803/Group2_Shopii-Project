//import part:
//style components:
import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import{ StyledContainer, Innercontainer,
        StyledFormArea, StyledInputLabel, StyledTextInput,
        LeftIcon, Msgline,
        StyledButton, ButtonText,
        MyRadioButton,
        Colors
} from "./../components/style_components";

//base components of react-native
import {View, TouchableOpacity, Text, ActivityIndicator}from "react-native";

//icon components:
import {Octicons, MaterialIcons, FontAwesome5, 
        MaterialCommunityIcons
} from "@expo/vector-icons";

//Date time picker components:
import DateTimePicker from '@react-native-community/datetimepicker';

//scroll component:
import Scroll_component from './../components/scroll_component';

//API client axios:
import axios from 'axios';

//formik:
import { Formik } from 'formik';

//Colors:
const {brand, darklight, white, i_extra} = Colors;


//Information input implementation:
const InforInput = ({navigation, route}) =>{
    const {email} = route.params;

    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date(2000, 0 ,1));
    const [genderval, setGenderval] = useState("male");

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
    
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    const handleInforInput = (credentials, setSubmitting) => {
        handleMessage(null);
        const {fullname, dateOfBirth, phonenb, gender, address}
             = credentials;
        const  url = ("https://wise-jellyfish-33.loca.lt/login?" 
                    + "email=" + email 
                    + "&fullname=" + fullname + "&dateOfBrith="+dateOfBirth
                    + "&phoneumber=" + phonenb + "&gender=" + gender 
                    + "&address=" + address);
        console.log(url);
        navigation.navigate("UsnPwdCreate", {email});
        setSubmitting(false);
        /* axios.get(url).then((response) => {
            const result = response.data;
            const {phonenb_existed} = result;
            console.log(phonenb_existed);
            if (phonenb_existed === true){
                handleMessage("Error: This phone number has been already " 
                            + "used for an account.", false);
            }
            else{
                navigation.navigate("UsnPwdCreate", {email,
                                    fullname, dateOfBrith, 
                                    phonenb, gender, address
                                });
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
        <Scroll_component>
            <StyledContainer style={{paddingTop: 55}}>
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
                    initialValues={{fullname: '', dateOfBirth: '',
                    phonenb: '', gender: '', address: ''}}
                    onSubmit={(values, {setSubmitting}) => {
                        if (values.fullname=="" || 
                            values.dateOfBirth=="" || 
                            values.phonenb=="" || 
                            values.gender=="" || 
                            values.address==""){
                            handleMessage("Please fill all the fields.");
                            setSubmitting(false);
                        }
                        else{
                            var valid_phn = true;
                            const length = values.phonenb.length;
                            for (var i = 0; i < length; i++){
                                if (values.phonenb.charAt(i) < '0' || 
                                    values.phonenb.charAt(i) > '9'){
                                        valid_phn = false;
                                        break;
                                    }
                            }
                            if (valid_phn === true){
                                handleInforInput(values, setSubmitting);
                            }
                            else{
                                handleMessage("Phone number can only " 
                                            + "contain number");
                                setSubmitting(false);
                            }
                        }
                    }}>
                        {({handleChange, handleBlur,
                        handleSubmit, values, isSubmitting}) =>
                        (<StyledFormArea>
                            <MyTextInput
                            label="Full name"
                            icon="person"
                            placeholder="Nguyen Van A"
                            placeholderTextColor={darklight}
                            onChangeText={handleChange('fullname')}
                            onBlur={handleBlur('fullname')}
                            values={values.fullname}
                            isFullname = {true}
                            />

                            <MyTextInput
                            label="Date of birth"
                            icon="calendar"
                            placeholder="Sat Jan 01 2000"
                            placeholderTextColor='black'
                            onChangeText={handleChange('dateOfBirth')}
                            onBlur={handleBlur('dateOfBirth')}
                            value={dob ?
                                   values.dateOfBirth = dob.toDateString()
                                   : 
                                   values.dateOfBirth = date.toDateString()}
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

                            <MyTextInput
                            label="Gender"
                            icon="transgender"
                            placeholder="Male/female/3rd gender"
                            placeholderTextColor={darklight}
                            onChangeText={handleChange('gender')}
                            onBlur={handleBlur('gender')}
                            value={values.gender=genderval}
                            setGender={setGenderval}
                            isGender = {true}
                            />

                            <MyTextInput
                            label="Address"
                            icon="address-book"
                            placeholder="Your address"
                            placeholderTextColor={darklight}
                            onChangeText={handleChange('address')}
                            onBlur={handleBlur('address')}
                            value={values.address}
                            isAddress = {true}
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
        </Scroll_component>
    );
}

const MyTextInput = ({label, icon, isFullname, isPhone, 
    isDate, showDatePicker, isGender, isAddress, setGender,
    ...props}) => {
    
    return (
        <View>
            <StyledInputLabel>{label}</StyledInputLabel>

            {(!isDate && !isGender) && <StyledTextInput {...props}/>}
            {isDate && <TouchableOpacity onPress={showDatePicker}>
            <StyledTextInput {...props}/>
            </TouchableOpacity>}

            {isGender && <View style={{
            height: 60,
            marginBottom: 10,
            }}>
                <GenderField setGender={setGender}/>
            </View>}

            {isFullname && <LeftIcon style={{paddingLeft: 12}}>
                <MaterialIcons name={icon} size={30} color={i_extra}/>
            </LeftIcon>}

            {isDate && <LeftIcon style={{paddingLeft: 14}}>
                <Octicons name={icon} size={30} color={i_extra}/>
            </LeftIcon>}

            {isPhone && <LeftIcon style={{paddingLeft: 11}}>
                <MaterialIcons name={icon} size={30} color={i_extra}/>
            </LeftIcon>}

            {isGender && <LeftIcon style={{paddingLeft: 14}}>
                <FontAwesome5 name={icon} size={30} color={i_extra}/>
            </LeftIcon>}

            {isAddress && <LeftIcon style={{paddingLeft: 12}}>
                <FontAwesome5 name={icon} size={30} color={i_extra}/>
            </LeftIcon>}
        </View>
    )
}

const GenderField = ({setGender}) => {
    const [selected, setSelected] = useState("male");
    return (
        <View style={{
            paddingLeft: 120,
            paddingTop: 20,
            width: "70%",
            justifyContent:'center',
            flexDirection:'row',
        }}>
            <MyRadioButton
            onPress={() => {
                if (selected !== "male"){
                    setSelected("male");
                    setGender("male");
                }
            }}
            >
                <MaterialCommunityIcons size={30}
                    name={selected != "male" ?
                    "circle-outline":"circle-slice-8"}
                    color={selected != "male" ?
                    darklight:brand}/>
                <Text>male</Text>
            </MyRadioButton>

            <MyRadioButton
            onPress={() => {
                if (selected !== "female"){
                    setSelected("female");
                    setGender("female");
                }
            }}
            >
                <MaterialCommunityIcons size={30}
                    name={selected != "female" ?
                    "circle-outline":"circle-slice-8"}
                    color={selected != "female" ?
                    darklight:brand}/>
                <Text>female</Text>
            </MyRadioButton>

            <MyRadioButton
            onPress={() => {
                if (selected !== "other"){
                    setSelected("other");
                    setGender("other");
                }
            }}
            >
                <MaterialCommunityIcons size={30}
                    name={selected != "other" ?
                    "circle-outline":"circle-slice-8"}
                    color={selected != "other" ?
                    darklight:brand}/>
                <Text>other</Text>
            </MyRadioButton>
        </View>
    )
}

export default InforInput;