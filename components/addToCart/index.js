import React, { useState, useContext, useEffect, useRef } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'; 
import { colors } from '../../utilities'
import GlobalContext from '../globalState/globalContext'
import UIElems from '../uiElems'

export default function AddToCart(props) {
  const { cart, setCart } = useContext(GlobalContext)
  const [ quantity, setQuantity ] = useState(0)
  const { Button } = UIElems

  const isFirstRender = useRef(true);

  useEffect(() => {
    if(cart.items && cart.items[props.item.id]){
      setQuantity(cart.items[props.item.id].quantity)
    }
  }, [cart])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return
    }
    let newCart = cart
    if(quantity > 0) {
      if(newCart.items && Object.keys(newCart.items).length && newCart.chefId === props.details.chefId){
        newCart.items[props.item.id] = {
          quantity: quantity,
          price: props.item.price,
          name: props.item.name
        }
      } else {
        newCart = {
          items: {
            [props.item.id]: {
              quantity: 1,
              price: props.item.price,
              name: props.item.name
            }
          },
          chefId: props.details.chefId,
          restaurantName: props.details.name
        }
      }
    } else if(newCart.items && newCart.items[props.item.id]) {
      delete newCart.items[props.item.id]
    }
    if(newCart.items && Object.keys(newCart.items).length < 1){
      newCart = {}
    }
    setCart(Object.assign({}, newCart))
  }, [quantity])

  const cartQuantity = (type) => {
    let curQuan = quantity
    if(type === 'minus') {
      curQuan--
    } else {
      curQuan++
    }
    setQuantity(curQuan)
  }

  const changeQuantity = () => {
    return(
      <View style={styles.container}>
        <TouchableOpacity onPress={() => cartQuantity('minus')}>
          <Feather name="minus-circle" size={32} color={colors.primaryCallAction} />
        </TouchableOpacity>
        <View style={styles.cartQuantity}>
          <TextInput value={String(quantity)} style={{width: 30, fontSize: 22, textAlign: 'center'}} />
        </View>
        <TouchableOpacity onPress={() => cartQuantity('add')}>
          <Feather name="plus-circle" size={32} color={colors.primaryCallAction} />
        </TouchableOpacity>
      </View>
    )
  }

  const showBuyNow = () => {
    return(
      <Button action={() => cartQuantity('add')} type="primary" label="Add to cart" />
    )
  }

  return (
    <View>
      { quantity < 1 ? showBuyNow() :  changeQuantity()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  cartButton: {
    width: 80,
    height: 80,
    backgroundColor: colors.primaryCallAction,
    color: colors.white
  },
  cartButtonText: {
    color: colors.white,
  },
  cartQuantity: {
    backgroundColor: colors.white,
    borderRadius: 5,
    borderColor: colors.dividerColor,
    marginLeft: 5,
    marginRight: 5,
    padding: 5,
  },
})