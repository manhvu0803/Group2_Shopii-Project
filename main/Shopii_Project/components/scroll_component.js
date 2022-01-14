import React from "react";
import {KeyboardAvoidingView, ScrollView,
        TouchableWithoutFeedback, Keyboard,
} from "react-native";

const Scroll_component=({children, scrollEnabled = true}) =>{
    return (
        <KeyboardAvoidingView style={{flex:1}}>
            <ScrollView keyboardShouldPersistTaps='handled'
                        scrollEnabled={scrollEnabled}>
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default Scroll_component;