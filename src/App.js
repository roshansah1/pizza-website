import React from 'react'
import Home from './component/home/Home'
import { store } from "./Redux/store"
import { Provider } from 'react-redux'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import CartForm from './component/CartForm/CartForm'
import OrderSucess from './component/orderSucess/OrderSucess'
import MenuLight from './component/menuLight/MenuLight'

const App = () => {
  return (
    <div className='app'>
      <Provider store={store}>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/order' element={<CartForm />} />
        <Route path='/order-sucess' element={<OrderSucess />} />
        <Route path='/menu-light' element={<MenuLight />} />
      </Routes>
      </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App