//import part:
import styled from 'styled-components';
import {View, Image,
        Text, TextInput,
        TouchableOpacity, Dimensions} from 'react-native';
import Constants from 'expo-constants';


//const value prepare:
export const StatusBarHeight= Constants.statusBarHeight;


//implement and export components part:
//colors:
export const Colors = {
    white: '#ffffff',
    main_bg: '#E5E7EB',
    tertiary: '#1F2937',
    darklight: '#9CA3AF',
    brand: '#00BFFF',
    fb: '#0a82f1',
    gg: '#f72d2d',
    i_extra: '#43e6c2',
    placeholder: '#e9e8e8e0',
};

const {white, main_bg, tertiary, darklight, brand, fb, gg, i_extra} = Colors;
const height = Dimensions.get('window').height

export const StyledContainer = styled.View`
    flex: 1;
    height: ${height}px;
    background-color: ${white};
    padding-left: 25px;
    padding-right: 25px;
`;

export const Innercontainer = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
`;

export const TitlePart = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Logo = styled.Image`
    width: 80%;
    height: 150px;
`;

export const Title = styled.Text`
    font-size: 80px;
    text-align: center;
    font-weight: bold;
    color: ${brand};
`;

export const SubTitle = styled.Text`
    font-size: 20px;
    margin-top: 15px;
    margin-bottom: 15px;
    letter-spacing: 1px;
    font-weight: bold;
    color: ${tertiary};
`;

export const StyledFormArea = styled.View`
    width: 90%;
`;

export const StyledTextInput = styled.TextInput`
    background-color: ${main_bg};
    padding: 15px;
    padding-left: 55px;
    padding-right: 5px;
    font-size: 16px;
    height: 60px;
    margin-vertical: 3px;
    margin-bottom: 10px;
    color: ${tertiary};
`;

export const StyledTextOutput = styled.Text`
    background-color: ${main_bg};
    padding: 15px;
    padding-left: 55px;
    padding-right: 5px;
    font-size: 16px;
    height: 60px;
    margin-vertical: 3px;
    margin-bottom: 10px;
    color: ${tertiary};
`;

export const StyledInputLabel = styled.Text`
    color: ${tertiary};
    font-size: 15px;
    text-align: left;
    font-weight: bold;
`;

export const StyledOutputLabel = styled.Text`
    color: ${tertiary};
    font-size: 15px;
    text-align: left;
    font-weight: bold;
`;

export const LeftIcon = styled.View`
    padding-left: 14px;
    top: 38px;
    position: absolute;
    z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
    right: 15px;
    top: 38px;
    position: absolute;
    z-index: 1;
`;

export const StyledButton =styled.TouchableOpacity`
    padding: 15px;
    background-color: ${brand};
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-vertical: 5px;
    height: 60px;
    flexDirection: row;

    ${(props) => props.google == true && `
        background-color: ${gg};
        width: 40%;
        padding: 7px;
    `};
    ${(props) => props.fb == true && `
        background-color: ${fb};
        width: 40%;
        padding: 7px;
    `};
`;

export const ButtonText = styled.Text`
    color: ${white};
    font-size: 20px;
    font-weight: bold;
    padding-right: 5px;
    
    ${(props) => props.google == true && `
        font-size: 12px;
        padding-left: 10px;
    `};
    ${(props) => props.fb == true && `
        padding-left: 10px;
        font-size: 12px;
    `};
`;

export const Msgline = styled.Text`
    text-align: center;
    font-size: 14px;
    color: ${props => props.type == false ? "red" : "green"};
`;

export const Emptyline = styled.View`
    height: 1px;
    width: 100%;
    margin-vertical: 10px;
`;

export const ExtraView = styled.View`
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding-left: 7px;
    padding-right: 7px;
`;

export const ExtraText = styled.Text`
    justify-content: center;
    align-items: center;
    color: ${tertiary};
    font-size: 15px;
`;

export const ExtraLink = styled.TouchableOpacity`
    ${(props) => props.forgotpwd == false && `
        justify-content: center;
        align-items: center;
    `};
`;

export const ExtraTextLink = styled.Text`
    color: ${i_extra};
    font-size: 17px;
    font-weight: bold;
    ${(props) => props.forgotpwd == true && `
        font-weight: normal;
        font-size: 15px;
        text-decoration: underline;
    `};
`;

export const SocialButtonPart = styled.View`
    padding-top: 7px;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
`;

export const MyRadioButton = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    margin-left: 20px;
    margin-bottom: 10px;
`;