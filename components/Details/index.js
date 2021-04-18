import React from 'react'
import { Platform, StyleSheet, View, Text } from 'react-native';

export default function DetailsComp() {
  return (
    <View style={styles.container}>
      <Text>Details Comp</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ececec',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.os === 'ios' ? 0 : 30
  },
});
