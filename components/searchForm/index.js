import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { colors } from '../../utilities'

export default function SearchForm(props) {

  const getSearchResult = (text) => {
    props.onSearch(text)
  }

  return(
    <View style={styles.container}>
      <TextInput autoCapitalize='none' style={styles.textInput} 
        onChangeText={(text) => getSearchResult(text)} 
        placeholder="Search for restaurant and foods" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: colors.white,
    padding: 15,
  },
  textInput: {
    borderRadius: 10,
    borderColor: colors.dividerColor,
    borderWidth: 1,
    padding: 15,
    backgroundColor: colors.secondaryCallActionHover,
    fontSize: 15,
  },
})