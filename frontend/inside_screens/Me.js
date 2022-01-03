//import part:
//base components of react-native:
import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext } from "react";
import {View, Text, Image, TouchableOpacity
} from "react-native";

//style components:
import{ StyledContainer, Innercontainer, window_width,
        StyledFormArea, 
        LeftIcon, StyledButton, ButtonText,
        Colors, StatusBarHeight
} from "./../components/style_components";

//icon components:
import {Octicons, Ionicons, AntDesign, 
        Fontisto, MaterialIcons, Entypo
} from "@expo/vector-icons";

//scroll component:
import Scroll_component from './../components/scroll_component';

import  AsyncStorage  from '@react-native-async-storage/async-storage';

import { CredentialsContext } from './../components/context_component';

//Colors:
const {brand, white, i_extra} = Colors;

const render_header = ({navigation}) => {
    const {storedCredentials, setStoredCredentials} = useContext(
                                                        CredentialsContext);
    const logout = () => {
        AsyncStorage.removeItem('ShopiiCridentials')
        .then(() => {
            setStoredCredentials(null);
        })
        .catch(error => console.log(error));
    }

    return(
        <View style={{
                backgroundColor: brand,
                paddingTop: StatusBarHeight,
                paddingLeft: 10,
                paddingRight: 0,
        }}>
            <StyledFormArea style={{
                width: '90%'}}>
                <StyledButton google={true} style={{
                    width: '25%', height: 30,
                    left: window_width*73/100,
                    padding: 7,
                    backgroundColor: "white"}}
                    onPress = {() => {
                        logout();
                        navigation.navigate("Home");
                    }}
                >
                    <ButtonText 
                        style={{
                            color: brand,
                            paddingRight: 0,
                            fontSize: 12,   
                        }}>
                        Logout
                    </ButtonText>
                </StyledButton>
                {storedCredentials != null && (
                    <View style={{
                        flexDirection:'row', 
                        paddingBottom: 12,
                        }}
                    >
                        <Image style={{
                            borderRadius: 50,
                            borderWidth: 2,
                            width: '20%',
                            height: 70
                        }}
                            source={{uri: storedCredentials.data.profilePic}}
                        />
                        <View style={{
                            marginLeft: 10,
                            justifyContent: 'center',
                            }}
                        >
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: white,
                            }}>
                                {storedCredentials.data.email}
                            </Text>
                            <Text style={{
                                fontSize: 15,
                                fontWeight: 'bold',
                                color: white,
                            }}>
                                {storedCredentials.data.username}
                            </Text>
                        </View>
                    </View>
                )}
                
            </StyledFormArea>
        </View>
    )
}

const MeScreen = ({navigation, route}) => {
    return (
        <StyledContainer style={{
        }}>
            <Innercontainer style={{
                alignItems: 'stretch', 
                paddingLeft: 0, 
                paddingRight: 0,
            }}>
                <StatusBar style = "light"/>
                
                {render_header({navigation})}
                <Scroll_component>
                    <NavigatePart navigation={navigation}
                                    type="profile"
                                    text="My Profile"/>
                    
                    <NavigatePart navigation={navigation}
                                    type="account"
                                    text="My Account"/>
                    
                    <NavigatePart navigation={navigation}
                                    type="shop"
                                    text="My Shop"/>
                    
                    <NavigatePart navigation={navigation}
                                    type="shopping cart"
                                    text="My Shopping cart"/>
                    
                    <NavigatePart navigation={navigation}
                                    type="order"
                                    text="My Order"/>
                </Scroll_component>
            </Innercontainer>
        </StyledContainer>
    )
}

const NavigatePart = ({navigation, text, type}) => {
    return (
        <TouchableOpacity 
            style={{marginTop: 15, marginBottom: 10}}
            onPress={() => {
                navigation.navigate(text)
                }}>
            <View 
            style={{
            width: '100%', height: 75,
            backgroundColor: "white",
            flexDirection: 'row',
            alignContent: 'center', alignItems:'center',
            elevation: 5}}
        >
            {type=="profile"&&<LeftIcon style={{top: 22, paddingLeft: 10}}>
                <AntDesign name="profile" 
                                size={30} color={i_extra}/>
            </LeftIcon>}

            {type=="account"&&<LeftIcon style={{top: 22, paddingLeft: 9.5}}>
                <MaterialIcons name="account-box" size={30} color={i_extra}/>
            </LeftIcon>}

            {type=="shop"&&<LeftIcon style={{top: 22, paddingLeft: 9.5}}>
                <Entypo name="shop" size={30} color={i_extra}/>
            </LeftIcon>}

            {type=="shopping cart"&&
            <LeftIcon style={{top: 22, paddingLeft: 8.4}}>
                <AntDesign name="shoppingcart" size={30} color={i_extra}/>
            </LeftIcon>}

            {type=="order"&&<LeftIcon style={{top: 22, paddingLeft: 10}}>
                <Octicons name="package" size={30} color={i_extra}/>
            </LeftIcon>}
                <View style={{paddingLeft: 50}}>
                    <Text style={{fontSize: 20, fontWeight:'bold'}}>
                        {text}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default MeScreen;