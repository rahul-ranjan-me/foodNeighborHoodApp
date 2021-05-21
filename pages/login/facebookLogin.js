import React from "react";
import { TouchableOpacity, Image } from "react-native";
import {
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from "react-native-fbsdk";

export default function Login(props) {
  const responseInfoCallback = (error, result) => {
    if (error) {
      console.log("Error fetching data: " + error.toString());
    } else {
      props.onSuccess(result);
    }
  };

  const infoRequest = new GraphRequest(
    "/me?fields=name,email,picture.type(large)",
    null,
    responseInfoCallback
  );

  const facebookLogin = () => {
    LoginManager.logInWithPermissions(["public_profile", "email"]).then(
      function (result) {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          new GraphRequestManager().addRequest(infoRequest).start();
        }
      },
      function (error) {
        console.log("Login fail with error: " + error);
      }
    );
  };

  return (
    <TouchableOpacity onPress={facebookLogin}>
      <Image
        source={{
          height: 46,
          width: 300,
          uri: "https://scontent.fdel3-2.fna.fbcdn.net/v/t39.2365-6/17639236_1785253958471956_282550797298827264_n.png?_nc_cat=105&ccb=1-3&_nc_sid=ad8a9d&_nc_ohc=Ot_QAVDPtagAX_H119F&_nc_ht=scontent.fdel3-2.fna&oh=9e7f04cf84fb833138e0deda01d7f5db&oe=60BD7516",
        }}
      />
    </TouchableOpacity>
  );
}
