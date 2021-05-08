import React, {useState} from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import { FooterNav, SearchForm, SearchResults, TopNav } from '../../components'
import { colors } from '../../utilities'
import topFood from '../../fakeJson/topFood'

export default function Search({route, navigation}) {
  const [ searchResults, setSearchResults ] = useState([])
  const getSearchResult = (term) => {
    if(term.length > 2) {
      setSearchResults(topFood)
    } else {
      setSearchResults([])
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.search}>
      <SearchForm onSearch={getSearchResult} />
        <ScrollView>
          <SearchResults results={searchResults} navigation={navigation} />
        </ScrollView>
      </View>
      <TopNav />
      <FooterNav navigation={navigation} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: colors.baseColor,
  },
  search: {
    flex: 15,
    marginTop: 35,
  }
})