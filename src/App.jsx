// react router dom
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom"

// react
import { useEffect } from "react"

// cookie
import Cookies from "js-cookie";

// redux
import { setUser } from './store/feature/userSlice'
import { useDispatch } from "react-redux";


//pages 
import MainLayout from "./layout/MainLayout"
import Home from "./pages/Home"
import Login from './pages/Login'
import Register from './pages/Register'
import Shop from './pages/Shop'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import Wishlist from './pages/Wishlist'
import Cart from './pages/Cart'
import UserLayout from './layout/UserLayout'
import AddProduct from './pages/AddProduct'
import Orders from './pages/Orders'
import Dowloads from './pages/Dowloads'
import Addresses from './pages/Addresses'
import ProtectedRoute from './components/ProtectedRoute'
import Product from "./pages/Product";
import NotFound from './pages/NotFound';


function App() {

  // dispatch
  const dispatch = useDispatch()


  // get user token
  useEffect(() => {
    const savedUser = Cookies.get("token")
    if (savedUser) {
      dispatch(setUser(JSON.parse(savedUser)));
    }
  }, []);


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<MainLayout />}>
          {/* ochiq routerlar */}
          <Route index={true} element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="*" element={<NotFound />} />

          {/* yopiq routerlar */}
          <Route path="/shop/:categoryId?" element={<ProtectedRoute> <Shop /> </ProtectedRoute>} />
          <Route path="/blog" element={<ProtectedRoute> <Blog /> </ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute> <Contact /> </ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute> <Cart /> </ProtectedRoute>} />
          {/* user layout */}
          <Route path="/profile" element={<ProtectedRoute> <UserLayout /> </ProtectedRoute>}>
            <Route index={true} element={<ProtectedRoute> <Orders /> </ProtectedRoute>} />
            <Route path="dowloads" element={<ProtectedRoute> <Dowloads /> </ProtectedRoute>} />
            <Route path="addresses" element={<ProtectedRoute> <Addresses /> </ProtectedRoute>} />
            <Route path="addproduct" element={<ProtectedRoute> <AddProduct /> </ProtectedRoute>} />
          </Route>
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