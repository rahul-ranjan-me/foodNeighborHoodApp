import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { colors } from '../../utilities'

export default function PersonalDetails(props) {
  const { userId, name, phoneNumber, email, address, navigation } = props
  return(
    <View>
      <View style={styles.container}>
        <View style={styles.nameEdit}>
          <Text style={styles.name}>{name.toUpperCase()}</Text>
          <TouchableOpacity style={styles.editDetail}>
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
          {address && address.postal &&
            <View>
              <Text>{address.postal}</Text>
            </View>
          }
          <TouchableOpacity onPress={() => props.navigation.navigate('ManageAddress')} style={styles.editDetail}>
            <Text style={styles.editDetailText}>Add/Change address</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 15,
    marginBottom: 15
  },
  nameEdit: {
    flexDirection: 'row',
  },
  name: {
    fontWeight: 'bold',
    flex: 1
  },
  editDetail: {
    flex: 1,
    alignItems: 'flex-end'
  },
  editDetailText: {
    color: colors.primaryCallAction,
    fontWeight: 'bold',
    fontSize: 15
  },
  postalAddress: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 5,
    paddingLeft: 15,
  }
})