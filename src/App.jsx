import React from 'react'
import { Routes , Route } from 'react-router-dom'
import Homepage from './components/Homepage'
import CoinPage from './Page/CoinPage'
import Layout from './Layout/Layout'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout/>}>
           <Route path='/' element={<Homepage/>}/>
          <Route path='/coin/:id' element={<CoinPage/>}/>
        </Route>
       
      </Routes>
    </div>
  )
}

export default App
