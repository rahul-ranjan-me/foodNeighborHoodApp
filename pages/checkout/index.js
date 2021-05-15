import React, {useContext, useState, useEffect} from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import _ from 'lodash'
import {FooterNav, Checkout as CheckoutComp, GlobalContext, UIElems} from '../../components'
import {colors, xhrGet, responseMiddleWare} from '../../utilities'
import {MaterialCommunityIcons} from '@expo/vector-icons'

export default function Checkout({route, navigation}) {
  const {cart, login} = useContext(GlobalContext)
  const {Button} = UIElems
  const [checkoutItem, setCheckoutItem] = useState({})
  const {username:userId, name, phoneNumber, email, address} = login

  const globalStorage = global.storage
  const handleResponse = (restaurantMenu) => {
    const {items} = cart
    let itemInCart = {
      details: restaurantMenu.details,
      items: []
    }
    for(let item in items) {
      const selectedItem = _.find(restaurantMenu.menu, {'id': item})
      itemInCart.items.push(selectedItem)
    }
    setCheckoutItem(itemInCart)
  }

  const getRestaurantDetails = (chefId) => {
    globalStorage.load({
      key: 'loginState'
    })
    .then(res => {
      xhrGet(`/restaurants/id/${chefId}`, { headers: {
        'x-access-token': res.token
      }})
      .then(response => {
        responseMiddleWare(response.data, handleResponse, globalStorage)
      })
    })
    .catch(err => {
      console.log(err)
      alert('Unable to fetch the record. Please try later.')
    })
  }

  useEffect(() => {
    const { chefId } = cart
    getRestaurantDetails(chefId)
  }, [cart.chefId])

  const emptyCartView = function() {
    return(
      <View style={styles.emptyCartView}>
        <MaterialCommunityIcons name="food-fork-drink" size={200} color={colors.primaryCallAction} />
        <Text style={styles.phraseText}>Delicious and healthy foods are waiting for your order</Text>
        <Text style={styles.cartEmpty}>Your cart is empty.</Text>
        <Button action={() => navigation.navigate('Home')} type="secondary" label="Browse restaurants" containerStyles={{marginTop: 15}} textStyles={{fontWeight: 'bold'}} />
      </View>
    )
  }

  return(
    <View style={styles.container}>
      <View style={styles.detailView}>
        
        { (cart && cart.items && checkoutItem.items) ? 
          <ScrollView>
            <CheckoutComp name={name} phoneNumber={phoneNumber} email={email} 
              address={address} userId={userId}
              allCartItems={cart.items} checkoutItem={checkoutItem} 
              navigation={navigation} />
          </ScrollView> 
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
})