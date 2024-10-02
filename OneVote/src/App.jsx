import { createBrowserRouter, createRoutesFromElements, Route , RouterProvider } from 'react-router-dom'
import {Home,About,User} from './components'
import Layout from './Layout'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} >
      <Route path='' element={<Home/>} />
      <Route path='about' element={<About/>}/>
      <Route path='user/:userId' element={<User />} />
    </Route>
  )
)
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
