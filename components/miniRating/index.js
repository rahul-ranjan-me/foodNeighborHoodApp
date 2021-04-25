import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import miniRating from '../../fakeJson/miniRating'
import { FontAwesome } from '@expo/vector-icons'; 

export default function MiniRating() {
  const [rating, setRating] = useState([])
  useEffect(() => {
    setRating(miniRating)
  })

  const ratingChosen = (type) => {
    if(type === 'up') {
      rating[1] = rating[1] + 1
    } else {
      rating[0] = rating[0] - 1
    }
    setRating([...rating])
  }
  
  return (
   
    <View style={styles.container}>
      <TouchableOpacity onPress={() => ratingChosen('up')}>
        <View style={styles.thumbs}>
          <FontAwesome name="thumbs-o-up" size={32} color="black" />
          <Text style={styles.ratingText}>({rating[1]})</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => ratingChosen('down')}>
        <View style={styles.thumbs}>
          <FontAwesome name="thumbs-o-down" size={32} color="black" />
          <Text style={styles.ratingText}>({rating[0]})</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: 90,
    alignContent: 'center',
    alignItems: 'center',
  },
  thumbs: {
    width: 40,
    marginLeft: 10
  }, 
  ratingText: {
    fontSize: 15
  }
})