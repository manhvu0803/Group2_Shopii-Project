import React from "react";
import { KeyboardAvoidingView,
        ScrollView,
        Keyboard
} from "react-native";

const Scroll_component=({children}) =>{
    return (
        <KeyboardAvoidingView style={{flex:1}}>
            <ScrollView>
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default Scroll_component;