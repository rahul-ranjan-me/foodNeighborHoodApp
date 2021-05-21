import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { colors } from "../../utilities";
import RBSheet from "react-native-raw-bottom-sheet";
import EditPersonalDetails from "./editPersonalDetails";

export default function PersonalDetails(props) {
  const { name, phoneNumber, email, address, navigation } = props;
  const refRBSheet = useRef();
  const { height } = Dimensions.get("window");
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.nameEdit}>
          <Text style={styles.name}>{name.toUpperCase()}</Text>
          <TouchableOpacity
            style={styles.editDetail}
            onPress={() => refRBSheet.current.open()}
          >
            <Text style={styles.editDetailText}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text>Phone number: {phoneNumber}</Text>
          <Text>Email: {email}</Text>
        </View>
      </View>
      <Text style={styles.postalAddress}>Postal Address</Text>
      <View style={styles.container}>
        <View style={styles.nameEdit}>
          <View style={styles.address}>
            <Text>{address ? address : "Address not entered"}</Text>
          </View>
          <TouchableOpacity
            onPress={() => refRBSheet.current.open()}
            style={styles.editDetail}
          >
            <Text style={styles.editDetailText}>Add/Change address</Text>
          </TouchableOpacity>
        </View>
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={height - 30}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,.2)",
          },
          draggableIcon: {
            backgroundColor: colors.primaryCallAction,
          },
        }}
      >
        <EditPersonalDetails details={props} drawerRef={refRBSheet} />
      </RBSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 15,
    marginBottom: 15,
  },
  nameEdit: {
    flexDirection: "row",
  },
  name: {
    fontWeight: "bold",
    flex: 1,
  },
  editDetail: {
    flex: 1,
    alignItems: "flex-end",
  },
  address: {
    flex: 3,
  },
  editDetailText: {
    color: colors.primaryCallAction,
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
  postalAddress: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 5,
    paddingLeft: 15,
  },
});
