// react router dom
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom"


//pages 
import MainLayout from "./layout/MainLayout"
import Home from "./pages/Home"
import Login from './pages/Login'
import Register from './pages/Register'


function App() {


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<MainLayout />}>
          <Route index={true} element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
        </Route>
      </Route>
    )
  )

  return (

    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;