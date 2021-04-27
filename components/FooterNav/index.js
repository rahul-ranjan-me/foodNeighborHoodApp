import React, {useContext} from 'react';
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View,
  Dimensions
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { colors } from '../../utilities'
import GlobalContext from '../globalState/globalContext'

export default function TopNav(props) {
  const { cart, setCart } = useContext(GlobalContext)
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.footerNavItem} onPress={() => props.navigation.navigate('Home')}>
        <Ionicons name="home" size={32} color={colors.primaryCallAction} />  
        <Text>Feed</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerNavItem} onPress={() => props.navigation.navigate('Search')}>
        <Feather name="search" size={32} color={colors.primaryCallAction} />
        <Text>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerNavItem} onPress={() => props.navigation.navigate('Checkout')}>
        <Feather name="shopping-cart" size={32} color={colors.primaryCallAction} /> 
        <Text style={styles.footerText}>Cart {cart && cart.items && `(${Object.keys(cart.items).length})`}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerNavItem} onPress={() => props.navigation.navigate('Account')}>
        <MaterialCommunityIcons name="account" size={32} color={colors.primaryCallAction} /> 
        <Text>Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.dividerColor,
    paddingBottom: 15,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 12,
    width: '100%'
  },
  footerNavItem: {
    flex: 1,
    alignItems: 'center',
  },
  footerText: {
    textAlign: 'center',
    marginLeft: 10
  },
});