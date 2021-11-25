//import part:
import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import{ StyledContainer, Innercontainer,
        StyledFormArea, StyledInputLabel, StyledTextInput,
        LeftIcon,
        StyledButton, ButtonText,
        Colors
} from "./../components/style_components";
import {View, TouchableOpacity, Text}from "react-native";
import {Octicons, MaterialIcons, FontAwesome5, 
        MaterialCommunityIcons
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
                    initialValues={{fullname: '', dateOfBrith: '',
                    phonenb: '', gender: '', address: ''}}
                    onSubmit={(values) => {
                    console.log(values);
                    navigation.navigate("UsnPwdCreate");
                    }}>
                        {({handleChange, handleBlur,
                        handleSubmit, values}) =>
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
        </Scroll_component>
    );
}

const MyTextInput = ({label, icon, isFullname, isPhone, 
    isDate, showDatePicker, isGender, isAddress, value, setGender,
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
            {selected != "male" ?
            <TouchableOpacity 
                style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 20,
                marginBottom: 10
                }}
                onPress={() => {
                setSelected("male");
                setGender("male");
            }}>
                <MaterialCommunityIcons size={30} 
                    name="circle-outline"
                    color={darklight}/>
                    <Text>male</Text>

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
                <Text>male</Text>
            </TouchableOpacity>
            }

            {selected != "female" ?
            <TouchableOpacity 
                style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 20,
                marginBottom: 10
                }}
                onPress={() => {
                setSelected("female");
                setGender("female");
            }}>
                <MaterialCommunityIcons size={30} 
                    name="circle-outline"
                    color={darklight}/>
                    <Text>female</Text>

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
                <Text>female</Text>
            </TouchableOpacity>
            }

            {selected != "other" ?
            <TouchableOpacity 
                style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 20,
                marginBottom: 10
                }}
                onPress={() => {
                setSelected("other");
                setGender("other");
            }}>
                <MaterialCommunityIcons size={30} 
                    name="circle-outline"
                    color={darklight}/>
                    <Text>other</Text>

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
                <Text>other</Text>
            </TouchableOpacity>
            }
        </View>
    )
}

export default InforInput;