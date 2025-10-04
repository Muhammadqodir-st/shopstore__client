// react router dom
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom"


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
import AccountDetails from './pages/AccountDetails'
import Orders from './pages/Orders'
import Dowloads from './pages/Dowloads'
import Addresses from './pages/Addresses'
import UserWishlist from './pages/UserWishlist'
import AddCategory from './pages/AddCategory'


function App() {


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<MainLayout />}>
          <Route index={true} element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          {/* user layout */}
          <Route path="/profile" element={<UserLayout />}>
            <Route index={true} element={<AccountDetails />} />
            <Route path="orders" element={<Orders />} />
            <Route path="dowloads" element={<Dowloads />} />
            <Route path="addresses" element={<Addresses />} />
            <Route path="wishist" element={<UserWishlist />} />
            <Route path="addproduct" element={<AddProduct />} />
            <Route path="addcategory" element={<AddCategory />} />
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