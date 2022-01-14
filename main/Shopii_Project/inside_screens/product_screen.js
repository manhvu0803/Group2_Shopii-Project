//import part:
//base components of react-native:
import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext } from "react";
import {View, Text, FlatList, Image, Alert, 
        KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, 
        TouchableOpacity
} from "react-native";

//style components:
import{ StyledContainer, StyledSearchInput, 
        StyledFormArea, RightIcon, StyledButton, ButtonText, 
        Colors, StatusBarHeight
} from "./../components/style_components";

//icon components:
import {Ionicons, AntDesign, 
} from "@expo/vector-icons";

//formik:
import { Formik } from 'formik';

//scroll component:
import Scroll_component from '../components/scroll_component';


import  AsyncStorage  from '@react-native-async-storage/async-storage';

import { CredentialsContext } from './../components/context_component';
import { render } from 'react-dom';

//Colors:
const {brand, darklight, white} = Colors;


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
    const product = {...route.params.item};
    product["amount to order"] = 0;

    const search= product.name;
    const searchby="";
    
    const {storedCredentials, setStoredCredentials} = useContext(
                                                        CredentialsContext);
    const preCredentials = {...storedCredentials} || null;

    const isAdded = () => {
        for (const index in preCredentials.data["shopping cart"]){
            if (product.id == preCredentials.data["shopping cart"][index].id){
                return 1;
            }
        }
        return 0
    }

    let added = 0;
    if (preCredentials.data !== undefined){
        added = isAdded();
    }

    const AddtoShoppingcart = (productToAdd) => {
        const index = preCredentials.data["shopping cart"].indexOf(productToAdd);
        if (index != 1){
            preCredentials.data["shopping cart"].push(productToAdd);
            AsyncStorage.setItem('ShopiiCridentials', JSON.stringify(preCredentials))
            .then(() => {
                setStoredCredentials(preCredentials);
                added = 1;
            })
            .catch((error) => {
                console.log(error);
                preCredentials.data["shopping cart"].pop();
                handleMessage("Adding product failed.")
            })
        }
    }    

    const NumtoString = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    
    const renderButton = (added, product) => {
        if (product.available == 0){
            return(
                <StyledButton google={true} style={{
                        width: '80%', height: 60,
                        padding: 0,
                        backgroundColor: darklight,
                    }}
                    onPress={() => {
                        Alert.alert("", "This product is out of stock.", 
                                    [{text: "continue"}]);
                    }}
                >
                    <ButtonText 
                        style={{
                            color: white,
                            fontSize: 17,   
                        }}
                    >
                        Out of stock
                    </ButtonText>
                </StyledButton>
            )
        }
        else if (added == 0){
            return(
                <StyledButton google={true} style={{
                        width: '80%', height: 60,
                        padding: 0,
                        backgroundColor: brand,
                    }}
                    onPress={() => {
                        if (storedCredentials !== null){
                            AddtoShoppingcart(product);
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
                        Add to cart
                    </ButtonText>
                </StyledButton>
            )
        }
        else{
            return(
                <StyledButton google={true} style={{
                        width: '80%', height: 60,
                        padding: 0,
                        backgroundColor: brand,
                    }}
                    onPress={() => {
                        Alert.alert("", "This product is already added into your cart.", 
                                    [{text: "continue"}]);
                    }}
                >
                    <ButtonText 
                        style={{
                            color: white,
                            fontSize: 17,   
                        }}
                    >
                        Added
                    </ButtonText>
                </StyledButton>
            )
        }
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
                                <Scroll_component>
                                    <View style={{
                                        marginTop: 30,
                                        marginBottom: 30,
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                    }}>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            <View style={{
                                                    width: '50%',
                                                }}
                                            >
                                                <Image style={{
                                                            height: 170,
                                                            width: 170,
                                                        }}
                                                    source={{uri: product.imageUrl[0]}}/>
                                            </View>

                                            <View style={{
                                                    width: '50%',
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

                                                {renderButton(added, product)}
                                            </View>
                                        </View>

                                        <View style={{
                                                marginTop: 20,
                                                paddingLeft: 10,
                                            }}
                                        >
                                            <View style={{
                                                    marginTop: 5, 
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
                                            </View>

                                            <View style={{
                                                    marginTop: 5, 
                                                }}
                                            >
                                                <Text style={{
                                                        fontSize: 30,
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                        Description:
                                                </Text>
                                                <Text style={{
                                                        fontSize: 25,
                                                    }}
                                                >
                                                        {product.description}
                                                </Text>
                                            </View>
                                            
                                            <View style={{flexDirection: 'row', 
                                                    marginTop: 5, 
                                                }}
                                            >
                                                <Text style={{
                                                        fontSize: 30,
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                        Seller:
                                                </Text>
                                                <Text style={{
                                                        paddingLeft: 7,
                                                        paddingTop: 5,
                                                        fontSize: 25,
                                                    }}
                                                >
                                                        {product.seller}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </Scroll_component>
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