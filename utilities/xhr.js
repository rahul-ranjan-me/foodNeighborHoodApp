import properties from './properties'
import axios from 'axios'

const xhrGet = (url, config) => {
  return axios.get(`${properties.apiUrl}${url.replace(/^\/+/, '')}`, config)
}

const xhrPost = (url, data, config) => {
  return axios.post(`${properties.apiUrl}${url.replace(/^\/+/, '')}`, data, config)
}

const xhrPut = (url, data, config) => {
  console.log(`${properties.apiUrl}${url.replace(/^\/+/, '')}`)
  return axios.put(`${properties.apiUrl}${url.replace(/^\/+/, '')}`, data, config)
}

const responseMiddleWare = (response, handleResponse, storage) => {
  if(response.data && response.data.description && response.data.description.status === 401){
    xhrGet('/users/logout').then((res) => {
      if(res.data.status === 'logout') {
        storage.remove({
          key: 'loginState'
        })
        setLogin(null)
      } else {
        alert('Some error occured')
      }
    })
  } else {
    handleResponse(response)
  }
}

export { xhrGet, xhrPost, xhrPut, responseMiddleWare }