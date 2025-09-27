// components
import Header from '../components/Header'
import Footer from '../components/Footer'

// react router dom
import { Outlet } from 'react-router-dom'


export default function MainLayout() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}