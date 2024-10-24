import { createBrowserRouter, createRoutesFromElements, Navigate, Route , RouterProvider } from 'react-router-dom'
import {Home,About,User, Extra, Login, SignUp, Profile} from './components'
import Layout from './Layout'
import Registeration from './components/Registeration/Registeration'
import { useEffect , useState } from 'react'

import { ComponentToggleProvider } from './context/ComponentToggleContext'

import UserContextProvider from './context/UserContextProvider'

import L from './components/Pracitce/L'
import P from './components/Pracitce/P'

// More useful method ,but i don't know how to add new independent layout to it.

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />} >
        <Route path='' element={<Navigate to='/registeration' />} />
        <Route path='home' element={<Home/>} />
        <Route path='about' element={<About/>}/>
        <Route path='user/:userId' element={<User  />} />
        <Route path='extra' element={<Extra />} />
        <Route path='profile' element={<Profile />} />
        {/* <Route path='login' element={<Login />}/> */}
        {/* <Route path='signUp' element={<SignUp />}/> */}
      </Route>,
      <Route path='/registeration' element={<Registeration />} />,
      <Route path='/signUp' element={<SignUp />}/>,
      <Route path='/l' element={<L />} />,
      <Route path='/p' element={<P />} />
    </>
    
  )
)



// const router = createBrowserRouter(
//   [
//     {
//       path: '/',
//       element: <Layout />,
//       children: [
//         {
//           path: '/home',
//           element: <Home />
//         },
//         {
//           path: 'about',
//           element: <About />
//         },
//         {
//           path: 'extra',
//           element: <Extra />
//         },
//         {
//           path:'login',
//           element: <Login/>
          
//         },
//         {
//           path: 'signUp',
//           element: <SignUp />
//         },
//         {
//           path: 'user/:userId',
//           element: <User />
//         }
//       ]
//     },{
//       path: '/registeration',
//       element: <Registeration/>
//     }
//   ]
// )

function App() {

  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
      
    // </ComponentToggleProvider>
  )
}

export default App
