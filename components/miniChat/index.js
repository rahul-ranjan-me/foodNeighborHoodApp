import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../utilities";
import UIElems from "../uiElems";

export default function MiniChat() {
  const [message, setMessage] = useState("");
  const [systemFeedback, setSystemFeedback] = useState({});
  const { Button } = UIElems;

  const contactChef = () => {
    if (message.length < 1) {
      setSystemFeedback({
        message: "Please enter your message",
        type: "error",
      });
      return;
    }

    setSystemFeedback({
      message: "Thanks for reaching out, the chef will in contact soon.",
      type: "success",
    });

    window.setTimeout(() => {
      setSystemFeedback({});
      setMessage("");
    }, 4000);
  };

  return (
    <View style={styles.container}>
      {systemFeedback.message && (
        <Text style={styles[systemFeedback.type]}>
          {systemFeedback.message}
        </Text>
      )}
      <TextInput
        autoCapitalize="none"
        value={message}
        style={styles.textInput}
        onChangeText={(text) => setMessage(text)}
        placeholder="Type your message"
      />
      <Button
        action={contactChef}
        type="primary"
        label="Contact Chef"
        containerStyles={{ marginTop: 15, borderRadius: 10 }}
        textStyles={{ fontWeight: "bold" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: colors.white,
  },
  textInput: {
    borderRadius: 10,
    borderColor: colors.dividerColor,
    borderWidth: 1,
    padding: 15,
    backgroundColor: colors.secondaryCallActionHover,
  },
  error: {
    color: colors.formErrorColor,
    marginBottom: 5,
  },
  success: {
    color: colors.progressIndicatorBg,
    marginBottom: 5,
  },
});
