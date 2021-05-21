import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { properties } from "../../utilities";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export default function GoogleLogin(props) {
  GoogleSignin.configure({
    scopes: ["profile", "email"],
    webClientId: properties.webGClientId,
    offlineAccess: true,
    forceCodeForRefreshToken: true,
    iosClientId: properties.iosGClientId,
  });

  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      props.onSuccess(userInfo);
    } catch (error) {
      console.log(error);
    }
  };

  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      props.onSuccess(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TouchableOpacity>
      <Image
        source={{
          height: 46,
          width: 191,
          uri: "https://developers.google.com/identity/images/btn_google_signin_dark_normal_web.png",
        }}
      />
    </TouchableOpacity>
  );
}
