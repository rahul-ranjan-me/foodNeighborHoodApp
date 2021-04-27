const account = {
  userId: 32,
  name: 'Rahul Ranjan',
  phoneNumber: 122332222,
  email: 'tan@ban.com',
  address: {
    postal: 'goa frontier, salim pur'
  },
  pastOrders: [
    {
      chefId: 22,
      status: 'Delivered',
      restaurantName: 'The China Door',
      date: 'April 7, 2021',
      amount: '231',
      orders:[ 
        {
          itemName: 'Crispy sugar',
          quantity: 1,
          itemId: 1,
        },
        {
          itemName: 'Soup',
          quantity: 2,
          itemId: 2
        }
      ]
    },
    {
      chefId: 22,
      status: 'Cancelled',
      restaurantName: 'The China Door',
      date: 'April 5, 2021',
      amount: '521',
      orders:[ 
        {
          itemName: 'Crispy sugar',
          quantity: 2,
          itemId: 3,
        },
        {
          itemName: 'Soup',
          quantity: 3,
          itemId: 4
        }
      ]
    }
  ]
}

export default account