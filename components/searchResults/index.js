import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../utilities";
import { Entypo } from "@expo/vector-icons";

export default function SearchResults(props) {
  const { results, navigation } = props;

  const showResult = (result, key) => {
    const { image, name, tagged, chefId } = result;
    return (
      <TouchableOpacity
        style={styles.resultContainer}
        key={key}
        onPress={() =>
          props.navigation.navigate("Details", { chefId: String(chefId) })
        }
      >
        <View sytle={styles.chefImage}>
          <Image
            source={{
              uri: image,
              width: 50,
              height: 50,
            }}
          />
        </View>
        <View style={styles.alignTextDetails}>
          <Text style={styles.restaurantDetailsName}>{name}</Text>
          <Text style={styles.restuarantSpecialization}>{tagged}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const showEmpty = () => {
    return (
      <View style={styles.emptyResult}>
        <Entypo
          name="emoji-happy"
          size={130}
          color={colors.primaryCallAction}
        />
        <Text style={styles.refineSearch}>
          Please refine your search term so that we can serve best food to you.
        </Text>
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {results.length > 0 ? results.map(showResult) : showEmpty()}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  resultContainer: {
    flexDirection: "row",
    backgroundColor: colors.white,
    padding: 10,
    margin: 5,
  },
  alignTextDetails: {
    marginLeft: 10,
  },
  restaurantDetailsName: {
    fontSize: 16,
    marginBottom: 5,
  },
  emptyResult: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    width: 250,
    marginTop: "45%",
    marginLeft: "18%",
  },
  refineSearch: {
    fontSize: 18,
    marginTop: 20,
    textAlign: "center",
  },
});
