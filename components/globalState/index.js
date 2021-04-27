
import React, { useState } from 'react'
import GlobalContext from './globalContext'
import account from '../../fakeJson/account'

const GlobalState = (props) => {
  const [ cart, setCart ] = useState({})
  const [ usersDetails, setUsersDetails ] = useState(account)
  const [ billAmount, setBillAmount ] = useState(0)
  
  return(
    <GlobalContext.Provider value={{ 
      cart: cart,
      setCart: setCart,
      usersDetails: usersDetails,
      setUsersDetails: setUsersDetails,
      billAmount: billAmount,
      setBillAmount: setBillAmount
    }}>
      {props.children}
    </GlobalContext.Provider>
  )
}

export default GlobalState