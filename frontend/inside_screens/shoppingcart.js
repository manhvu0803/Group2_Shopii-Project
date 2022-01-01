//import part:
//base components of react-native:
import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext } from "react";
import {View, Text, FlatList, Image, 
        KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, 
        TouchableOpacity, TextInput, 
} from "react-native";

//style components:
import{ StyledContainer, Innercontainer,
        Logo, StyledSearchInput, Title, 
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
                    <Ionicons name="chevron-down"
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
    //const product = route.params.item;

    const search= "A";
    const searchby="";

    const img = "https://storage.googleapis.com/projectshopiicnpm-d6027.appspot.com/products/product2/1.jpg?GoogleAccessId=firebase-adminsdk-bp2t1%40projectshopiicnpm-d6027.iam.gserviceaccount.com&Expires=1641638498&Signature=PlqQoCrySUFiJ2xDfvkysaj1EcEi%2FG4lNme6YRiKpcO52bAGxwKEiIKe22stVm0aSd%2BnrfKiBRB%2FtLHXtvCDvu%2FpP8Vwg0JJBJ9tst1uAAA9PX6Um0yiIAGZXhufvr5HsCeiM%2FnQYwqZycWWq7r3Uii1mtV8qERs%2FBwnvJGZepYoVSAvStVNgTwZJF9Sfd85c8tOdRiVxme3%2BoWqJnYlCvkY7mWFsA4XlQjeMOM%2FWob6YOMuT6BM%2FH%2FnuZR3HFcYZAyh4iOuLe2DAtseNRQSy3rXRGC488X9cDx%2F7A4OSXoabaRSuwM9e7hlXKHQhtdvJCQcNrkS%2BSck%2FnjJ3AFx7A%3D%3D";
    
    const item = {available: 5, category: "clothing", description: "White T shirt", id: "product1", imageUrl: [
    "https://storage.googleapis.com/projectshopiicnpm-d6027.appspot.com/products/product2/1.jpg?GoogleAccessId=firebase-adminsdk-bp2t1%40projectshopiicnpm-d6027.iam.gserviceaccount.com&Expires=1641638498&Signature=PlqQoCrySUFiJ2xDfvkysaj1EcEi%2FG4lNme6YRiKpcO52bAGxwKEiIKe22stVm0aSd%2BnrfKiBRB%2FtLHXtvCDvu%2FpP8Vwg0JJBJ9tst1uAAA9PX6Um0yiIAGZXhufvr5HsCeiM%2FnQYwqZycWWq7r3Uii1mtV8qERs%2FBwnvJGZepYoVSAvStVNgTwZJF9Sfd85c8tOdRiVxme3%2BoWqJnYlCvkY7mWFsA4XlQjeMOM%2FWob6YOMuT6BM%2FH%2FnuZR3HFcYZAyh4iOuLe2DAtseNRQSy3rXRGC488X9cDx%2F7A4OSXoabaRSuwM9e7hlXKHQhtdvJCQcNrkS%2BSck%2FnjJ3AFx7A%3D%3D", 
    "https://storage.googleapis.com/projectshopiicnpm-d6027.appspot.com/products/product2/1.jpg?GoogleAccessId=firebase-adminsdk-bp2t1%40projectshopiicnpm-d6027.iam.gserviceaccount.com&Expires=1641638498&Signature=PlqQoCrySUFiJ2xDfvkysaj1EcEi%2FG4lNme6YRiKpcO52bAGxwKEiIKe22stVm0aSd%2BnrfKiBRB%2FtLHXtvCDvu%2FpP8Vwg0JJBJ9tst1uAAA9PX6Um0yiIAGZXhufvr5HsCeiM%2FnQYwqZycWWq7r3Uii1mtV8qERs%2FBwnvJGZepYoVSAvStVNgTwZJF9Sfd85c8tOdRiVxme3%2BoWqJnYlCvkY7mWFsA4XlQjeMOM%2FWob6YOMuT6BM%2FH%2FnuZR3HFcYZAyh4iOuLe2DAtseNRQSy3rXRGC488X9cDx%2F7A4OSXoabaRSuwM9e7hlXKHQhtdvJCQcNrkS%2BSck%2FnjJ3AFx7A%3D%3D"], 
    name: "White T shirt", pid: "product2", price: 100000, rating: 4, seller: "username2"};

    const cartList = [{available: 5, category: "clothing", description: "White T shirt", id: "product1", imageUrl: [
                        "https://storage.googleapis.com/projectshopiicnpm-d6027.appspot.com/products/product2/1.jpg?GoogleAccessId=firebase-adminsdk-bp2t1%40projectshopiicnpm-d6027.iam.gserviceaccount.com&Expires=1641638498&Signature=PlqQoCrySUFiJ2xDfvkysaj1EcEi%2FG4lNme6YRiKpcO52bAGxwKEiIKe22stVm0aSd%2BnrfKiBRB%2FtLHXtvCDvu%2FpP8Vwg0JJBJ9tst1uAAA9PX6Um0yiIAGZXhufvr5HsCeiM%2FnQYwqZycWWq7r3Uii1mtV8qERs%2FBwnvJGZepYoVSAvStVNgTwZJF9Sfd85c8tOdRiVxme3%2BoWqJnYlCvkY7mWFsA4XlQjeMOM%2FWob6YOMuT6BM%2FH%2FnuZR3HFcYZAyh4iOuLe2DAtseNRQSy3rXRGC488X9cDx%2F7A4OSXoabaRSuwM9e7hlXKHQhtdvJCQcNrkS%2BSck%2FnjJ3AFx7A%3D%3D", 
                        "https://storage.googleapis.com/projectshopiicnpm-d6027.appspot.com/products/product2/1.jpg?GoogleAccessId=firebase-adminsdk-bp2t1%40projectshopiicnpm-d6027.iam.gserviceaccount.com&Expires=1641638498&Signature=PlqQoCrySUFiJ2xDfvkysaj1EcEi%2FG4lNme6YRiKpcO52bAGxwKEiIKe22stVm0aSd%2BnrfKiBRB%2FtLHXtvCDvu%2FpP8Vwg0JJBJ9tst1uAAA9PX6Um0yiIAGZXhufvr5HsCeiM%2FnQYwqZycWWq7r3Uii1mtV8qERs%2FBwnvJGZepYoVSAvStVNgTwZJF9Sfd85c8tOdRiVxme3%2BoWqJnYlCvkY7mWFsA4XlQjeMOM%2FWob6YOMuT6BM%2FH%2FnuZR3HFcYZAyh4iOuLe2DAtseNRQSy3rXRGC488X9cDx%2F7A4OSXoabaRSuwM9e7hlXKHQhtdvJCQcNrkS%2BSck%2FnjJ3AFx7A%3D%3D"], 
                        name: "White T shirt", pid: "product2", price: 100000, rating: 4, seller: "username2"},
                        
                        {available: 5, category: "clothing", description: "White T shirt", id: "product2", imageUrl: [
                        "https://storage.googleapis.com/projectshopiicnpm-d6027.appspot.com/products/product2/1.jpg?GoogleAccessId=firebase-adminsdk-bp2t1%40projectshopiicnpm-d6027.iam.gserviceaccount.com&Expires=1641638498&Signature=PlqQoCrySUFiJ2xDfvkysaj1EcEi%2FG4lNme6YRiKpcO52bAGxwKEiIKe22stVm0aSd%2BnrfKiBRB%2FtLHXtvCDvu%2FpP8Vwg0JJBJ9tst1uAAA9PX6Um0yiIAGZXhufvr5HsCeiM%2FnQYwqZycWWq7r3Uii1mtV8qERs%2FBwnvJGZepYoVSAvStVNgTwZJF9Sfd85c8tOdRiVxme3%2BoWqJnYlCvkY7mWFsA4XlQjeMOM%2FWob6YOMuT6BM%2FH%2FnuZR3HFcYZAyh4iOuLe2DAtseNRQSy3rXRGC488X9cDx%2F7A4OSXoabaRSuwM9e7hlXKHQhtdvJCQcNrkS%2BSck%2FnjJ3AFx7A%3D%3D", 
                        "https://storage.googleapis.com/projectshopiicnpm-d6027.appspot.com/products/product2/1.jpg?GoogleAccessId=firebase-adminsdk-bp2t1%40projectshopiicnpm-d6027.iam.gserviceaccount.com&Expires=1641638498&Signature=PlqQoCrySUFiJ2xDfvkysaj1EcEi%2FG4lNme6YRiKpcO52bAGxwKEiIKe22stVm0aSd%2BnrfKiBRB%2FtLHXtvCDvu%2FpP8Vwg0JJBJ9tst1uAAA9PX6Um0yiIAGZXhufvr5HsCeiM%2FnQYwqZycWWq7r3Uii1mtV8qERs%2FBwnvJGZepYoVSAvStVNgTwZJF9Sfd85c8tOdRiVxme3%2BoWqJnYlCvkY7mWFsA4XlQjeMOM%2FWob6YOMuT6BM%2FH%2FnuZR3HFcYZAyh4iOuLe2DAtseNRQSy3rXRGC488X9cDx%2F7A4OSXoabaRSuwM9e7hlXKHQhtdvJCQcNrkS%2BSck%2FnjJ3AFx7A%3D%3D"], 
                        name: "White T shirt", pid: "product2", price: 100000, rating: 4, seller: "username2"},
                        
                        {available: 5, category: "clothing", description: "White T shirt", id: "product3", imageUrl: [
                            "https://storage.googleapis.com/projectshopiicnpm-d6027.appspot.com/products/product2/1.jpg?GoogleAccessId=firebase-adminsdk-bp2t1%40projectshopiicnpm-d6027.iam.gserviceaccount.com&Expires=1641638498&Signature=PlqQoCrySUFiJ2xDfvkysaj1EcEi%2FG4lNme6YRiKpcO52bAGxwKEiIKe22stVm0aSd%2BnrfKiBRB%2FtLHXtvCDvu%2FpP8Vwg0JJBJ9tst1uAAA9PX6Um0yiIAGZXhufvr5HsCeiM%2FnQYwqZycWWq7r3Uii1mtV8qERs%2FBwnvJGZepYoVSAvStVNgTwZJF9Sfd85c8tOdRiVxme3%2BoWqJnYlCvkY7mWFsA4XlQjeMOM%2FWob6YOMuT6BM%2FH%2FnuZR3HFcYZAyh4iOuLe2DAtseNRQSy3rXRGC488X9cDx%2F7A4OSXoabaRSuwM9e7hlXKHQhtdvJCQcNrkS%2BSck%2FnjJ3AFx7A%3D%3D", 
                            "https://storage.googleapis.com/projectshopiicnpm-d6027.appspot.com/products/product2/1.jpg?GoogleAccessId=firebase-adminsdk-bp2t1%40projectshopiicnpm-d6027.iam.gserviceaccount.com&Expires=1641638498&Signature=PlqQoCrySUFiJ2xDfvkysaj1EcEi%2FG4lNme6YRiKpcO52bAGxwKEiIKe22stVm0aSd%2BnrfKiBRB%2FtLHXtvCDvu%2FpP8Vwg0JJBJ9tst1uAAA9PX6Um0yiIAGZXhufvr5HsCeiM%2FnQYwqZycWWq7r3Uii1mtV8qERs%2FBwnvJGZepYoVSAvStVNgTwZJF9Sfd85c8tOdRiVxme3%2BoWqJnYlCvkY7mWFsA4XlQjeMOM%2FWob6YOMuT6BM%2FH%2FnuZR3HFcYZAyh4iOuLe2DAtseNRQSy3rXRGC488X9cDx%2F7A4OSXoabaRSuwM9e7hlXKHQhtdvJCQcNrkS%2BSck%2FnjJ3AFx7A%3D%3D"], 
                            name: "White T shirt", pid: "product2", price: 100000, rating: 4, seller: "username2"},
                        
                        {available: 5, category: "clothing", description: "White T shirt", id: "product4", imageUrl: [
                        "https://storage.googleapis.com/projectshopiicnpm-d6027.appspot.com/products/product2/1.jpg?GoogleAccessId=firebase-adminsdk-bp2t1%40projectshopiicnpm-d6027.iam.gserviceaccount.com&Expires=1641638498&Signature=PlqQoCrySUFiJ2xDfvkysaj1EcEi%2FG4lNme6YRiKpcO52bAGxwKEiIKe22stVm0aSd%2BnrfKiBRB%2FtLHXtvCDvu%2FpP8Vwg0JJBJ9tst1uAAA9PX6Um0yiIAGZXhufvr5HsCeiM%2FnQYwqZycWWq7r3Uii1mtV8qERs%2FBwnvJGZepYoVSAvStVNgTwZJF9Sfd85c8tOdRiVxme3%2BoWqJnYlCvkY7mWFsA4XlQjeMOM%2FWob6YOMuT6BM%2FH%2FnuZR3HFcYZAyh4iOuLe2DAtseNRQSy3rXRGC488X9cDx%2F7A4OSXoabaRSuwM9e7hlXKHQhtdvJCQcNrkS%2BSck%2FnjJ3AFx7A%3D%3D", 
                        "https://storage.googleapis.com/projectshopiicnpm-d6027.appspot.com/products/product2/1.jpg?GoogleAccessId=firebase-adminsdk-bp2t1%40projectshopiicnpm-d6027.iam.gserviceaccount.com&Expires=1641638498&Signature=PlqQoCrySUFiJ2xDfvkysaj1EcEi%2FG4lNme6YRiKpcO52bAGxwKEiIKe22stVm0aSd%2BnrfKiBRB%2FtLHXtvCDvu%2FpP8Vwg0JJBJ9tst1uAAA9PX6Um0yiIAGZXhufvr5HsCeiM%2FnQYwqZycWWq7r3Uii1mtV8qERs%2FBwnvJGZepYoVSAvStVNgTwZJF9Sfd85c8tOdRiVxme3%2BoWqJnYlCvkY7mWFsA4XlQjeMOM%2FWob6YOMuT6BM%2FH%2FnuZR3HFcYZAyh4iOuLe2DAtseNRQSy3rXRGC488X9cDx%2F7A4OSXoabaRSuwM9e7hlXKHQhtdvJCQcNrkS%2BSck%2FnjJ3AFx7A%3D%3D"], 
                        name: "White T shirt", pid: "product2", price: 100000, rating: 4, seller: "username2"},
                      ];

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
                        initialValues={{search: '', searchby: 'searchquery', amount: '0'}}
                        onSubmit={(values) => {
                            if (values.search.length > 0){
                                console.log(values.search);
                                navigation.push("Search result", 
                                                values)
                            }
                        }}
                    >
                        {({handleChange, handleBlur,
                        handleSubmit, values}) =>
                        (
                            <>
                                {render_header({
                                    navigation})}

                                {cartList!=null &&
                                    <FlatList 
                                        style={{
                                            overflow: 'hidden',
                                        }}
                                        data={cartList}
                                        keyExtractor={item => item.id}
                                        renderItem={({item, index}) => (
                                            <View style={{paddingTop: 15}}>
                                                <View style={{
                                                    height: 170,
                                                    paddingLeft: 20,
                                                    backgroundColor: white,
                                                    flexDirection: 'row',
                                                    elevation: 5,
                                                }}>
                                                    <Image style={{
                                                            height: 150,
                                                            width: 150,
                                                        }}
                                                        source={{uri: item.imageUrl[0]}}
                                                    />
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
                                                        <AmountInput onChangeText={handleChange('amount')}
                                                                    onBlur={handleBlur('amounr')}
                                                                    value={values.amount}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                        )}
                                    />
                                }
                                <View style={{
                                    height: 100,
                                    width:'100%',
                                    flexDirection: 'row',
                                    borderTopWidth: 1,
                                    paddingLeft: 10,
                                }}>
                                    <View style={{paddingTop: 5,
                                            width: '50%',
                                        }}>
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
                                            {NumtoString(1000000)}đ
                                        </Text>
                                    </View>
                                    <View style={{
                                            alignItems: 'center',
                                            width: '70%', height: '100%',
                                            paddingTop: 15,
                                        }}>
                                        <StyledButton google={true} 
                                            style={{
                                                marginRight: 10,
                                                borderRadius: 15,
                                                padding: 0,
                                                backgroundColor: brand,
                                            }}
                                            onPress={() => {
                                                console.log("Ordered.")
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
                            </>
                            )}
                    </Formik>
                </StyledContainer>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const AmountInput = ({handleSubmit, ...props}) => {
    return (
        <View style={{
            marginTop: 4,
            width: 150,
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


                                /* <View style={{
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
                                                source={{uri: product.imageUrl[1]}}/>
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
                                            {product.price}đ
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
                                                marginTop: 5,
                                            }}
                                        >
                                                {product.description}
                                        </Text>
                                    </View>
                                </View> */