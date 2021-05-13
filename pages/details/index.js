import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native';
import { DetailsComp, ChefInfo, MiniChat, FooterNav } from '../../components'
import topFood from "../../fakeJson/topFood";
import { xhrGet, colors } from '../../utilities';

export default function Details({route, navigation}) {
  const [ food, setFood ] = useState({})
  const { params } = route
  const globalStorage = global.storage

  const getRestaurantDetails = () => {
    globalStorage.load({
      key: 'loginState'
    })
    .then(res => {
      xhrGet(`/restaurants/id/${params.chefId}`, { headers: {
        'x-access-token': res.token
      }})
      .then(response => {
        setFood(response.data)
      })
    })
    .catch(err => {
      alert('Unable to fetch the record. Please try later.')
    })
  }

  useEffect(() => {
    getRestaurantDetails()
  }, [params.itemId])
  
  return (
    <View style={styles.container}>
      { food && food.details && <View style={styles.detailView}>
        <ScrollView>
          <DetailsComp selectedFood={food} />
          <ChefInfo selectedFoodDetails={food.details} />
          <MiniChat />
        </ScrollView>
      </View> }
      <FooterNav navigation={navigation} />
    </View>
  );
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
});
