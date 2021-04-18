import React from 'react'
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import {colors} from '../../utilities'

export default function DetailsComp(props) {
  const { width } = Dimensions.get("window");
  const { image, name, price } = props.selectedFood

  return (
    <View style={styles.container}>
      <Image source={{
        uri: image,
        width: width,
        height: 300
      }} />
      <View style={styles.detailProduct}>
        <Text style={styles.foodName}>{name}</Text>
        <Text style={styles.foodPrice}>Served at only ₹{price}</Text>  
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  detailProduct: {
    padding: 15
  },
  foodName: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10
  },

  foodPrice: {
    color: colors.headingTheme,
    fontWeight: 'bold'
  }
});
