import React from 'react'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Myevent from './components/layouts/Myevent'
import Create from './components/layouts/Create'
import Home from './components/layouts/Home'
import Login from './components/layouts/Login'
import Signup from './components/layouts/Signup'
import PrivateRoutes from './components/Route/PrivateRoutes'
import Eventview from './components/layouts/Eventviews'


function Approuter() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/:event_id' element={<Eventview/>}/>
        {/* <Route path='/create' element={<Create/>}/> */}
        <Route element={<PrivateRoutes/>}>
              <Route exact path='/create' element={<Create/>} />
              <Route exact path='/myevent' element={<Myevent/>} />
        </Route>
      </Routes>   
    </Router>
  )
}

export default Approuter