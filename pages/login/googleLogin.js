import React from 'react'
import {StyleSheet, TouchableOpacity, Image} from 'react-native'
//import * as Google from 'expo-google-app-auth'  
import { properties } from '../../utilities'
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

export default function GoogleLogin(props) {
  GoogleSignin.configure({
    scopes: ['profile', 'email'], // what API you want to access on behalf of the user, default is email and profile
    webClientId: properties.webGClientId,
    offlineAccess: true,
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    iosClientId: properties.iosGClientId, // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  });
  
  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      props.onSuccess(userInfo)
    } catch (error) {
      console.log(error)
    }
  };

  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      props.onSuccess(null)  
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TouchableOpacity onPress={signIn}>
      <Image source={{
        height: 46,
        width: 191,
        uri: 'https://developers.google.com/identity/images/btn_google_signin_dark_normal_web.png',
      }} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  
})