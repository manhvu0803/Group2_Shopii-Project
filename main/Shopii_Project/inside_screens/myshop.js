//import part:
//base components of react-native:
import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext } from "react";
import {View, Text, FlatList, Image, 
        KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, 
        TouchableOpacity, 
} from "react-native";

//style components:
import{ StyledContainer, StyledSearchInput, Title, 
        StyledFormArea, StyledButton, ButtonText,
        Colors, StatusBarHeight
} from "./../components/style_components";

//icon components:
import {Ionicons, Foundation, 
} from "@expo/vector-icons";

//formik:
import { Formik } from 'formik';

import  AsyncStorage  from '@react-native-async-storage/async-storage';

import { CredentialsContext } from './../components/context_component';

//Colors:
const {brand, white, gg, i_extra} = Colors;


const render_header = ({navigation}) => {
    return(
        <View style={{
            backgroundColor: brand,
            paddingTop: StatusBarHeight + 4,
            paddingRight: 30,
            paddingBottom: 10,
        }}>
            <StyledFormArea style={{
                flexDirection: 'row',
                width: '93%'}}>
                <TouchableOpacity style={{
                        top: 10,
                        }}
                        onPress={() => {
                            navigation.goBack()
                        }}>
                    <Ionicons name="chevron-back"
                    size={35} color={white}/>
                </TouchableOpacity>
                <Title style={{
                        color: white,
                        paddingLeft: 86,
                    }}
                >
                    My Shop
                </Title>
            </StyledFormArea>
        </View>
    )
}


//Product screen implementation:
const MyShop = ({navigation, route}) => {

    const {storedCredentials, setStoredCredentials} = useContext(
                                                        CredentialsContext);
    const preCredentials = {...storedCredentials} || {};

    const NumtoString = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    if (preCredentials.data["product list"].length == 0){
        preCredentials.data["product list"].push({"available": 5, "category": "clothing", "description": "White T shirt",
                                            "id": "product2",
                                            "imageUrl": [
                                            "https://storage.googleapis.com/projectshopiicnpm-d6027.appspot.com/products/product2/1.jpg?GoogleAccessId=firebase-adminsdk-bp2t1%40projectshopiicnpm-d6027.iam.gserviceaccount.com&Expires=1642517893&Signature=XBt64UqESOaigOdfi6l9%2FvDhctuWu7iVJmU0f91rZ9tt3pLOKOQtCPZeSWJvEyl3LcednBo1cZFDhust8i0b97HBWHrZuM1k60BatzGmkwbZsMD1lY2HdZGX%2FGvjrO0yiJB%2BRs5xP%2B8yjwOj3FxvYI3QI7hvcl6YXoFagJlxgorTcRyXpLBvrK0ZSuibqZWwF9rYIn%2FGRwsySbKJ9ps7dY1wyIc%2BBvlV8y3xFgp8tIAHYKwvQvEaROcsMNF694BsWHueAUD%2Ba2clK3DhOohOtNiE2ObYoPBaCzBrV7jiHAsSGLvjcDC3N0jG5MdWeR5hhpBWyXZ%2BZWoFF0YEyYV4gA%3D%3D",
                                            "https://storage.googleapis.com/projectshopiicnpm-d6027.appspot.com/products/product2/1.jpg?GoogleAccessId=firebase-adminsdk-bp2t1%40projectshopiicnpm-d6027.iam.gserviceaccount.com&Expires=1642517893&Signature=XBt64UqESOaigOdfi6l9%2FvDhctuWu7iVJmU0f91rZ9tt3pLOKOQtCPZeSWJvEyl3LcednBo1cZFDhust8i0b97HBWHrZuM1k60BatzGmkwbZsMD1lY2HdZGX%2FGvjrO0yiJB%2BRs5xP%2B8yjwOj3FxvYI3QI7hvcl6YXoFagJlxgorTcRyXpLBvrK0ZSuibqZWwF9rYIn%2FGRwsySbKJ9ps7dY1wyIc%2BBvlV8y3xFgp8tIAHYKwvQvEaROcsMNF694BsWHueAUD%2Ba2clK3DhOohOtNiE2ObYoPBaCzBrV7jiHAsSGLvjcDC3N0jG5MdWeR5hhpBWyXZ%2BZWoFF0YEyYV4gA%3D%3D"
                                            ],
                                            "name": "White T shirt",
                                            "pid": "product2",
                                            "price": 100000,
                                            "rating": 4,
                                            "selling": true,})
    }


    const TakeoffFromSellList = (product) => {
        const index = preCredentials.data["product list"].indexOf(product);
        preCredentials.data["product list"][index].selling = false;
        AsyncStorage.setItem('ShopiiCridentials', JSON.stringify(preCredentials))
        .then(() => {
            setStoredCredentials(preCredentials);
        })
        .catch((error) => {
            console.log(error);
            preCredentials = {...storedCredentials} || {};
            handleMessage("Adding product failed.")
        })
    }

    const PutToSellList = (product) => {
        const index = preCredentials.data["product list"].indexOf(product);
        preCredentials.data["product list"][index].selling = true;
        AsyncStorage.setItem('ShopiiCridentials', JSON.stringify(preCredentials))
        .then(() => {
            setStoredCredentials(preCredentials);
        })
        .catch((error) => {
            console.log(error);
            preCredentials = {...storedCredentials} || {};
            handleMessage("Adding product failed.")
        })
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

                    {render_header({navigation})}
                    
                    <FlatList 
                        data={preCredentials.data["product list"]}
                        keyExtractor={item => item.id}
                        renderItem={({item, index}) => (
                            <Formik 
                                initialValues={{search: '', searchby: 'searchquery', stock: null}}
                                onSubmit={(values) => {
                                    if (values.search.length > 0){
                                        console.log(values.search);
                                        navigation.push("Search result", values)
                                    }
                                }}
                            >
                            {({handleChange, handleBlur,
                                handleSubmit, values}) =>
                                (
                                    <View style={{
                                            height: 240,
                                        }}
                                    >
                                        <View style={{
                                                height: "95%",
                                                paddingTop: 5,
                                                paddingLeft: 10,
                                                backgroundColor: white,
                                                flexDirection: 'row',
                                                elevation: 5,
                                            }}
                                        >
                                            <View style={{paddingTop: 5}}>
                                                <Image style={{
                                                        height: 170,
                                                        width: 170,
                                                    }}
                                                    source={{uri: item.imageUrl[0]}}
                                                />
                                            </View>
                                            <View style={{
                                                    paddingLeft: 10, flex: 1,
                                                }}
                                            >
                                                <TouchableOpacity 
                                                    onPress={() => {
                                                        if (item.selling == true){
                                                            navigation.push("Product detail", {item});
                                                        }
                                                    }}>
                                                    <Text style={{
                                                            fontSize: 20,
                                                            fontWeight: 'bold',
                                                        }}
                                                    >
                                                        {item.name}
                                                    </Text>
                                                </TouchableOpacity>
                                                <Text style={{
                                                        fontSize: 20,
                                                    }}
                                                >
                                                    Price:
                                                </Text>
                                                <InputForm  
                                                    enable={!item.selling}
                                                    onChangeText={(e) => {
                                                    try {
                                                        handleChange('stock');
                                                        const idx = preCredentials.data["product list"].findIndex(itemSearch => itemSearch.id == item.id);
                                                        if (idx > -1){
                                                            preCredentials.data["product list"][idx]['price'] = parseInt(e,10) || 0;
                                                            AsyncStorage.setItem('ShopiiCridentials', JSON.stringify(preCredentials))
                                                            .then(() => {
                                                                setStoredCredentials(preCredentials);
                                                            })
                                                            .catch((error) => {
                                                                console.log(error);
                                                                preCredentials = {...storedCredentials} || {};
                                                                handleMessage("Changing amount of product to sell failed.")
                                                            })
                                                        }
                                                    }catch(err) {
                                                           console.log(err)
                                                    }
                                                }}
                                                            onBlur={handleBlur('stock')}
                                                            value={values.stock=(item["price"].toString() + "đ")}
                                                />
                                                <Text style={{fontSize: 20}}>Availabel:</Text>
                                                <InputForm  
                                                    enable={!item.selling}
                                                    onChangeText={(e) => {
                                                    try {
                                                        handleChange('stock');
                                                        const idx = preCredentials.data["product list"].findIndex(itemSearch => itemSearch.id == item.id);
                                                        if (idx > -1){
                                                            preCredentials.data["product list"][idx]['available'] = parseInt(e,10) || 0;
                                                            AsyncStorage.setItem('ShopiiCridentials', JSON.stringify(preCredentials))
                                                            .then(() => {
                                                                setStoredCredentials(preCredentials);
                                                            })
                                                            .catch((error) => {
                                                                console.log(error);
                                                                preCredentials = {...storedCredentials} || {};
                                                                handleMessage("Changing amount of product to sell failed.")
                                                            })
                                                        }
                                                    }catch(err) {
                                                           console.log(err)
                                                    }
                                                }}
                                                            onBlur={handleBlur('stock')}
                                                            value={values.stock=item["available"].toString()}
                                                />
                                                {item.selling == true
                                                ? <StyledButton google={true} 
                                                        style={{
                                                            width: '70%',
                                                            height: '25%',
                                                            marginRight: 10,
                                                            borderRadius: 15,
                                                            padding: 0,
                                                            backgroundColor: gg,
                                                        }}
                                                        onPress={() => {
                                                            TakeoffFromSellList(item);
                                                        }}
                                                    >
                                                        <ButtonText 
                                                            style={{
                                                                paddingLeft: 5,
                                                                color: white,
                                                                fontSize: 15,   
                                                            }}
                                                        >
                                                            Take off
                                                        </ButtonText>
                                                    </StyledButton>
                                                : <StyledButton google={true} 
                                                        style={{
                                                            width: '70%',
                                                            height: '25%',
                                                            marginRight: 10,
                                                            borderRadius: 15,
                                                            padding: 0,
                                                            backgroundColor: i_extra,
                                                        }}
                                                        onPress={() => {
                                                            PutToSellList(item);
                                                        }}
                                                    >
                                                        <ButtonText 
                                                            style={{
                                                                paddingLeft: 5,
                                                                color: white,
                                                                fontSize: 15,   
                                                            }}
                                                        >
                                                            Sell
                                                        </ButtonText>
                                                    </StyledButton>
                                                }
                                            </View>
                                        </View>
                                    </View>
                                )}
                            </Formik>
                        )}
                    />
                    <View style={{
                            borderTopWidth: 0.75,
                            height: 100, width:'100%',
                            alignItems: 'center', justifyContent: 'center',
                        }}
                    >
                        <StyledButton google={true} 
                            style={{
                                marginRight: 10,
                                borderRadius: 15,
                                padding: 0,
                                backgroundColor: brand,
                                }}
                                onPress={() => {
                                console.log("Added.");
                            }}
                        >
                            <ButtonText 
                                style={{
                                    paddingLeft: 5,
                                    color: white,
                                    fontSize: 20, 
                                }}
                            >
                                <View style={{flexDirection: 'row',
                                    }}
                                >
                                    <Text style={{color: white, 
                                        fontSize: 20, fontWeight: 'bold'
                                    }}>
                                        Add
                                    </Text>
                                    <View style={{marginLeft: 5, marginTop: 3}}>
                                        <Foundation name="plus" size={20} color={white}/>
                                    </View>
                                </View>
                            </ButtonText>
                        </StyledButton>
                    </View>
                </StyledContainer>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const InputForm = ({enable, ...props}) => {
    return (
        <View style={{
            marginTop: 4, marginBottom:5,
            width: "75%",
            height: 30,
            borderRadius: 25,
            elevation: 5,
        }}>
            <StyledSearchInput style={{
                    top: -3,
                    height: 30,
                    paddingLeft: 30,
                    paddingRight: 30,
                    textAlign: 'center',
                }} 
                editable={enable}
                {...props}/>
        </View>
    )
}

export default MyShop;