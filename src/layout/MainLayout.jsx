// components
import Header from '../components/Header'
import Footer from '../components/Footer'
import StoreUser from '../components/StoreUser'

// react router dom
import { Outlet } from 'react-router-dom'

// loading or taosts 
import { Toaster } from 'react-hot-toast'

export default function MainLayout() {

    return (
        <div>
            <StoreUser />
            <Toaster />

            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}