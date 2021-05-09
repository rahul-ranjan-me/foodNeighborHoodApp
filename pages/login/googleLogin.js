import React from 'react'
import {StyleSheet, TouchableOpacity, Image} from 'react-native'
import * as Google from 'expo-google-app-auth';
import { properties } from '../../utilities'

import * as Application from 'expo-application';

export default function GoogleLogin(props) {
  
  const login = () => {
    Google.logInAsync({
      iosClientId: properties.iosGClientId,
      androidClientId: properties.androidGClientId,
    }).then((result) => {
      props.onSuccess(result)
    })
  }

  return (
    <TouchableOpacity onPress={login}>
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