import React, {useEffect, useState} from 'react';
import {xhrGet, properties, colors} from '../../utilities'
import topFood from "../../fakeJson/topFood";

import { 
  ScrollView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  Image, 
  Dimensions 
} from 'react-native';

export default function TopFood(props) {
  const { width } = Dimensions.get("window");
  const [ topFoods, setTopFoods ] = useState([])

  useEffect(() => {
    setTopFoods(topFood)
  })

  const createTopFood = (food, key) => {
    const { name, price, image } = food
    return (
      <TouchableOpacity key={key} style={styles.card} onPress={() => props.navigation.navigate('Details', {itemId: food.id})}>
        <Image source={{
          uri: image,
          height: 200,
          width: width - 60
        }} />
        <Text style={styles.foodName}>{name}</Text>
        <Text style={styles.foodPrice}>Served at only ₹{price}</Text>
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
  }
});