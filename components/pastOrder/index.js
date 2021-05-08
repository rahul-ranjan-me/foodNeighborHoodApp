import React, {useContext} from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { colors } from '../../utilities'
import GlobalContext from '../globalState/globalContext'
import restaurantMenu from '../../fakeJson/restaurantMenu'
import UIElems from '../uiElems'
import _ from 'lodash'

export default function PastOrder(props){
  const { userId, pastOrder } = props
  const { Button } = UIElems
  const { chefId, status, restaurantName, date, amount, orders } = pastOrder 
  const { setCart, cart } = useContext(GlobalContext)
  let orderItems = ''

  const getStyleStatus = (status) => {
    if(status === 'Delivered') {
      return styles.delivered()
    }
    return styles.cancelled()
  }

  const order = (item, key) => {
    orderItems += `${item.itemName} x ${item.quantity}`
    if(key === orders.length -1){
      return orderItems
    } else {
      orderItems += ', '
    }
  }

  const reorder = () => {
    const orderFromReorder = () => {
      const foodItemToOrder = {}
      for(var item in orders){
        const orderedItem = orders[item]
        const itemInCurMenu = _.find(restaurantMenu.menu, {id: orderedItem['itemId']})
        foodItemToOrder[orderedItem['itemId']] = {
          quantity: orderedItem['quantity'],
          price: itemInCurMenu['price']
        }
      }
      setCart(Object.assign({}, {
        chefId: String(chefId),
        items: foodItemToOrder
      }))
      window.setTimeout(() => {
        props.navigation.navigate('Checkout')
      }, 500)
    }

    Alert.alert(
      "Confirm",
      "This would discard any item currently added in the cart.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: orderFromReorder }
      ]
    )
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => props.navigation.navigate('Details', {chefId: String(chefId)})}>
        <View style={styles.nameContainer}>
          <Text style={styles.restaurantName}>{restaurantName}</Text>
          <Text style={ getStyleStatus(status) }>{status}</Text>
        </View>
        <Text style={styles.billedAmount}>Billed amount: ₹{amount}</Text>
        
        <Text style={styles.orderItems}>Items:</Text>
        <Text>{ orders.map(order) }</Text>
        <Text style={styles.date}>{date}</Text>
      </TouchableOpacity>
      <Button action={ reorder } type="primary" label="Reorder" containerStyles={{marginTop: 15, width: 150}} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.dividerColor
  },
  nameContainer: {
    flexDirection: 'row'
  },
  billedAmount: {
    marginTop: 5,
  },
  restaurantName: {
    fontWeight: 'bold'
  },
  orderStatus: {
    alignItems: 'flex-end',
    alignContent: 'flex-end',
    textAlign: 'right',
    flex: 1,
  },
  date: {
    fontSize: 11,
  },
  cancelled: () => Object.assign({color: colors.formErrorColor}, styles.orderStatus),
  delivered: () => Object.assign({color: colors.success}, styles.orderStatus),
  orderItems: {
    paddingTop: 15,
  },
  reorderButton: {
    backgroundColor: colors.primaryCallAction,
    padding: 10,
    width: 150,
    marginTop: 10,
  },
  reorderButtonText: {
    color: colors.white,
    textAlign: 'center'
  }
})