import React from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import { FooterNav } from '../../components'
import { colors } from '../../utilities'

export default function MakePayment({route, navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.makePayment}>
        <ScrollView>
          <Text>Make your payment from here</Text>
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
  makePayment: {
    flex: 15,
    marginTop: 35,
    alignContent: 'center',
    alignItems: 'center',
  }
})