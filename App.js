import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Details, Checkout, Login, MakePayment, Account, Help, Search } from './pages'
import { GlobalState, GlobalContext } from './components'

export function NavigationScreens() {
  const Stack = createStackNavigator();
  const { login, setLogin } = useContext(GlobalContext)
  const [ isLoggedIn, setIsLoggedIn ] = useState(null)
  
  useEffect(() => {
    if(login && Object.keys(login).length > 0){
      setIsLoggedIn(true)
    }
  }, [login])
  const getScreen = () => {
    if(!isLoggedIn){
      return(
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      )
    } else {
      return(
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="Checkout" component={Checkout} />
          <Stack.Screen name="MakePayment" component={MakePayment} />
          <Stack.Screen name="Account" component={Account} />
          <Stack.Screen name="Help" component={Help} />
          <Stack.Screen name="Search" component={Search} />
        </Stack.Navigator>
      )
    }
  }
  return (
    <NavigationContainer>
      {getScreen()}
    </NavigationContainer>
  )
}


export default function App() {
  return (
    <GlobalState>
      <NavigationScreens />
    </GlobalState>
  );
}