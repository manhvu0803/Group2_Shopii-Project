//import part:
//base components of react-native:
import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext } from "react";
import {View, Text, FlatList, Image, 
        TouchableOpacity,  
} from "react-native";

//style components:
import{ StyledContainer, 
        StyledSearchInput, Title, 
        StyledFormArea, StyledButton, ButtonText, 
        Colors, StatusBarHeight
} from "./../components/style_components";

//icon components:
import {Ionicons, 
} from "@expo/vector-icons";

import  AsyncStorage  from '@react-native-async-storage/async-storage';

import { CredentialsContext } from './../components/context_component';

//Colors:
const {brand, white} = Colors;


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
                    Order history
                </Title>
            </StyledFormArea>
        </View>
    )
}


//Product screen implementation:
const MyOrder = ({navigation, route}) => {

    const {storedCredentials, setStoredCredentials} = useContext(
                                                        CredentialsContext);
    const preCredentials = {...storedCredentials} || {};

    const NumtoString = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    const OrderAgain = (product) => {
        const productOrder = JSON.parse(JSON.stringify(product));
        productOrder["date ordered"] = new Date(Date.now()).toLocaleString();
        preCredentials.data["ordered list"].push(productOrder);
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

    return(
        <StyledContainer style={{
            width: '100%', height: '100%',
            flex: 1, backgroundColor: 'white',
        }}>
            <StatusBar style = "light"/>
            {render_header({navigation})}
            <FlatList 
                style={{
                    overflow: 'hidden',
                }}
                data={preCredentials.data["ordered list"]}
                keyExtractor={item => [item["id"], item["date ordered"]]}
                renderItem={({item, index}) => (
                    <View style={{paddingTop: 30,
                        height: 333,
                        width: '100%',
                        backgroundColor: white,
                        elevation: 5,
                        marginTop: 5,
                        marginBottom: 5,
                        }}
                    >
                        <View style={{
                                height: '50%',
                                flexDirection: 'row',
                                marginBottom: 4,
                            }}
                         >
                            <Image style={{
                                    height: 150,
                                    width: 150,
                                }}
                                source={{uri: item.imageUrl[0]}}
                            />
                            <View style={{
                                    paddingLeft: 5
                                }}
                            >
                                <TouchableOpacity 
                                    onPress={() => {
                                        navigation.push("Product detail", {item});
                                    }}
                                >
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
                                        marginTop: 5,
                                    }}
                                >
                                    Date Order:
                                </Text>
                                <Text style={{
                                        fontSize: 20,
                                    }}
                                >
                                    {item["date ordered"]}
                                </Text>
                            </View>
                        </View>
                        <View style={{paddingLeft: 10,
                                height: '20%',
                                width: '100%',
                                paddingTop: 1,
                                paddingBottom: 3,
                                borderTopWidth: 1,
                                borderBottomWidth: 0.75,
                            }}
                        >
                            <Text style={{fontSize: 20}}>
                                Amount: {item["amount to order"]} product(s)
                            </Text>
                            <Text style={{fontSize: 20}}>
                                Price: {NumtoString(item["price"])}đ
                            </Text>
                        </View>
                        <View style={{
                                height: '30%',
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
                                        fontSize: 20,
                                    }}
                                >
                                    State:
                                </Text>
                                <Text style={{
                                        fontSize: 20,
                                    }}
                                >
                                    Waiting shop to accept
                                </Text>
                            </View>
                            <View style={{
                                    alignItems: 'center',
                                    width: '70%',
                                    paddingTop: 15,
                                }}
                            >
                                <StyledButton google={true} 
                                    style={{
                                        marginRight: 15,
                                        borderRadius: 15,
                                        width: '40%',
                                        height: '50%',
                                        padding: 0,
                                        backgroundColor: brand,
                                    }}
                                    onPress={() => {
                                        console.log("Ordered.");
                                        OrderAgain(item);
                                    }}
                                >
                                    <ButtonText 
                                        style={{
                                            paddingLeft: 5,
                                            color: white,
                                            fontSize: 15,   
                                        }}
                                    >
                                        Order Again
                                    </ButtonText>
                                </StyledButton>
                            </View>
                        </View>
                    </View>
                )}
            />
        </StyledContainer>
    )
}

export default MyOrder;