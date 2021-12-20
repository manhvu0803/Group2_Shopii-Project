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

//Colors:
const {brand, darklight, white, i_extra} = Colors;


//Information input implementation:
const UserAccount = ({navigation, route}) =>{
    //const {email, data} = route.params;

    const [editing, setEditing] = useState(false)
    
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    const handleInforInput = (credentials, setSubmitting) => {
        handleMessage(null);
        const {fullname, dob, phonenb, gender, address}
             = credentials;
        const dobsent = toDateEpoch(date);
        navigation.navigate("UsnPwdCreate", 
                            {email, fullname, dobsent, phonenb, 
                            gender, address});
        setSubmitting(false);
    };

    const handleMessage = (mess, type = false) => {
        setMessage(mess);
        setMessageType(type);
    };

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
                    <Title style={{paddingBottom: 20}}>
                        Your Account
                    </Title>
                    <Formik
                    initialValues={{fullname: '', dob: '',
                    phonenb: '', gender: '', address: ''}}
                    onSubmit={(values, {setSubmitting}) => {
                        if (values.fullname=="" || 
                            values.dob=="" || 
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
                            label="Your mail"
                            icon="mail"
                            placeholder="abc123@gmail.com"
                            placeholderTextColor='black'
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            keyboardType="email-address"
                            editable={false}
                            />
                            
                            {editing==false ?
                            <MyTextView
                            label="Username"
                            icon="rename-box"
                            placeholder="Username"
                            placeholderTextColor='black'
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            value={values.username}
                            isUsername={true}
                            />
                            :
                            <MyTextInput
                            label="Username"
                            icon="rename-box"
                            placeholder="Username"
                            placeholderTextColor={darklight}
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            value={values.username}
                            isUsername={true}
                            />
                            }

                            <PasswordPart navigation={navigation}/>

                            {editing==false && (<StyledButton
                            onPress={() => {setEditing(true)}}>
                                <ButtonText>
                                    Change username
                                </ButtonText>
                            </StyledButton>)}

                            {(editing==true && !isSubmitting) 
                            && (<SocialButtonPart>
                                <StyledButton save={true}
                                onPress={handleSubmit}>
                                    <ButtonText>Save</ButtonText>
                                </StyledButton>
                        
                                <StyledButton cancle={true}
                                onPress={() => {setEditing(false)}}>
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

const MyTextInput = ({label, icon, isUsername, editing,
    ...props}) => {
    
    return (
        <View>
            {isUsername && <LeftIcon style={{paddingLeft: 11}}>
                <MaterialCommunityIcons name={icon} size={30}
                color={i_extra}/>
            </LeftIcon>}
            {!isUsername && <LeftIcon>
                <Octicons name={icon} size={30} color={i_extra}/>
            </LeftIcon>}
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props}/>
        </View>
    )
}

const MyTextView = ({label, icon, isUsername, ...props}) => {
    return (
        <View>
            {isUsername && <LeftIcon style={{paddingLeft: 11}}>
                <MaterialCommunityIcons name={icon} size={30}
                color={i_extra}/>
            </LeftIcon>}
            {!isUsername && <LeftIcon>
                <Octicons name={icon} size={30} color={i_extra}/>
            </LeftIcon>}
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput 
                style={{backgroundColor: white}}
                {...props}/>
        </View>
    )
}

const PasswordPart = ({navigation}) => {
    return (
        <TouchableOpacity 
            style={{paddingTop: 15, paddingBottom: 15}}
            onPress={() => {
                    const goto = "ChangePwd"
                    navigation.navigate("MailVerify");
                }}>
            <View 
            style={{
            width: '100%',
            height: 120,
            backgroundColor: "white",
            flexDirection: 'row',
            alignContent: 'center',
            alignItems:'center',
            elevation: 5}}
        >
            <LeftIcon>
                <Octicons name="lock" size={30} color={i_extra}/>
            </LeftIcon>
                <View style={{paddingLeft: 50}}>
                    <Text style={{fontSize: 20, fontWeight:'bold'}}>
                        Change password
                    </Text>
                    <Text>Change password frequenly will keep you
                        safe for longer and remember
                    </Text>
                    <Text>
                        DO NOT let anyone untrusted know this information
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default UserAccount;