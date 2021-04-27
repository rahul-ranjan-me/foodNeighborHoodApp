import React, { useContext, useState, useEffect } from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import _ from 'lodash'
import restaurantMenu from "../../fakeJson/restaurantMenu"
import { FooterNav, Checkout as CheckoutComp, GlobalContext } from '../../components'
import { colors } from '../../utilities'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'

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

  const emptyCartView = function() {
    return(
      <View style={styles.emptyCartView}>
        <MaterialCommunityIcons name="food-fork-drink" size={200} color={colors.primaryCallAction} />
        <Text style={styles.phraseText}>Delicious and healthy foods are waiting for your order</Text>
        <Text style={styles.cartEmpty}>Your cart is empty.</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.button}><Text style={styles.buttonText}>Browse restaurants</Text></TouchableOpacity>
      </View>
    )
  }

  return(
    <View style={styles.container}>
      <View style={styles.detailView}>
        
        { (cart && cart.items && checkoutItem.items) ? 
          <ScrollView><CheckoutComp allCartItems={cart.items} checkoutItem={checkoutItem} navigation={navigation} /></ScrollView> 
          : emptyCartView() 
        }
        
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
  },
  emptyCartView: {
    marginVertical: '50%',
    marginHorizontal: '25%'
  },
  phraseText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
    width: 250,
    marginLeft: '-10%'
  },
  cartEmpty: {
    color: colors.secondaryCallAction,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  button: {
    borderWidth: 1,
    borderColor: colors.primaryCallAction,
    padding: 10,
    marginTop: 40,
    backgroundColor: colors.white
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    color: colors.primaryCallAction,
  }
})