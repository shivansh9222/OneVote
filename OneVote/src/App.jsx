import { createBrowserRouter, createRoutesFromElements, Navigate, Route , RouterProvider } from 'react-router-dom'
import {Home,About,User, Extra, Login, SignUp, Profile, Hero, Result} from './components'
import Layout from './Layout'
import Registeration from './components/Registeration/Registeration'
import UserContextProvider from './context/UserContextProvider'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />} >
        <Route path='' element={<Navigate to='/hero' />} />
        <Route path='home' element={<Home/>} />
        <Route path='about' element={<About/>}/>
        
        <Route path='extra' element={<Extra />} />
        <Route path='profile' element={<Profile />} />
      </Route>,
      <Route path='/registeration' element={<Registeration />} />,
      <Route path='/signUp' element={<SignUp />}/>,
      <Route path='/hero' element={<Hero />} />,
      <Route path='/results' element={<Result />} />,
      <Route path='user/:userId' element={<User  />} />
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
  )
}

export default App
