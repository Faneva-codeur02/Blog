import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import Register from './Register'
import Login from './Login'
import PostPicture from './PostPicture'
import Picture from './Picture'
import Authentication from './Authentication'

function AppRouter() {


  return (
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/pictures/new' element={<PostPicture/>}/>
            <Route path='/pictures/:id' element={<Picture/>}/>
            <Route path='/login/:provider/:token/:userId' element={<Authentication />} />
        </Routes>
  )
}

export default AppRouter
