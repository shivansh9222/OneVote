import { createBrowserRouter, createRoutesFromElements, Route , RouterProvider } from 'react-router-dom'
import {Home,About,User, Extra, Login, SignUp} from './components'
import Layout from './Layout'
import Registeration from './components/Registeration/Registeration'
import { UserContextProvider, useUser } from './context/UserContext'
import { useEffect } from 'react'

// More useful method ,but i don't know how to add new independent layout to it.

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<Layout />} >
//       <Route path='' element={<Home/>} />
//       <Route path='about' element={<About/>}/>
//       <Route path='user/:userId' element={<User  />} />
//       <Route path='/extra' element={<Extra />} />
//       <Route path='/login' element={<Login />}/>
//       <Route path='/signUp' element={<SignUp />}/>
//     </Route>
//   )
// )



const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '',
          element: <Home />
        },
        {
          path: 'about',
          element: <About />
        },
        {
          path: 'extra',
          element: <Extra />
        },
        {
          path:'login',
          element: <Login/>
          
        },
        {
          path: 'signUp',
          element: <SignUp />
        },
        {
          path: 'user/:userId',
          element: <User />
        }
      ]
    },{
      path: '/registeration',
      element: <Registeration/>
    }
  ]
)

function App() {

    // const setIsAuthenticated = () => {

    // }
    // const {isAuthenticated} = useUser()

    // console.log(isAuthenticated)

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
