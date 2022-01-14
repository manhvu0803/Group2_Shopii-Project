//import part:
//base components of react-native:
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from "react";
import {View, Text, Image, 
        KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, 
        TouchableOpacity,
} from "react-native";

//style components:
import{ StyledContainer, Innercontainer,
        StyledSearchInput, 
        StyledFormArea, 
        RightIcon,Colors, StatusBarHeight
} from "./../components/style_components";

//icon components:
import {Ionicons, AntDesign, 
} from "@expo/vector-icons";

//scroll component:
import Scroll_component from './../components/scroll_component';

//API client axios:
import axios from 'axios';

//formik:
import { Formik } from 'formik';

import { CredentialsContext } from './../components/context_component';

//Colors:
const {brand, darklight, white} = Colors;

const render_header = ({handleBlur, handleChange, 
                        handleSubmit, values, storedCredentials, 
                        navigation}) => {
    return(
        <View style={{
                backgroundColor: brand,
                paddingTop: StatusBarHeight + 8,
                paddingLeft: 10,
                paddingRight: 0,
        }}>
            <StyledFormArea style={{
                flexDirection: 'row',
                width: '90%'}}>
                <MySearchInput
                    placeholder="Searching here"
                    placeholderTextColor={darklight}
                    onChangeText={handleChange('search')}
                    onBlur={handleBlur('search')}
                    handleSubmit={handleSubmit}
                    value={values.search}
                />
                <TouchableOpacity style={{
                    top: 8,
                    left: 2,}}
                    onPress = {() => {
                        if (storedCredentials !== null){
                            navigation.navigate("My Shopping cart");
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

const HomeScreen = ({navigation, route}) => {
    const {storedCredentials, setStoredCredentials} = useContext(
                                                        CredentialsContext);
    const [categories2, setCategories2] = useState(null);

    const getCategories = () => {
        const  url = ("https://shopii-spirit.herokuapp.com/category");
        axios.get(url).then((response) => {
            const result = response.data;
            setCategories2(result);
        }).catch((error) => {
            console.log(error.JSON);
        });
    }

    if (categories2 == null){
        getCategories();
    }

    const categories = [{image: require("./../assets/houseware.png"),
                        category:"Houseware"},
                        {image: require("./../assets/clothes.png"),
                        category:"Clothing"},
                        {image: require("./../assets/footwear.png"),
                        category:"Shoes"},
                        {image: require("./../assets/electronice_device.png"),
                        category:"Electronics"},
                        {image: require("./../assets/electrical_equipment.png"),
                        category:"Electrical equipment"},
                        {image: require("./../assets/decorative.png"),
                        category:"Decorative"},
                        {image: require("./../assets/cosmetics.png"),
                        category:"Cosmetics"},
                        ];


    const renderCategories = () => categories.map(item => (
        <CategoryBox key={item.category} image={item.image}
        category={item.category}
        navigation={navigation}/>
    ))

    return (
        <KeyboardAvoidingView style={{flex:1}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}
                touchSoundDisabled={true}
            >
                <StyledContainer style={{
                }}>
                    <Innercontainer style={{
                        alignItems: 'stretch', 
                        paddingLeft: 0, 
                        paddingRight: 0,
                    }}>
                        <StatusBar style = "light"/>
                        <Formik 
                            initialValues={{search: '', searchby: 'searchquery'}}
                            onSubmit={(values) => {
                                if (values.search.length > 0){
                                    console.log(values.search);
                                    navigation.navigate("Search result", 
                                                        values);
                                }
                        }}>
                            {({handleChange, handleBlur,
                            handleSubmit, values}) =>
                            (
                                <>
                                    {render_header({handleBlur, handleChange, 
                                                handleSubmit, 
                                                values, storedCredentials, 
                                                navigation})}
                                    <Scroll_component>
                                        <View style={{
                                            backgroundColor: brand,
                                            height: 100, elevation: 5,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginLeft: 30, marginRight: 30,
                                            marginBottom: 30, marginTop: 20,
                                        }}>
                                            <Text style={{
                                                color: white,
                                                fontSize: 30,
                                                fontWeight: 'bold',
                                            }}>
                                                Welcome to
                                            </Text>
                                            <Text style={{
                                                color: white,
                                                fontSize: 30,
                                                fontWeight: 'bold',
                                            }}>
                                                Shopii
                                            </Text>
                                        </View>
                                        <View style={{
                                                paddingLeft: 30,
                                                paddingRight: 30,
                                                }}>
                                            {renderCategories()}
                                        </View>
                                    </Scroll_component>
                                </>
                            )}
                        </Formik>
                    </Innercontainer>
                </StyledContainer>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const MySearchInput = ({handleSubmit, ...props}) => {
    return (
        <View style={{
            width: '98%',
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

const CategoryBox = ({image, category, navigation}) => {
    const search = category.toLocaleLowerCase();
    const searchby = "category";
    return(
        <TouchableOpacity onPress={() => {
                navigation.navigate("Search result", {search, searchby});
            }}>
            <View style={{
                backgroundColor: white,
                height: 200,
                marginBottom: 25,
                paddingBottom: 20,
                elevation: 5,
            }}>
                <View style={{
                    height: '70%',
                    elevation: 3,
                    width: '100%',
                    backgroundColor: white,
                }}>
                    <Image 
                        style={{
                            height: '100%',
                            width: '100%',
                        }}
                        source={image}
                    />
                </View>
                <Text style={{
                    paddingTop: 10,
                    paddingLeft: 17,
                    fontSize: 30,
                    fontWeight: 'bold',
                }}>{category}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default HomeScreen;