import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Details, Checkout, ManageAddress, MakePayment, Account, Help, Search } from './pages'
import { GlobalState } from './components'

export default function App() {
  const Stack = createStackNavigator();
  
  return (
    <GlobalState>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="Checkout" component={Checkout} />
          <Stack.Screen name="ManageAddress" component={ManageAddress} />
          <Stack.Screen name="MakePayment" component={MakePayment} />
          <Stack.Screen name="Account" component={Account} />
          <Stack.Screen name="Help" component={Help} />
          <Stack.Screen name="Search" component={Search} />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalState>
  );
}