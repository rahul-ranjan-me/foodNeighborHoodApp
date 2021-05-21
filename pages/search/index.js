import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Platform } from "react-native";
import { FooterNav, SearchForm, SearchResults, TopNav } from "../../components";
import { colors, xhrGet, responseMiddleWare } from "../../utilities";

export default function Search({ route, navigation }) {
  const [searchResults, setSearchResults] = useState([]);
  const globalStorage = global.storage;

  const handleResponse = (response) => {
    setSearchResults(response);
  };

  const getSearchResult = (term) => {
    if (term.length < 3) {
      setSearchResults([]);
      return;
    }

    globalStorage
      .load({
        key: "loginState",
      })
      .then((res) => {
        xhrGet(`/restaurants/search?q=${term}`, {
          headers: {
            "x-access-token": res.token,
          },
        }).then((response) => {
          responseMiddleWare(response.data, handleResponse, storage);
        });
      })
      .catch((err) => {
        alert("Unable to fetch the record. Please try later.");
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <SearchForm onSearch={getSearchResult} />
        <ScrollView>
          <SearchResults results={searchResults} navigation={navigation} />
        </ScrollView>
      </View>
      <FooterNav navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.baseColor,
    paddingTop: Platform.OS === "ios" ? 30 : 0,
  },
  search: {
    flex: 15,
  },
});
