import React from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import { FooterNav } from '../../components'
import { colors } from '../../utilities'

export default function Account({route, navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.account}>
        <ScrollView>
          <Text>Your aacount details would be added here</Text>
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
  account: {
    flex: 15,
    marginTop: 35,
    alignContent: 'center',
    alignItems: 'center',
  }
})