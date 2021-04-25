import React from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import { FooterNav } from '../../components'
import { colors } from '../../utilities'

export default function ManageAddress({route, navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.manageAddress}>
        <ScrollView>
          <Text>Manage your address here</Text>
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
  manageAddress: {
    flex: 15,
    marginTop: 35,
    alignContent: 'center',
    alignItems: 'center',
  }
})