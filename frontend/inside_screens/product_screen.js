//import part:
//base components of react-native:
import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import {View, Text, ActivityIndicator} from "react-native";

//style components:
import{ StyledContainer, Innercontainer,
        Logo,
        StyledFormArea, StyledInputLabel, StyledTextInput,
        LeftIcon, RightIcon, StyledButton, ButtonText,
        Msgline, Emptyline,
        ExtraView, ExtraText, ExtraLink, ExtraTextLink,
        SocialButtonPart, Colors, StatusBarHeight
} from "./../components/style_components";

//scroll component:
import Scroll_component from '../components/scroll_component';


//Product screen implementation:
const ProductScreen = () => {
    return(
        <Scroll_component>
            <StyledContainer style={{paddingTop: 10+StatusBarHeight}}>
                <Text>Hello</Text>
            </StyledContainer>
        </Scroll_component>
    )
}

export default ProductScreen;