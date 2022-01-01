//import part:
//base components of react-native:
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from "react";
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

//scroll component:
import Scroll_component from './../components/scroll_component';

//API client axios:
import axios from 'axios';

//header component:
import {HomeHeader, SearchHeader} from '../components/header_components';


import { CredentialsContext } from './../components/context_component';

//formik:
import { Formik } from 'formik';

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

const SearchResultScreen = ({navigation, route}) => {
    const {search, searchby} = route.params;
    const {storedCredentials, setStoredCredentials} = useContext(
                                                        CredentialsContext);

    let Products=[{img:"", name:"A", price:0, rating: 3},
                  {img:"", name:"B", price:0, rating: 4},
                  {img:"", name:"C", price:0, rating: 5},
                  {img:"", name:"D", price:0, rating: 4}];

    const getProductLst = () => {
        let  url = ("https://shopii-spirit.herokuapp.com/product?");
        if (searchby == "category"){
            url = url + "category=" + search;
        }
        else{
            url = url + "category=decorative";
        }
        console.log(url);
        axios.get(url).then((response) => {
            const result = response.data;
            setProductLst(result.data);
        }).catch((error) => {
            console.log(error.JSON);
        });
    }

    const [ProductLst, setProductLst] = useState(null);

    if (ProductLst == null){
        getProductLst();
    }

    const NumtoString = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    return (
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
                                <View style={{paddingBottom: 15}}></View>
                                {ProductLst !== null &&
                                    <FlatList 
                                        data={ProductLst}
                                        keyExtractor={item => item.id}
                                        renderItem={({item, index}) => (
                                            <View style={{
                                                paddingLeft: 50,
                                                paddingRight: 50,
                                                }}
                                            >
                                                <TouchableOpacity onPress={() => {
                                                    console.log(item.name);
                                                    navigation.push("Product detail", {item});
                                                }}>
                                                    <View style={{
                                                        display: 'flex',
                                                        backgroundColor: white,
                                                        height: 250,
                                                        marginBottom: 25,
                                                        elevation: 5,
                                                    }}>
                                                        <View style={{
                                                            height: '60%', width: '100%',
                                                            alignItems: 'center',
                                                            overflow:'hidden',
                                                        }}>
                                                        <Image 
                                                            style={{
                                                                height: '200%',
                                                                width: '100%',
                                                            }}
                                                            source={{uri: item.imageUrl[0]}}
                                                        />
                                                        </View>
                                                        <View style={{
                                                            paddingTop: 10,
                                                            height: '40%',
                                                            backgroundColor: "#77f7cc"}}>
                                                            <Text style={{
                                                                paddingLeft: 17,
                                                                fontSize: 20,
                                                                fontWeight: 'bold',
                                                            }}>{item.name}</Text>

                                                            <Text style={{
                                                                paddingTop: 3,
                                                                paddingLeft: 17,
                                                                fontSize: 20,
                                                            }}>{NumtoString(item.price)}đ</Text>
                                                            
                                                            <View style={{ display: 'flex', flexDirection: 'row', 
                                                                            paddingTop: 3, paddingLeft: 17,
                                                                        }}>
                                                                {Array.from({ length: item.rating }).map(idx => (
                                                                    <AntDesign name="star" 
                                                                            size={15}
                                                                            color="yellow"/>
                                                                ))}
                                                            </View>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                    />
                                }
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

export default SearchResultScreen;