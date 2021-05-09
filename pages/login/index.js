import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { colors } from '../../utilities'
import GoogleLogin from './googleLogin'

import * as Application from 'expo-application';

export default function Login({route, navigation}) {
  console.log(Application.applicationId)
  const onSuccess = (authType, result) => {
    if(authType === 'gmail') {
      const { accessToken, refreshToken, type, user } = result
      if(type === 'success') {
        const { email, name, photoUrl } = user
      }
    }
  }

  return (
    <View style={styles.container}>
      <GoogleLogin onSuccess={(result) => onSuccess('gmail', result)} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.baseColor,
    paddingTop: 35,
    alignContent: 'center',
    alignItems: 'center',
  }
})