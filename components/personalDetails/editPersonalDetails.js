import React, {useContext} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native'
import GlobalContext from '../globalState/globalContext'
import {colors, xhrPut, responseMiddleWare} from '../../utilities'

export default function EditPersonalDetails (props) {
  const { name, phoneNumber, email, address } = props.details
  const { login, setLogin } = useContext(GlobalContext)
  const globalStorage = global.storage
  const inputValues = {
    name,
    phoneNumber,
    email,
    address
  }

  const updatePersonalDetails = () => {
    const toUpdate = {}
    Object.keys(inputValues).map(key => {
      if(inputValues[key] && inputValues[key].length)
        toUpdate[key] = inputValues[key]
    })

    const handleResponse = (response) => {
      const dataToUpdate = Object.assign({}, login, response.data)
      storage.save({
        key: 'loginState',
        data: dataToUpdate
      })
      setLogin(dataToUpdate)
      props.drawerRef.current.close()
    }

    globalStorage.load({
      key: 'loginState'
    })
    .then(res => {
      xhrPut(`/users/${res.username}`, toUpdate, { headers: {
        'x-access-token': res.token
      }})
      .then(response => {
        responseMiddleWare(response, handleResponse, globalStorage)
      })
    })
    .catch(err => {
      alert('Unable to update your record. Please try later.')
    })
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
        <TextInput style={styles.input} onChangeText={text => inputValues.phoneNumber = text} defaultValue={phoneNumber ? String(phoneNumber) : ''} />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput style={styles.input} onChangeText={text => inputValues.email = text} defaultValue={email} />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Address</Text>
        <TextInput multiline numberOfLines={4} style={styles.input} onChangeText={text => inputValues.address = text} defaultValue={address} />
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