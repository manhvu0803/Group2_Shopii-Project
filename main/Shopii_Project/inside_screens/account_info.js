//import part:
import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import{ StyledContainer, Innercontainer,
        Title, SubTitle,
        StyledFormArea, 
        LeftIcon, 
        Colors,
        StyledOutputLabel,
        StyledTextOutput
} from "./../components/style_components";
import {View} from "react-native";
import {Octicons, Ionicons} from "@expo/vector-icons";
import Scroll_component from './../components/scroll_components';
//Colors:
const {brand, darklight} = Colors;

//Acount info implementation
const Account_Info = ({navigation}) =>{
    
    return (
        <Scroll_component>
            <StyledContainer>
                <StatusBar style="dark"/>
                <Innercontainer>
                    <Title>Shopii</Title>
                    <SubTitle>Account Information</SubTitle>
                    <StyledFormArea>
                        <MyTextOutput
                            label="Full name"
                            icon="person"
                            fullname="Nguyen Van A"
                            isDate = {false}
                            date = ""
                        />

                        <MyTextOutput
                            label="Email"
                            icon="mail"
                            fullname="Nguyen Van A"
                            isDate = {false}
                            date = ""
                            email = "email@email.com"
                            isEmail = {true}
                        />

                        <MyTextOutput
                            label="Date of birth"
                            icon="calendar"
                            fullname="Nguyen Van A"
                            isDate = {true}
                            date = "2000/01/01"
                        />
                        
                    </StyledFormArea>
                </Innercontainer>
            </StyledContainer>
        </Scroll_component>
    );
}

const MyTextOutput= ({label,icon,fullname,email,isEmail,isDate,date,...props }) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand}/>
            </LeftIcon>
            <StyledOutputLabel>
                {label}
            </StyledOutputLabel>
            {!isDate && !isEmail && <StyledTextOutput>{fullname}</StyledTextOutput>}
            {isDate && !isEmail && <StyledTextOutput>{date}</StyledTextOutput>}
            {isEmail && !isDate && <StyledTextOutput>{email} </StyledTextOutput>}
        </View>
    )
}

export default Account_Info;