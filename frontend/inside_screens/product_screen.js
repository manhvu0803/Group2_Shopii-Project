//import part:
//base components of react-native:
import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext } from "react";
import {View, Text, FlatList, Image, 
        KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, 
        TouchableOpacity
} from "react-native";

//style components:
import{ StyledContainer, Innercontainer,
        Logo, StyledSearchInput, 
        StyledFormArea, StyledInputLabel, StyledTextInput,
        LeftIcon, RightIcon, StyledButton, ButtonText,
        Msgline, Emptyline,
        ExtraView, ExtraText, ExtraLink, ExtraTextLink,
        SocialButtonPart, Colors, StatusBarHeight
} from "./../components/style_components";

//icon components:
import {Octicons, Ionicons, AntDesign, 
    Fontisto, MaterialCommunityIcons
} from "@expo/vector-icons";

//formik:
import { Formik } from 'formik';

import { CredentialsContext } from './../components/context_component';

//scroll component:
import Scroll_component from '../components/scroll_component';

//Colors:
const {brand, darklight, white, i_extra} = Colors;


const render_header = ({handleBlur, handleChange, 
                        handleSubmit, storedCredentials, 
                        values, navigation, search}) => {
    return(
        <View style={{
            backgroundColor: brand,
            paddingTop: StatusBarHeight + 8,
            paddingRight: 30,
        }}>
            <StyledFormArea style={{
                flexDirection: 'row',
                width: '93%'}}>
                <TouchableOpacity style={{
                        top: 5,
                        }}
                        onPress={() => {
                            navigation.goBack()
                        }}>
                    <Ionicons name="chevron-back"
                    size={35} color={white}/>
                </TouchableOpacity>

                <MySearchInput
                    placeholder={"Result for " + search}
                    placeholderTextColor={darklight}
                    onChangeText={handleChange('search')}
                    onBlur={handleBlur('search')}
                    handleSubmit={handleSubmit}
                    value={values.search}
                    keyboardType="email-address"
                />
                <TouchableOpacity style={{
                    top: 8, paddingLeft: 4}}
                    onPress = {() => {
                        if (storedCredentials !== null){
                            navigation.push("My Shopping cart");
                        }
                        else{
                            navigation.navigate("Login");
                        }
                    }}
                >
                    <AntDesign name="shoppingcart"
                        size={30} color={white}/>
                </TouchableOpacity>
            </StyledFormArea>
        </View>
    )
}


//Product screen implementation:
const ProductScreen = ({navigation, route}) => {
    const product = route.params.item;

    const search= product.name;
    const searchby="";
    
    const {storedCredentials, setStoredCredentials} = useContext(
        CredentialsContext);

    const NumtoString = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    return(
        <KeyboardAvoidingView style={{flex:1}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}
                touchSoundDisabled={true}>
                <StyledContainer style={{
                    width: '100%', height: '100%',
                    flex: 1, backgroundColor: 'white',
                }}>
                    <StatusBar style = "light"/>
                    <Formik 
                        initialValues={{search: '', searchby: 'searchquery'}}
                        onSubmit={(values) => {
                            if (values.search.length > 0){
                                console.log(values.search);
                                navigation.push("Search result", 
                                                values)
                            }
                    }}>
                        {({handleChange, handleBlur,
                        handleSubmit, values}) =>
                        (
                            <>
                                {render_header({
                                    handleBlur, handleChange, handleSubmit, 
                                    values, storedCredentials, 
                                    navigation, search})}
                                <View style={{
                                    marginTop: 40,
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <View style={{
                                                paddingTop: 10,
                                                paddingLeft: 50,
                                            }}
                                        >
                                            <Image style={{
                                                        height: 200,
                                                        width: 200,
                                                    }}
                                                source={{uri: product.imageUrl[0]}}/>
                                        </View>

                                        <View style={{
                                                paddingRight: 20,
                                            }}
                                        >
                                            <Text style={{
                                                    fontSize: 20,
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                {product.name}
                                            </Text>

                                            <Text style={{
                                                    fontSize: 20,
                                                    paddingBottom: 5,
                                                }}
                                            >
                                                Available: {product.available}
                                            </Text>

                                            <StyledButton google={true} style={{
                                                    width: '80%', height: 60,
                                                    padding: 0,
                                                    backgroundColor: brand,
                                                }}
                                                onPress={() => {
                                                    if (storedCredentials !== null){
                                                        console.log("Added.")
                                                    }
                                                    else{
                                                        navigation.navigate("Login");
                                                    }
                                                }}
                                            >
                                                <ButtonText 
                                                    style={{
                                                        color: white,
                                                        fontSize: 17,   
                                                    }}
                                                >
                                                    Add to shopping cart
                                                </ButtonText>
                                            </StyledButton>
                                        </View>
                                    </View>

                                    <View style={{
                                            marginTop: 20,
                                            paddingLeft: 10,
                                        }}
                                    >
                                        <Text style={{
                                                fontSize: 30,
                                                fontWeight: 'bold',
                                            }}
                                        >
                                                Price:
                                        </Text>
                                        <Text style={{
                                                fontSize: 30,
                                            }}
                                        >
                                            {NumtoString(product.price)}đ
                                        </Text>

                                        <Text style={{
                                                fontSize: 30,
                                                marginTop: 5,
                                                fontWeight: 'bold',
                                            }}
                                        >
                                                Description:
                                        </Text>
                                        <Text style={{
                                                fontSize: 20,
                                            }}
                                        >
                                                {product.description}
                                        </Text>

                                        <Text style={{
                                                fontSize: 30,
                                                marginTop: 5,
                                                fontWeight: 'bold',
                                            }}
                                        >
                                                Seller: {product.seller}
                                        </Text>
                                    </View>
                                </View>
                            </>
                            )}
                    </Formik>
                </StyledContainer>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const MySearchInput = ({handleSubmit, ...props}) => {
    return (
        <View style={{
            width: '93%',
            paddingRight: 5,
        }}>
            <StyledSearchInput {...props}/>
            <RightIcon 
                style={{top: 11.5}}
                onPress={handleSubmit}
            >
                    <Ionicons name="search-outline"
                        size={25} color={brand}/>
            </RightIcon>
        </View>
    )
}

export default ProductScreen;