import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { colors } from '../../../utilities'

export default function Button(props) {
  const { action, type, label, containerStyles, textStyles} = props
  styles.containerStyles = containerStyles
  styles.textStyles = textStyles
  
  return (
    <TouchableOpacity onPress={action} style={styles[type]()}>
      <Text style={styles[type+'Text']()}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  containerStyles: {},
  textStyles: {},
  common:  () => Object.assign({
    padding: 15,
  }, styles.containerStyles),
  primary: () => Object.assign({
    backgroundColor: colors.primaryCallAction,
  }, styles.common()),
  secondary: () => Object.assign({
    backgroundColor: colors.secondaryCallAction,
    borderWidth: 1,
    borderColor: colors.primaryCallAction
  }, styles.common()),
  textCommon: () => Object.assign({
    textAlign: 'center',
  }, styles.textStyles),
  primaryText: () => Object.assign({
    backgroundColor: colors.primaryCallAction,
    color: colors.white
  }, styles.textCommon()),
  secondaryText: () => Object.assign({
    color: colors.textColorDark
  }, styles.textCommon()),
})