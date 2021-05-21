import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../../utilities";
import GoogleLogin from "./googleLogin";
import FacebookLogin from "./facebookLogin";
import { GlobalContext } from "../../components";
import { xhrPost } from "../../utilities/xhr";

export default function Login() {
  const { setLogin } = useContext(GlobalContext);
  const postLogin = (data) => {
    xhrPost("/users/login", data).then((res) => {
      const { user, token } = res.data;
      const {
        email,
        name,
        photo,
        username,
        authType,
        id,
        address,
        phoneNumber,
      } = user;
      storage.save({
        key: "loginState",
        data: {
          id,
          authType,
          username,
          token,
          email,
          phoneNumber,
          name,
          photo,
          address,
        },
      });
      setLogin({
        id,
        email,
        name,
        photo,
        token,
        username,
        address,
        phoneNumber,
        authType,
      });
    });
  };

  const onSuccess = (authType, result) => {
    if (authType === "gmail") {
      const { user } = result;
      const { email, name, photo } = user;
      postLogin({ userId: email, name, email, photo, authType });
    } else if (authType === "facebook") {
      const { email, name, picture } = result;
      postLogin({
        userId: email,
        name,
        email,
        photo: picture.data.url,
        authType,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 20 }}>
        <GoogleLogin onSuccess={(result) => onSuccess("gmail", result)} />
      </View>
      <FacebookLogin onSuccess={(result) => onSuccess("facebook", result)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.baseColor,
    paddingTop: 35,
    alignContent: "center",
    alignItems: "center",
    paddingTop: "30%",
  },
});
