import React from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import { FooterNav } from '../../components'
import { colors } from '../../utilities'

export default function Search({route, navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <ScrollView>
          <Text>Search results will be shown here</Text>
        </ScrollView>
      </View>
      <FooterNav navigation={navigation} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: colors.baseColor,
  },
  search: {
    flex: 15,
    marginTop: 35,
    alignContent: 'center',
    alignItems: 'center',
  }
})