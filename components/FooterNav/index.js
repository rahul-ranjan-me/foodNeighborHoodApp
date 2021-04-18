import React from 'react';
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { colors } from '../../utilities'

export default function TopNav(props) {
  return (
    <View style={styles.container}>
      <View style={styles.footerNavItemLeft}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
          <Ionicons name="home" size={32} color={colors.primaryCallAction} />  
          <Text>Feed</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footerNavItem}>
        <TouchableOpacity>
          <View style={styles.postRequestContainer}>
            <View style={styles.postRequest}>
              <Feather name="plus" size={32} color={colors.primaryCallAction} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.footerNavItemRight}>
        <TouchableOpacity>
          <View style={{alignItems:'center'}}>
            <MaterialCommunityIcons name="account" size={32} color={colors.primaryCallAction} /> 
            <Text>Account</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignContent: 'space-around',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.dividerColor,
    paddingBottom: 15,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 12,
    marginBottom: -10,
    width: '100%'
  },
  footerNavItem: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    marginTop: -30,
  },
  postRequestContainer: {
    backgroundColor: colors.white,
    width: 90,
    height: 90,
    paddingLeft: 10,
    paddingTop: 10,
    borderRadius: 50,
  },
  postRequest: {
    borderColor: colors.primaryCallAction,
    borderRadius: 45,
    borderWidth: 20,
    width: 70,
    height: 70,
  },
  footerNavItemLeft: {
    flex: 1,
    alignItems: 'flex-start',
    alignContent: 'center'
  },
  footerNavItemRight: {
    flex: 1,
    alignItems: 'flex-end',
  }
});