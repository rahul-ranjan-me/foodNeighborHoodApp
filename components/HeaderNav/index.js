import React, { useEffect, useState } from 'react'
import topNav from '../../fakeJson/topNav'
import { colors } from '../../utilities'

import { 
  ScrollView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from 'react-native';

export default function TopNav() {
  const [topNavs, SetTopNavs] = useState([])

  useEffect(() => {
    SetTopNavs(topNav)
  })

  const createTopNav = (nav, key) => {
    return (
      <TouchableOpacity key={key} style={styles.button} onPress={() => console.log(nav.name)}>
        <Text>{nav.name}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {topNavs.map(createTopNav)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'space-around',
    padding: 10
  },
  button: {
    color: colors.textColorDark,
    margin: 5,
    borderRadius: 10,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: colors.white,
  },
});