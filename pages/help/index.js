import React from 'react'
import {View, Text, StyleSheet, ScrollView, Platform} from 'react-native'
import { FooterNav } from '../../components'
import { colors } from '../../utilities'

export default function Help({route, navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.helpPage}>
        <ScrollView>
          <Text>All FAQs and helps will be shown here</Text>
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
    paddingTop: Platform.OS === 'ios' ? 30 : 0
  },
  helpPage: {
    flex: 15,
    alignContent: 'center',
    alignItems: 'center',
  }
})