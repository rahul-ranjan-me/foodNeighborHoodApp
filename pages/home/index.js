import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { TopNav, TopFood, FooterNav } from '../../components'
import { colors } from '../../utilities';

export default function Home({navigation}) {
  return (
    <View style={styles.container}>
      <TopNav />
      <TopFood navigation={navigation} />
      <FooterNav navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.baseColor,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.os === 'ios' ? 0 : 30
  },
});
