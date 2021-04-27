import React, { useContext, useEffect } from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity, TextInput} from 'react-native'
import AddToCart from '../addToCart'
import { colors } from '../../utilities'
import GlobalContext from '../globalState/globalContext'

export default function Checkout(props) {
  const { usersDetails, setBillAmount, billAmount, setCart, cart } = useContext(GlobalContext)
  const { allCartItems, checkoutItem } = props
  const { details, items } = checkoutItem
  const { address, name, image, deliveryFee, chefId } = details
  let totalPrice = 0

  useEffect(() => {
    setBillAmount(totalPrice + deliveryFee)
  })

  const updateMessage = (text) => {
    const fakeCart = Object.assign({}, cart)
    fakeCart.message = text
    setCart(fakeCart)
  }

  const messageToRestaurant = () => {
    return(
      <View style={styles.messageContainer}>
        <TextInput placeholder="Message for the chef" style={styles.messageInput} onChangeText={updateMessage} />
        <Text>We will happily deliver your message to the chef.</Text>
      </View>
    )
  }

  const restaurantDetails = () => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('Details', {chefId: chefId})}>
        <View style={styles.detailsContainer}>
          <View style={styles.restaurantImage}>
            <Image source={{
              uri: image,
              width: 100,
              height: 100
            }} />
          </View>
          <View style={styles.restaurantDetails}>
            <Text style={styles.restaurantName}>{name}</Text>
            <Text style={styles.address}>{address}</Text>  
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  const calcTotalPrice = (item) => {
    const {id, price} = item
    const itemQuantity = props.allCartItems[id].quantity
    const itemPrice = itemQuantity * price
    totalPrice += itemPrice
    return <Text style={{textAlign: 'center', fontWeight: 'bold'}}>{`${itemQuantity} x ${price} = ₹ ${itemPrice}`}</Text>
  }

  const chosenItems = (item, key) => {
    const { id, image, name, price } = item
    
    return(
      <View key={key}>
        { allCartItems && allCartItems[id] && <View style={styles.selectedItem}>
          <View style={styles.restaurantImage}>
            <Image source={{
              uri: image,
              width: 50,
              height: 50
            }} />
          </View>
          <View style={styles.restaurantDetails}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.perPrice}>Price for 1 is ₹{price}</Text>
          </View>
          <View style={styles.cartItemPrice}>
            <AddToCart item={item} details={details} />
            <View style={{width: '100%'}}>{calcTotalPrice(item)}</View>
          </View>
        </View> }
      </View>
    )
  }

  const billDetails = () => {
    return (
      <View style={styles.billDetailsContainer}>
        <Text style={ {fontWeight: 'bold', fontSize: 14} }>Bill details</Text>
        <View style={styles.billItem}>
          <View style={styles.billParticular}>
            <Text>Item total</Text>
          </View>
          <View style={styles.billAmount}>
            <Text style={{fontWeight: 'bold'}}>₹ {totalPrice}</Text>
          </View>
        </View>
        <View style={styles.billItem}>
          <View style={styles.billParticular}>
            <Text>Delivery charges</Text>
          </View>
          <View style={styles.billAmount}>
            <Text style={{fontWeight: 'bold'}}>₹ {deliveryFee}</Text>
          </View>
        </View>
      </View>
    )
  }

  const addressDetails = () => {
    const { address } = usersDetails
    return (
      <View style={styles.addressContainer}>
        <View style={{flex: 2}}> 
          <Text>Delivering order to:</Text>
          <Text style={{fontWeight: 'bold'}}>{ address.postal }</Text>
        </View>
        <TouchableOpacity onPress={() => props.navigation.navigate('ManageAddress')}>
          <View style={styles.billAmount}>
            <Text style={styles.addManageAddress}>Add/change address</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  
  const payNow = () => {
    return(
      <View style={styles.billPayContainer}>
        <View style={styles.amountToPay}>
          <Text style={styles.amountToPayText}>₹ {billAmount}</Text>
        </View>
        <TouchableOpacity style={styles.proceedToPay} onPress={() => props.navigation.navigate('MakePayment')}>
          <View>
            <Text style={styles.proceedToPayText}>Proceed to pay</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  return(
    <View style={styles.container}>
      {restaurantDetails()}
      <View style={styles.itemContainer}>{items.map(chosenItems)}</View>
      {messageToRestaurant()}
      {billDetails()}
      {addressDetails()}
      {payNow()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white
  },
  restaurantDetails: {
    flex: 4
  },
  restaurantImage: {
    marginRight: 15
  },
  restaurantName: {
    fontSize: 20,
  },
  name: {
    fontSize: 15,
  },
  itemContainer: {
    backgroundColor: colors.white,
    marginTop: 15
  },
  billDetailsContainer: {
    backgroundColor: colors.white,
    marginTop: 15,
    padding: 10,
    flexDirection: 'column'
  }, 
  billItem: {
    flexDirection: 'row',
    padding: 10,
  },
  billAmount: {
    alignItems: 'flex-end',
    flex: 1,
  },
  selectedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.dividerColor,
    padding: 10,
  },
  cartItemPrice: {
    alignItems: 'flex-end',
    alignContent: 'center',
  },
  addressContainer: {
    backgroundColor: colors.white,
    marginTop: 15,
    padding: 10,
    flexDirection: 'row'
  }, 
  addManageAddress: {
    color: colors.primaryCallAction, 
    fontWeight: 'bold', 
    fontSize: 14, 
    marginTop: 10,
  },
  billPayContainer: {
    backgroundColor: colors.white,
    marginTop: 15,
    flexDirection: 'row'
  },
  proceedToPay: {
    flex: 1,
    padding: 15,
    color: colors.white,
    backgroundColor: colors.primaryCallAction
  },
  proceedToPayText: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  amountToPay: {
    flex: 1,
    padding: 10,
    alignContent: 'center',
    backgroundColor: colors.dividerColor
  },
  amountToPayText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 0
  },
  messageContainer: {
    backgroundColor: colors.white,
    padding: 10,
    marginTop: 15,
  },
  messageInput: {
    width: '100%', 
    backgroundColor: colors.dividerColor,
    borderColor: colors.secondaryCallAction,
    borderWidth: 1,
    padding: 10,
    marginBottom: 5,
    borderRadius: 10
  }
})