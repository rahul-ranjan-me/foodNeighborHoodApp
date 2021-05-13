import React, {useEffect, useState} from 'react';
import {xhrGet, colors, responseMiddleWare} from '../../utilities'
import { 
  ScrollView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  Image, 
  Dimensions 
} from 'react-native';
import MiniRating from '../miniRating'

export default function TopFood(props) {
  const { width } = Dimensions.get("window");
  const [ topFoods, setTopFoods ] = useState([])
  const globalStorage = global.storage
  const handleResponse = (response) => {
    setTopFoods(response)
  }
  const getTopFoods = () => {
    globalStorage.load({
      key: 'loginState'
    })
    .then(res => {
      xhrGet(`/restaurants/top10`, { headers: {
        'x-access-token': res.token
      }})
      .then(response => {
        responseMiddleWare(response.data, handleResponse, storage)
      })
    })
    .catch(err => {
      alert('Unable to fetch the record. Please try later.')
    })
  }

  useEffect(() => {
    getTopFoods()
  }, [topFoods.length])

  const createTopFood = (food, key) => {
    const { name, address, image, chefId, ratingDown, ratingUp } = food
    return (
      <TouchableOpacity key={key} style={styles.card} onPress={() => props.navigation.navigate('Details', {chefId: chefId})}>
        <Image source={{
          uri: image,
          height: 200,
          width: width - 60
        }} />
        <View style={styles.priceQuantity}> 
          <View style={styles.pricings}>
            <Text style={styles.foodName}>{name}</Text>
            <Text style={styles.foodPrice}>{address}</Text>
          </View>
          <View style={styles.ratings}>
            <MiniRating rating={[ratingDown, ratingUp]} foodDetails={food} chefId={chefId} />
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView>
          {topFoods.map(createTopFood)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'space-around',
    padding: 10,
    flex: 15
  },

  card: {
    color: '#333',
    margin: 5,
    borderRadius: 10,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: colors.white,
  },

  foodName: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10
  },

  foodPrice: {
    color: colors.headingTheme
  },

  priceQuantity: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center'
  },

  pricings: {
    flex: 3
  },

  ratings: {
    flex: 1
  },

  addToCart: {
    alignItems: 'flex-end',
    alignContent: 'flex-end'
  }
});