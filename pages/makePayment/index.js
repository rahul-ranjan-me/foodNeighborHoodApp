import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { GlobalContext, FooterNav } from "../../components";
import { colors, getDate, xhrPost, responseMiddleWare } from "../../utilities";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { UIElems } from "../../components";

export default function MakePayment({ route, navigation }) {
  const { cart, setCart, login } = useContext(GlobalContext);
  const { items, chefId, restaurantName } = cart;
  const { Button } = UIElems;
  const [paymentMade, setPaymentMade] = useState(false);
  const { username } = login;
  const constructOrderDetails = {
    chefId: chefId,
    restaurantName: restaurantName,
  };

  const getTotalPaymentAmount = () => {
    let totalAmount = 0;
    let orders = [];
    for (var a in items) {
      const curOrder = {
        itemId: a,
        itemName: items[a].name,
        quantity: items[a].quantity,
      };
      orders.push(curOrder);
      totalAmount += items[a].price * items[a].quantity;
    }
    constructOrderDetails.orders = orders;
    constructOrderDetails.amount = totalAmount;
    return totalAmount;
  };

  const globalStorage = global.storage;
  const handleResponse = () => {
    setCart({});
    setPaymentMade(true);
  };

  const submitDetails = () => {
    globalStorage
      .load({
        key: "loginState",
      })
      .then((res) => {
        xhrPost(`/pastorders/${username}`, constructOrderDetails, {
          headers: {
            "x-access-token": res.token,
          },
        }).then((response) => {
          responseMiddleWare(response.data, handleResponse, globalStorage);
        });
      })
      .catch((err) => {
        console.log(err);
        alert("Unable to fetch the record. Please try later.");
      });
  };

  const makePayment = () => {
    constructOrderDetails.status = "Delivered";
    constructOrderDetails.date = getDate();
    submitDetails();
  };

  return (
    <View style={styles.container}>
      {!paymentMade ? (
        <View style={styles.makePayment}>
          <ScrollView>
            <TouchableOpacity
              style={styles.totalAmountWrapper}
              onPress={() => navigation.navigate("Checkout")}
            >
              <AntDesign
                name="leftcircle"
                size={24}
                color={colors.primaryCallAction}
              />
              <Text style={styles.totalAmount}>
                Bill total: ₹ {getTotalPaymentAmount()}
              </Text>
            </TouchableOpacity>
            <View style={{ alignItems: "center", alignContent: "center" }}>
              <Button
                action={() => makePayment()}
                type="primary"
                label="Make payment"
                containerStyles={{ marginTop: 15, width: 150 }}
              />
            </View>
          </ScrollView>
        </View>
      ) : (
        <View style={styles.makePayment}>
          <MaterialIcons
            name="done-outline"
            size={130}
            color={colors.primaryCallAction}
          />
          <Text style={styles.textThanks}>Thanks for the payment.</Text>
        </View>
      )}
      {paymentMade && <FooterNav navigation={navigation} />}
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
  makePayment: {
    flex: 15,
    alignContent: "center",
    alignItems: "center",
    width: 250,
    marginTop: "45%",
    marginLeft: "18%",
  },
  totalAmountWrapper: {
    padding: 20,
    flexDirection: "row",
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  textThanks: {
    fontSize: 18,
    marginTop: 20,
    textAlign: "center",
  },
});
