// components
import Header from '../components/Header'
import Footer from '../components/Footer'

// react router dom
import { Outlet } from 'react-router-dom'

// axios
import axios from 'axios'

// useEffect
import { useEffect } from 'react'


// react redux
import { useDispatch } from 'react-redux'
import { setUser, logOut } from '../store/feature/userSlice'



export default function MainLayout() {

    // dispatch
    const dispatch = useDispatch();

    // get user data
    useEffect(() => {
        const getUser = async () => {
            try {
                const { data } = await axios.get('http://localhost:8000/register/me', { withCredentials: true })
                dispatch(setUser({ user: data }))
            } catch (error) {
                dispatch(logOut())
            }
        };
        getUser()
    }, [dispatch]);



    return (
        <>
            <Header />
            <Outlet />
            <Footer /> 
        </>
    )
}