//import part:
//base components of react-native
import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import {View, TouchableOpacity, Text, ActivityIndicator}from "react-native";

//style components:
import{ StyledContainer, Innercontainer,
        Title,
        StyledFormArea, StyledInputLabel, StyledTextInput,
        LeftIcon, Msgline,
        StyledButton, ButtonText,
        MyRadioButton,
        Colors, StatusBarHeight,
} from "./../components/style_components";

//icon components:
import {Octicons, MaterialIcons, FontAwesome5, 
        MaterialCommunityIcons, Ionicons,
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

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
    }

    const showDatePicker = () => {
        setShow(true);
    }
    
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    const handleInforInput = (credentials, setSubmitting) => {
        handleMessage(null);
        const {fullname, dob, phonenb, gender, address}
             = credentials;
        const dobsent = toDateSentFormat(date);
        navigation.navigate("UsnPwdCreate", 
                            {email, fullname, dobsent, phonenb, 
                            gender, address});
        setSubmitting(false);
    };

    const handleMessage = (mess, type = false) => {
        setMessage(mess);
        setMessageType(type);
    };

    const toTimeStamp = (aDate) => {
        const default_DateStr = aDate.toDateString();
        const temp = default_DateStr.split(" ");
        var timestamp = temp[2] + "/";
        if (temp[1] == "Jan") timestamp += "01";
        else if (temp[1] == "Feb") timestamp += "02";
        else if (temp[1] == "Mar") timestamp += "03";
        else if (temp[1] == "Apr") timestamp += "04";
        else if (temp[1] == "May") timestamp += "05";
        else if (temp[1] == "Jun") timestamp += "06";
        else if (temp[1] == "Jul") timestamp += "07";
        else if (temp[1] == "Aug") timestamp += "08";
        else if (temp[1] == "Sep") timestamp += "09";
        else if (temp[1] == "Oct") timestamp += "10";
        else if (temp[1] == "Nov") timestamp += "11";
        else timestamp += "12";
        timestamp += ("/" + temp[3]);

        return timestamp;
    }
    
    const toDateSentFormat = (aDate) => {
        const dateString = date.toLocaleDateString();
        const temp = dateString.split("/");
        let year = temp[2];
        for (let i = temp[2].length; i < 4; i++){
            year = "0" + year;
        }
        let month = temp[1];
        for (let i = temp[1].length; i < 2; i++){
            month = "0" + month;
        }
        let day = temp[0];
        for (let i = temp[0].length; i < 2; i++){
            day = "0" + day;
        }
        return year + "-" + month + "-" + day;
    }

    const toDateEpoch = (aDate) => {
        return aDate.getTime().toString();
    }

    return (
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
            <Scroll_component>
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
                    <Title style={{paddingBottom: 20}}>
                        Information Input
                    </Title>
                    <Formik
                    initialValues={{fullname: '', dob: '',
                    phonenb: '', gender: '', address: ''}}
                    onSubmit={(values, {setSubmitting}) => {
                        if (values.fullname.trim().length==0 || 
                            values.phonenb.trim().length==0 || 
                            values.address.trim().length==0){
                            handleMessage("Please fill all the fields.");
                            setSubmitting(false);
                        }
                        else{
                            var valid_phn = true;
                            const rgxNumber = new RegExp(/[0-9]/, 'g');
                            const phone = values.phonenb;
                            const length = values.phonenb.length;
                            if(!rgxNumber.test(phone)) {
                                handleMessage("Phone number can only " 
                                            + "contain number");
                                setSubmitting(false);
                            }
                            /* const length = values.phonenb.length;
                            for (var i = 0; i < length; i++){
                                if (values.phonenb.charAt(i) < '0' || 
                                    values.phonenb.charAt(i) > '9'){
                                        valid_phn = false;
                                        break;
                                    }
                            } */
                            else{
                                handleInforInput(values, setSubmitting);
                            }/* 
                            else{
                                handleMessage("Phone number can only " 
                                            + "contain number");
                                setSubmitting(false);
                            } */
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
                            onChangeText={handleChange('dob')}
                            onBlur={handleBlur('dob')}
                            value={values.dob = toTimeStamp(date)}
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
            </Scroll_component>
        </StyledContainer>
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

const GenderButton = ({setGender}) => {
    const gender = ['male', 'female', 'other'];
    const [selected=0, setSelected] = useState();
    return (
        <View style={{
            paddingLeft: 120,
            paddingTop: 20,
            width: "70%",
            justifyContent:'center',
            flexDirection:'row',
        }}>
            {gender.map((val, key) => {
                return(
                    <View key={key}>
                        {selected != key ?
                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: 20,
                            marginBottom: 10
                        }}
                        onPress={() => {
                            setSelected(key);
                            if (key == 0) setGender("male");
                            else if (key == 1) setGender("female");
                            else setGender("other");
                        }}>
                            <MaterialCommunityIcons size={30} 
                            name="circle-outline"
                            color={darklight}/>
                            <Text>{val}</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: 20,
                            marginBottom: 10
                        }}>
                            <MaterialCommunityIcons size={30} 
                            name="circle-slice-8"
                            color={brand}/>
                            <Text>{val}</Text>
                        </TouchableOpacity>
                        }
                    </View>
                )
            })
            }
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