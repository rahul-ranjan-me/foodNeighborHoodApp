import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import { colors } from "../../utilities";
import MiniRating from "../miniRating";
import AddToCart from "../addToCart";

export default function DetailsComp(props) {
  const [resturant, setResturant] = useState({});
  const { width } = Dimensions.get("window");
  const { menu = [], details = {} } = resturant;
  useEffect(() => {
    setResturant(props.selectedFood);
  });

  const menuItem = (item, key) => {
    const { image, name, price } = item;
    return (
      <View key={`menuItem-${key}`} style={styles.itemContainer}>
        <View style={styles.itemImage}>
          <Image
            source={{
              uri: image,
              width: 60,
              height: 60,
            }}
          />
        </View>
        <View style={styles.detailProduct}>
          <Text style={styles.foodName}>{name}</Text>
          <Text style={styles.foodPrice}>Served at only ₹{price}</Text>
        </View>
        <View>
          <AddToCart item={item} details={details} />
        </View>
      </View>
    );
  };
  const { name, address, image, ratingUp, ratingDown, chefId } = details;

  const restaurantDetails = () => {
    return (
      <View style={styles.restaurantDetails}>
        <Image
          source={{
            uri: image,
            width: width,
            height: 200,
          }}
        />
        <View style={styles.detailsContainer}>
          <View sytle={styles.chefImage}>
            <Image
              source={{
                uri: image,
                width: 80,
                height: 80,
              }}
            />
          </View>
          <View style={styles.alignTextDetails}>
            <Text style={styles.restaurantDetailsName}>{name}</Text>
            <Text style={styles.restaurantDetailsAddress}>{address}</Text>
          </View>
          <View style={styles.miniRating}>
            <MiniRating
              rating={[ratingDown, ratingUp]}
              foodDetails={details}
              chefId={chefId}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View>
      {restaurantDetails()}
      {menu.map(menuItem)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  itemContainer: {
    flexDirection: "row",
    padding: 5,
    borderBottomWidth: 1,
    borderColor: colors.dividerColor,
    alignContent: "center",
    alignItems: "center",
  },
  detailProduct: {
    padding: 10,
    flex: 2,
  },
  foodName: {
    fontSize: 15,
    marginBottom: 10,
  },
  restaurantDetails: {
    backgroundColor: colors.white,
    shadowColor: colors.black,
  },
  detailsContainer: {
    flexDirection: "row",
    padding: 10,
    alignContent: "center",
    alignItems: "center",
  },
  restaurantDetailsAddress: {
    marginBottom: 10,
    marginLeft: 20,
  },
  restaurantDetailsName: {
    fontSize: 22,
    marginBottom: 10,
    marginLeft: 20,
  },
  foodPrice: {
    color: colors.headingTheme,
  },
  chefImage: {
    flex: 1,
  },
  alignTextDetails: {
    flex: 2,
  },
  miniRating: {
    flex: 1,
    alignItems: "flex-end",
    alignContent: "flex-end",
  },
});
