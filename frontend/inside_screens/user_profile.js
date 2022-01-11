//import part:
//base components of react-native
import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext } from "react";
import {View, TouchableOpacity, 
        Text, ActivityIndicator, 
        Alert, 
}from "react-native";

//style components:
import{ StyledContainer, Innercontainer,
        Title,
        StyledFormArea, StyledInputLabel, StyledTextInput,
        LeftIcon, Msgline,
        StyledButton, ButtonText, SocialButtonPart,
        MyRadioButton,
        Colors, StatusBarHeight,
} from "../components/style_components";

//icon components:
import {Octicons, MaterialIcons, FontAwesome5, 
        MaterialCommunityIcons, Ionicons,
} from "@expo/vector-icons";

//Date time picker components:
import DateTimePicker from '@react-native-community/datetimepicker';

//scroll component:
import Scroll_component from '../components/scroll_component';

//API client axios:
import axios from 'axios';

//formik:
import { Formik } from 'formik';

import  AsyncStorage  from '@react-native-async-storage/async-storage';

import { CredentialsContext } from './../components/context_component';

//Colors:
const {brand, darklight, white, i_extra} = Colors;


//Information input implementation:
const UserProfile = ({navigation, route}) =>{
    const {storedCredentials, setStoredCredentials} = useContext(
                                                        CredentialsContext);
                                
    const preCredentials = {...storedCredentials} || {};

    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date(preCredentials.data.dob));
    const [genderval, setGenderval] = useState(preCredentials.data.sex);
    const [editing, setEditing] = useState(false);
    


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

    const handleInforEdit = (credentials, setSubmitting) => {
        handleMessage(null);
        const {fullname, dob, phonenb, gender, address}
             = credentials;
        const dobsent = toDateSentFormat(date);
        const url = ("https://shopii-spirit.herokuapp.com/edit?"
                    + "sessionid=" + preCredentials.data["sessionId"].toString()
                    + "&fullname=" + fullname + "&dob=" + dobsent 
                    + "&phone=" + phonenb +"&sex=" + gender 
                    + "&address=" + address);
        axios.get(url).then((response) => {
            const result = response.data;
            const {sessionExisted, sessionExpired, error, infoUpdated} = result;
            if (error == null && infoUpdated == true){
                preCredentials.data.fullname = fullname;
                preCredentials.data.dob = dobsent;
                preCredentials.data.phone = phonenb;
                preCredentials.data.sex = gender;
                preCredentials.data.address = address;
                updateProfile(preCredentials);
                Alert.alert("", "Change username successfully", [{text: "OK"}]);
            }
            else{
                handleMessage(error, false);
            }
            setSubmitting(false);
            setEditing(false);
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
        return aDate.getTime();
    }

    const updateProfile = (credentials) => {
        AsyncStorage.setItem('ShopiiCridentials', JSON.stringify(credentials))
        .then(() => {
            setStoredCredentials(credentials);
        })
        .catch((error) => {
            console.log(error);
            handleMessage("Updating user's profile in this session failed.")
        })
    }

    return (
        <Scroll_component>
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
                        Your Profile
                    </Title>
                    <Formik
                    initialValues={{fullname: preCredentials.data.fullname, 
                    dob: '',
                    phonenb: preCredentials.data.phone, 
                    gender: '', 
                    address: preCredentials.data.address}}
                    onSubmit={(values, {setSubmitting}) => {
                        if (values.fullname.trim().length==0 || 
                            values.phonenb.trim().length==0 || 
                            values.address.trim().length==0){
                            handleMessage("Please fill all the fields.");
                            setSubmitting(false);
                        }
                        else{
                            if (values.fullname===preCredentials.data.fullname
                            && date.toLocaleDateString() === new Date(preCredentials.data.dob).toLocaleDateString() 
                            && values.phonenb===preCredentials.data.phone
                            && genderval === preCredentials.data.sex   
                            && values.address===preCredentials.data.address){
                                handleMessage("There is no change to save.");
                                setSubmitting(false);
                            }
                            else{
                                const rgxNumber = new RegExp(/[0-9]/, 'g');
                                const temp = values.phonenb.split(" ");
                                values.phonenb = "";
                                for (let i = 0; i < temp.length; i++){
                                    values.phonenb = values.phonenb + temp[i];
                                }
                                if(!rgxNumber.test(values.phonenb)) {
                                    handleMessage("Phone number can only " 
                                                + "contain number");
                                    setSubmitting(false);
                                }
                                else{
                                    handleInforEdit(values, setSubmitting);
                                }
                            }
                        }
                    }}>
                        {({handleChange, handleBlur,
                        handleSubmit, values, isSubmitting}) =>
                        (<StyledFormArea>
                            {editing==false?
                            <MyTextView
                            label="Full name"
                            icon="person"
                            placeholder="Nguyen Van A"
                            placeholderTextColor='black'
                            onChangeText={handleChange('fullname')}
                            onBlur={handleBlur('fullname')}
                            value={preCredentials.data.fullname}
                            isFullname = {true}
                            />
                            :
                            <MyTextInput
                            label="Full name"
                            icon="person"
                            placeholder="Nguyen Van A"
                            placeholderTextColor={darklight}
                            onChangeText={handleChange('fullname')}
                            onBlur={handleBlur('fullname')}
                            value={values.fullname}
                            isFullname = {true}
                            />
                            }

                            {editing==false ?
                            <MyTextView
                            label="Date of birth"
                            icon="calendar"
                            placeholder="01/01/2000"
                            placeholderTextColor='black'
                            onChangeText={handleChange('dob')}
                            onBlur={handleBlur('dob')}
                            value={toTimeStamp(new Date(preCredentials.data.dob))}
                            isDate={true}
                            editable={false}
                            showDatePicker={showDatePicker}
                            />
                            :
                            <MyTextInput
                            label="Date of birth"
                            icon="calendar"
                            placeholder="01/01/2000"
                            placeholderTextColor='black'
                            onChangeText={handleChange('dob')}
                            onBlur={handleBlur('dob')}
                            value={values.dob = toTimeStamp(date)}
                            isDate={true}
                            editable={false}
                            showDatePicker={showDatePicker}
                            />
                            }

                            {editing== false ?
                            <MyTextView
                            label="Phone number"
                            icon="contact-phone"
                            placeholder="Your phone number"
                            placeholderTextColor='black'
                            onChangeText={handleChange('phonenb')}
                            onBlur={handleBlur('phonenb')}
                            value={preCredentials.data.phone}
                            isPhone={true}
                            />
                            :
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
                            }

                            {editing==false ?
                            <MyTextView
                            label="Gender"
                            icon="transgender"
                            placeholder="Male/female/3rd gender"
                            placeholderTextColor='black'
                            onChangeText={handleChange('gender')}
                            onBlur={handleBlur('gender')}
                            value={preCredentials.data.sex}
                            setGender={setGenderval}
                            isGender = {true}
                            />
                            :
                            <MyTextInput
                            label="Gender"
                            icon="transgender"
                            placeholder="Male/female/3rd gender"
                            placeholderTextColor={darklight}
                            onChangeText={handleChange('gender')}
                            onBlur={handleBlur('gender')}
                            value={values.gender=genderval}
                            gender = {genderval}
                            setGender={setGenderval}
                            isGender = {true}
                            />
                            }

                            {editing==false ?
                            <MyTextView
                            label="Address"
                            icon="address-book"
                            placeholder="Your address"
                            placeholderTextColor='black'
                            onChangeText={handleChange('address')}
                            onBlur={handleBlur('address')}
                            value={preCredentials.data.address}
                            isAddress = {true}
                            />
                            :
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
                            }

                            <Msgline type={messageType}>
                                {message}
                            </Msgline>

                            {editing==false && (<StyledButton
                            onPress={() => {setEditing(true)}}>
                                <ButtonText>
                                    Edit
                                </ButtonText>
                            </StyledButton>)}

                            {(editing==true && !isSubmitting) 
                            && (<SocialButtonPart>
                                <StyledButton save={true}
                                onPress={handleSubmit}>
                                    <ButtonText>Save</ButtonText>
                                </StyledButton>
                        
                                <StyledButton cancle={true}
                                onPress={() => {
                                    setEditing(false);
                                    handleMessage(null);
                                    values.fullname = preCredentials.data.fullname;
                                    setDate(new Date(preCredentials.data.dob));
                                    values.phonenb = preCredentials.data.phone;
                                    setGenderval(preCredentials.data.sex); 
                                    values.address = preCredentials.data.address;
                                }}>
                                    <ButtonText>Cancle</ButtonText>
                                </StyledButton>
                            </SocialButtonPart>)}

                            {(editing==true && isSubmitting) 
                            && (<StyledButton
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
    isDate, showDatePicker, isGender, isAddress, setGender, gender,
    ...props}) => {
    
    return (
        <View>
            <StyledInputLabel>{label}</StyledInputLabel>

            {(!isDate && !isGender) && 
                <StyledTextInput {...props}/>
            }
            {isDate && 
            <TouchableOpacity onPress={showDatePicker}>
                <StyledTextInput {...props}/>
            </TouchableOpacity>
            }

            {isGender && <View style={{
            height: 60,
            marginBottom: 10,
            }}>
                <GenderField setGender={setGender} gender={gender}/>
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

const MyTextView = ({label, icon, isFullname, isPhone,
    isDate, showDatePicker, isGender, isAddress, setGender,
    ...props}) => {
    return (
        <View>
            <StyledInputLabel>{label}</StyledInputLabel>

            {(!isDate) && 
                <StyledTextInput editable={false}
                    style={{backgroundColor: white}}
                    {...props}
                />}
            {isDate && 
            <TouchableOpacity onPress={showDatePicker} disabled={true}>
                <StyledTextInput 
                    style={{backgroundColor: white}}
                    {...props}
                />
            </TouchableOpacity>}

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

const GenderField = ({setGender, gender}) => {
    const [selected, setSelected] = useState(gender ? gender : "male");
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

export default UserProfile;