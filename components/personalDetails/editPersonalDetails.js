import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { colors } from '../../utilities'

export default function EditPersonalDetails (props) {
  const { name, phoneNumber, email, address } = props.details
  const inputValues = {
    name,
    phoneNumber,
    email,
    address
  }
  const updatePersonalDetails = () => {
    console.log(inputValues)
  }

  return(
    <View style={styles.personalDetailsWrapper}>
      <Text style={styles.personalDetailsHeading}>Update your personal details</Text>
      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Name</Text>
        <TextInput style={styles.input} onChangeText={text => inputValues.name = text} defaultValue={name} />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Phone number</Text>
        <TextInput style={styles.input} onChangeText={text => inputValues.phoneNumber = text} defaultValue={String(phoneNumber)} />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput style={styles.input} onChangeText={text => inputValues.email = text} defaultValue={email} />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Address</Text>
        <TextInput multiline numberOfLines={4} style={styles.input} onChangeText={text => inputValues.address['postal'] = text} defaultValue={address.postal} />
      </View>

      <TouchableOpacity style={styles.updateButton} onPress={updatePersonalDetails}>
        <Text style={styles.textButton}>Update</Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  inputWrapper: {
    padding: 10,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5
  },
  input: {
    borderRadius: 5,
    padding: 10,
    backgroundColor: colors.secondaryCallActionHover,
    borderColor: colors.dividerColor,
    borderWidth: 1
  },
  updateButton: {
    padding: 15,
    backgroundColor: colors.primaryCallAction,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 20
  },
  textButton: {
    textAlign: 'center',
    color: colors.white
  },
  personalDetailsHeading: {
    fontSize: 20,
    paddingLeft: 10,
    marginBottom: 20
  }
})