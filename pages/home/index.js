import React, {useState, useEffect} from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { TopNav, TopFood, FooterNav } from '../../components'
import { colors, xhrGet, responseMiddleWare } from '../../utilities';

export default function Home({navigation}) {
  const [ topFoods, setTopFoods ] = useState([])

  const globalStorage = global.storage
  const handleResponse = (response) => {
    setTopFoods(response)
  }
  const getTopFoods = (q) => {
    globalStorage.load({
      key: 'loginState'
    })
    .then(res => {
      let urlForData
      if(q && q.length > 0) {
        urlForData = `/restaurants/search/tagged?q=${q}`
      } else {
        urlForData = `/restaurants/top10`
      }
      xhrGet(urlForData, { headers: {
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
  }, [topFoods.length < 1])


  return (
    <View style={styles.container}>
      <TopNav getTopFoods={(q) => getTopFoods(q)} />
      <TopFood topFoods={topFoods} navigation={navigation} />
      <FooterNav navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.baseColor,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 30 : 0
  },
});
