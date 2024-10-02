import { createBrowserRouter, createRoutesFromElements, Route , RouterProvider } from 'react-router-dom'
import {Home,About,User, Extra} from './components'
import Layout from './Layout'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} >
      <Route path='' element={<Home/>} />
      <Route path='about' element={<About/>}/>
      <Route path='user/:userId' element={<User />} />
      <Route path='/extra' element={<Extra />} />
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
