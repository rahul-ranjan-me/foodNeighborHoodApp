import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native';
import { DetailsComp, ChefInfo, MiniChat, FooterNav } from '../../components'
import topFood from "../../fakeJson/topFood";
import { colors } from '../../utilities';

export default function Details({route, navigation}) {
  const [ food, setFood ] = useState(null)
  const { params } = route
  useEffect(() => {
    const selectedFood = topFood.filter((item) => item.chefId === params.chefId)
    setFood(selectedFood[0])
  }, [params.itemId])

  return (
    <View style={styles.container}>
      { food && <View style={styles.detailView}>
        <ScrollView>
          <DetailsComp selectedFood={food} />
          <ChefInfo selectedFood={food} />
          <MiniChat selectedFood={food} />
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
