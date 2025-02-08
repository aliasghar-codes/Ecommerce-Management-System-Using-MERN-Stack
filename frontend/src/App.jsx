import React, { useEffect, useState } from 'react'
import { Route, RouterProvider, createRoutesFromElements, createBrowserRouter } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { setIsAuthenticated, setUser } from './context/slices/auth.js'
import "./tailwind.css"
import './App.css'
import { ToastContainer } from 'react-toastify'
import {
    Layout,
    Home,
    Product,
    Products,
    ProductsCategory,
    Contact,
    About,
    Login,
    SignUp,
    Cart,
    Error,
    AdminLayout,
    AdminDashboard,
    AdminLogin,
    AdminError,
    ProductList,
    ProductAdd,
    ProductCategory,
    AdminMessages,
    ProductDelete,
    Coupons,
    RegisterAdmin,
    Bill,
    AdminOrders

} from "./index.js"

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path='/' element={<Layout />}>
                <Route path='' element={<Home />} />
                <Route path='product/:productId' element={<Product />} />
                <Route path='products'>
                    <Route path='' element={<Products />} />
                    <Route path='category/:category' element={<ProductsCategory />} />
                </Route>
                <Route path='contact' element={<Contact />} />
                <Route path='about' element={<About />} />
                <Route path='login' element={<Login />} />
                <Route path='signup' element={<SignUp />} />
                <Route path='cart' element={<Cart />} />
                <Route path='bill' element={<Bill />} />
                <Route path='*' element={<Error />} />
            </Route>
            <Route path='/admin-login' element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
                <Route path='' element={<AdminDashboard />} />
                <Route path='product'>
                    <Route path='add' element={<ProductAdd />} />
                    <Route path='delete' element={<ProductDelete />} />
                    <Route path='list' element={<ProductList />} />
                    <Route path='category' element={<ProductCategory />} />
                </Route>
                <Route path='coupons' element={<Coupons />} />
                <Route path='member' >
                    <Route path='admin' element={<RegisterAdmin />} />
                </Route>
                <Route path='orders' element={<AdminOrders />} />
                <Route path='messages' element={<AdminMessages />} />
                <Route path='*' element={<AdminError />}></Route>
            </Route>
        </Route>
    ))

const App = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {

        if (
            localStorage.getItem("expiry")
            &&
            new Date(localStorage.getItem("expiry")) < new Date(Date.now())
        ) {
            localStorage.clear();

        } else if (
            localStorage.getItem("accessToken")
            &&
            new Date(localStorage.getItem("expiry")) > new Date(Date.now())
        ) {

            dispatch(setIsAuthenticated(true));
            const user = JSON.parse(localStorage.getItem("user"));
            dispatch(setUser(user));

        } else if (
            localStorage.getItem("adminToken")
            &&
            new Date(localStorage.getItem("expiry")) > new Date(Date.now())
        ) {
            dispatch(setIsAuthenticated(true));
            dispatch(setUser(JSON.parse(localStorage.getItem("admin"))));
        }
        setLoading(false);
    });

    if (loading) {
        return (
            <div className='loading'>Loading...</div>
        )
    }

    return (
        <>
            <RouterProvider router={router} />
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
            />
        </>
    )
}

export default App