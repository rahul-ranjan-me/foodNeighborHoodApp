import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native';
import {colors} from '../../utilities'

export default function ChefInfo(props) {
  const { chefName, chefImage, chefId } = props.selectedFood

  return (
    <View style={styles.container}>
      <Image source={{
        uri: chefImage,
        width: 50,
        height: 50
      }} />
      <View style={styles.chefDetails}>
        <Text style={styles.chefName}>{chefName}</Text>
        <Text style={styles.chefId}>{chefId} Listing(s)</Text>  
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: colors.dividerColor,
  },
  chefDetails: {
    marginLeft: 15,
  },
  chefName: {
    marginTop: 5,
    marginBottom: 5
  },
  chefId: {
    color: colors.headingTheme
  }
});
