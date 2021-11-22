import React from "react";
import {KeyboardAvoidingView, ScrollView,
        TouchableWithoutFeedback, Keyboard,
} from "react-native";

const Scroll_component=({children}) =>{
    return (
        <KeyboardAvoidingView style={{flex:1}}>
            <ScrollView keyboardShouldPersistTaps='handled'>
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default Scroll_component;