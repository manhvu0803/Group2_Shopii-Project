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
import {Ionicons, 
} from "@expo/vector-icons";

//formik:
import { Formik } from 'formik';

import  AsyncStorage  from '@react-native-async-storage/async-storage';

import { CredentialsContext } from './../components/context_component';

//Colors:
const {brand, white, gg} = Colors;


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
                        paddingLeft: 40,
                    }}
                >
                    Shopping cart
                </Title>
            </StyledFormArea>
        </View>
    )
}


//Product screen implementation:
const Shoppingcart = ({navigation, route}) => {

    const {storedCredentials, setStoredCredentials} = useContext(
                                                        CredentialsContext);
    const preCredentials = {...storedCredentials} || {};

    const NumtoString = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    const RemoveFromShoppingcart = (productToRemove) => {
        const index = preCredentials.data["shopping cart"].indexOf(productToRemove);
        preCredentials.data["shopping cart"].splice(index, 1);
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

    const Order = () => {
        const indexOrdered = []
        for (const index in preCredentials.data["shopping cart"]){
            const product = JSON.parse(JSON.stringify(preCredentials.data["shopping cart"][index]));
            if (product["amount to order"] > 0){
                product["price"] = product["price"] * product["amount to order"];
                product["date ordered"] = new Date(Date.now()).toLocaleString();
                product["state"] = "Waiting shop to accept";
                preCredentials.data["ordered list"].push(product);
                indexOrdered.push(index);
            }
        }
        const indexOrderedReverse = indexOrdered.reverse();
        for (const index in indexOrderedReverse){
            preCredentials.data["shopping cart"].splice(indexOrderedReverse[index], 1);
        }
        AsyncStorage.setItem('ShopiiCridentials', JSON.stringify(preCredentials))
        .then(() => {
            setStoredCredentials(preCredentials);
        })
        .catch((error) => {
            console.log(error);
            preCredentials = {...storedCredentials} || {};
            handleMessage("Ordering product failed.")
        })
    }

    const price = preCredentials?.data["shopping cart"]?.reduce((total,item) => {
       total += parseInt(item['amount to order'] || 0, 10) * parseInt(item.price, 10);
       return total;
    }, 0);

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
                        data={preCredentials.data["shopping cart"]}
                        keyExtractor={item => item.id}
                        renderItem={({item, index}) => (
                            <Formik 
                                initialValues={{search: '', searchby: 'searchquery', amount: null}}
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
                                            height: 200,
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
                                                    paddingLeft: 10
                                                }}
                                            >
                                                <TouchableOpacity 
                                                    onPress={() => {
                                                        navigation.push("Product detail", {item});
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
                                                    Price: {NumtoString(item.price)}đ
                                                </Text>
                                                <Text style={{fontSize: 20}}>Amount:</Text>
                                                <AmountInput  onChangeText={(e) => {
                                                    try {
                                                        handleChange('amount');
                                                        const idx = preCredentials.data["shopping cart"].findIndex(itemSearch => itemSearch.id == item.id);
                                                        if (idx > -1){
                                                            preCredentials.data["shopping cart"][idx]['amount to order'] = parseInt(e,10) || 0;
                                                            if (preCredentials.data["shopping cart"][idx]['amount to order'] > preCredentials.data["shopping cart"][idx]['available']){
                                                                preCredentials.data["shopping cart"][idx]['amount to order'] = preCredentials.data["shopping cart"][idx]['available'];
                                                            }
                                                            AsyncStorage.setItem('ShopiiCridentials', JSON.stringify(preCredentials))
                                                            .then(() => {
                                                                setStoredCredentials(preCredentials);
                                                            })
                                                            .catch((error) => {
                                                                console.log(error);
                                                                preCredentials = {...storedCredentials} || {};
                                                                handleMessage("Changing amount of product to order failed.")
                                                            })
                                                        }
                                                    }catch(err) {
                                                           console.log(err)
                                                    }
                                                }}
                                                            onBlur={handleBlur('amount')}
                                                            value={values.amount=item["amount to order"].toString()}
                                                />
                                                <StyledButton google={true} 
                                                    style={{
                                                        width: '70%',
                                                        height: '25%',
                                                        marginRight: 10,
                                                        borderRadius: 15,
                                                        padding: 0,
                                                        backgroundColor: gg,
                                                    }}
                                                    onPress={() => {
                                                        RemoveFromShoppingcart(item);
                                                    }}
                                                >
                                                    <ButtonText 
                                                        style={{
                                                            paddingLeft: 5,
                                                            color: white,
                                                            fontSize: 15,   
                                                        }}
                                                    >
                                                        Remove from cart
                                                    </ButtonText>
                                                </StyledButton>
                                            </View>
                                        </View>
                                    </View>
                                )}
                            </Formik>
                        )}
                    />
                    <View style={{
                            height: 100,
                            width:'100%',
                            flexDirection: 'row',
                            paddingLeft: 10,
                        }}
                    >
                        <View style={{paddingTop: 5,
                                width: '50%',
                            }}
                        >
                            <Text style={{
                                    fontSize: 30,
                                }}
                            >
                                Total:
                            </Text>
                            <Text style={{
                                    fontSize: 30,
                                }}
                            >
                                {NumtoString(price)}đ
                            </Text>
                        </View>
                        <View style={{
                                alignItems: 'center',
                                width: '70%', height: '100%',
                                paddingTop: 15,
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
                                    console.log("Ordered.");
                                    Order();
                                }}
                            >
                                <ButtonText 
                                    style={{
                                        paddingLeft: 5,
                                        color: white,
                                        fontSize: 20,   
                                    }}
                                >
                                    Order
                                </ButtonText>
                            </StyledButton>
                        </View>
                    </View>
                </StyledContainer>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const AmountInput = ({handleSubmit, ...props}) => {
    return (
        <View style={{
            marginTop: 4,
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
                {...props}/>
        </View>
    )
}

export default Shoppingcart;