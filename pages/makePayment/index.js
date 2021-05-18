import React, {useContext, useEffect, useState} from 'react'
import {View, Text, StyleSheet, ScrollView, Platform, TouchableOpacity} from 'react-native'
import {GlobalContext, FooterNav} from '../../components'
import { colors } from '../../utilities'
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import {UIElems} from '../../components'

export default function MakePayment({route, navigation}) {
  const {cart, setCart} = useContext(GlobalContext)
  const {items, chefId} = cart
  const { Button } = UIElems
  const [paymentMade, setPaymentMade] = useState(false)

  const getTotalPaymentAmount = () => {
    let totalAmount = 0
    for(var a in items) {
      totalAmount += items[a].price*items[a].quantity
    }
    return totalAmount
  }

  const makePayment = () => {
    setCart({})
    setPaymentMade(true)
    console.log('make payement')
  }


  return (
    <View style={styles.container}>
      {!paymentMade ?
        <View style={styles.makePayment}>
          <ScrollView>
            <TouchableOpacity style={styles.totalAmountWrapper} onPress={() => navigation.navigate('Checkout')}>
              <AntDesign name="leftcircle" size={24} color={colors.primaryCallAction} />
              <Text style={styles.totalAmount}>Bill total: ₹ {getTotalPaymentAmount()}</Text>
            </TouchableOpacity>
            <View style={{alignItems: 'center', alignContent: 'center'}}>
              <Button action={() => makePayment()} type="primary" label="Make payment" containerStyles={{marginTop: 15, width: 150}} />
            </View>
          </ScrollView>
        </View>
        :
        <View style={styles.makePayment}>
            <MaterialIcons name="done-outline" size={130} color={colors.primaryCallAction} />
            <Text style={styles.textThanks}>Thanks for the payment.</Text>
        </View> 
      }
      {paymentMade && <FooterNav navigation={navigation} />}
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
  makePayment: {
    flex: 15,
    alignContent: 'center',
    alignItems: 'center',
    width: 250,
    marginTop: '45%',
    marginLeft: '18%'
  },
  totalAmountWrapper: {
    padding: 20,
    flexDirection: 'row'
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  textThanks: {
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center'
  }
})