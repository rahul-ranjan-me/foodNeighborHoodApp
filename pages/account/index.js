import React from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import { FooterNav, PersonalDetails, PastOrder } from '../../components'
import { colors } from '../../utilities'
import accountDetails from '../../fakeJson/account'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function Account({route, navigation}) {
  const { userId, name, phoneNumber, email, address, pastOrders } = accountDetails
  return (
    <View style={styles.container}>
      <View style={styles.account}>
        <ScrollView>
          <PersonalDetails name={name} phoneNumber={phoneNumber} email={email} address={address} userId={userId} />
          <Text style={styles.heading}>Past Orders</Text>
          <View style={styles.pastOrderContainer}>
            { pastOrders.map((pastOrder, key) => <PastOrder navigation={navigation} key={key} pastOrder={pastOrder} userId={userId} />)}
          </View>
          <TouchableOpacity style={styles.helpContainer()}>
            <Text style={styles.helpHeading}>Help</Text>
            <Text style={styles.link}>FAQs & Contact us &gt;</Text>
          </TouchableOpacity>
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
  },
  heading: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 5
  },
  pastOrderContainer: {
    backgroundColor: colors.white,
    paddingLeft: 15,
    paddingRight: 15,
  },
  helpContainer: () => Object.assign({paddingTop: 15, paddingBottom: 15, marginTop: 15}, styles.pastOrderContainer),
  helpHeading: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom:5
  },
  link: {
    color: colors.primaryCallAction
  }
})