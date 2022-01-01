import 'react-native-gesture-handler';
import React, {useState, useMemo} from 'react';


import RootStack from './nagivator/root_stack';
/* import ProductScreen from './inside_screens/product_screen';
import HomeScreen from './inside_screens/homescreen';
import SearchResultScreen from './inside_screens/search_result_screen';
import UserProfile from './inside_screens/user_profile';
import UserAccount from './inside_screens/user_account';
import MeScreen from './inside_screens/Me'; */

import { AuthContext } from './components/context_component';


import AppLoading from 'expo-app-loading';

import  AsyncStorage  from '@react-native-async-storage/async-storage';

import { CredentialsContext } from './components/context_component';



export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [storedCredentials, setStoredCredentials] = useState(null);

  const checkIsLogin = () => {
    AsyncStorage.getItem('ShopiiCridentials')
    .then((result) => {
      if(result !== null){
        setStoredCredentials(JSON.parse(result));
      }
      else{
        setStoredCredentials(null);
      }
    })
    .catch(error => console.log(error))
  }

 /*  if (isLoading == true){
    return(
      <AppLoading 
        startAsync={checkIsLogin}
        onFinish={() => setIsLoading(false)}
        onError={console.warn}
      />
    )
  } */

  if(isLoading == true){
    checkIsLogin();
    setIsLoading(false);
  }

  return (
    <CredentialsContext.Provider 
      value={{storedCredentials, setStoredCredentials}}>
      <RootStack/>
    </CredentialsContext.Provider>
  );
}
