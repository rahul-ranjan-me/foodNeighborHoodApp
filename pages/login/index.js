import React, { useContext } from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { colors } from '../../utilities'
import GoogleLogin from './googleLogin'
import FacebookLogin from './facebookLogin'
import { GlobalContext } from '../../components'

export default function Login({route, navigation}) {
  const { setLogin } = useContext(GlobalContext)

  const onSuccess = (authType, result) => {
    if(authType === 'gmail') {
      const { idToken, user } = result
      const { email, name, photo } = user
      console.log(email, name)
      setLogin({email, name, photo, idToken})
    } else if(authType === 'facebook') {
      const { id, email, name, picture } = result
      const { photo } = picture.data.url
      console.log(email, name)
      setLogin({email, name, photo, idToken: id})
    }
  }

  return (
    <View style={styles.container}>
      <GoogleLogin onSuccess={(result) => onSuccess('gmail', result)} />
      <FacebookLogin onSuccess={(result) => onSuccess('facebook', result)} />
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