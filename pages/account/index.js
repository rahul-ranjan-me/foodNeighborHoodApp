import React, {useContext, useEffect, useState} from 'react'
import {View, Text, StyleSheet, ScrollView, Platform} from 'react-native'
import {FooterNav, PersonalDetails, PastOrder, GlobalContext} from '../../components'
import {colors} from '../../utilities'
import { useIsFocused } from "@react-navigation/native";
import {TouchableOpacity} from 'react-native-gesture-handler'
import {xhrGet, responseMiddleWare} from '../../utilities/xhr'

export default function Account({route, navigation}) {
  const {login, setLogin} = useContext(GlobalContext)
  if(!login) return null
  const [pastOrders, setPastOrders] = useState([])
  const isFocused = useIsFocused();
  const {username:userId, name, phoneNumber, email, address} = login

  const globalStorage = global.storage
  const handleResponse = (response) => {
    setPastOrders(response[0].pastOrders)
  }

  const getPastOrders = () => {
    globalStorage.load({
      key: 'loginState'
    })
    .then(res => {
      xhrGet(`/pastorders/${userId}`, { headers: {
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
    getPastOrders()
  }, [isFocused])

  const logout = () => {
    xhrGet('/users/logout').then((res) => {
      if(res.data.status === 'logout') {
        setLogin(null)
        storage.remove({
          key: 'loginState'
        })
      } else {
        alert('Some error occured')
      }
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.account}>
        <ScrollView>
          <PersonalDetails navigation={navigation} name={name} phoneNumber={phoneNumber} email={email} address={address} userId={userId} />
          <Text style={styles.heading}>Past Orders</Text>
          <View style={styles.pastOrderContainer}>
            { pastOrders.map((pastOrder, key) => <PastOrder navigation={navigation} key={key} pastOrder={pastOrder} userId={userId} />)}
          </View>
          <TouchableOpacity style={styles.helpContainer()} onPress={() => navigation.navigate('Help')}>
            <Text style={styles.helpHeading}>Help</Text>
            <Text style={styles.link}>FAQs &amp; Contact us &gt;</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.helpContainer()} onPress={logout}>
            <Text style={styles.link}>Logout</Text>
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
    paddingTop: Platform.OS === 'ios' ? 30 : 0
  },
  account: {
    flex: 15,
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