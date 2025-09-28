// react router dom
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom"


//pages 
import MainLayout from "./layout/MainLayout"
import Home from "./pages/Home"
import Login from './pages/Login'
import Regiter from './pages/Register'


// redux
import { Provider } from "react-redux"
import store from './store/store'


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<MainLayout />}>
          <Route index={true} element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Regiter />} />
        </Route>
      </Route>
    )
  )

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  )
}

export default App;