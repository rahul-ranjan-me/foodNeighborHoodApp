import React, { useContext, useState, useEffect } from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import _ from 'lodash'
import restaurantMenu from "../../fakeJson/restaurantMenu"
import { FooterNav, Checkout as CheckoutComp, GlobalContext } from '../../components'
import { colors } from '../../utilities'

export default function Checkout({route, navigation}) {
  const { cart } = useContext(GlobalContext)
  const [ checkoutItem, setCheckoutItem ] = useState({})
  useEffect(() => {
    const { items } = cart
    let itemInCart = {
      details: restaurantMenu.details,
      items: []
    }
    for(let item in items) {
      const selectedItem = _.find(restaurantMenu.menu, {'id': Number(item)})
      itemInCart.items.push(selectedItem)
    }
    setCheckoutItem(itemInCart)
  }, [cart.items && cart.items.length])

  return(
    <View style={styles.container}>
      <View style={styles.detailView}>
        <ScrollView>
          { checkoutItem.items && <CheckoutComp allCartItems={cart.items} checkoutItem={checkoutItem} navigation={navigation} /> }
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
  detailView: {
    flex: 15,
  }
})