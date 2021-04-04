import React, { useEffect, lazy, Suspense } from'react'
import {Switch, Route } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {auth} from './firebase'
import { useDispatch } from 'react-redux'
import { currentUser } from './functions/auth'
import { loggedIn} from './actions'

const Login = lazy(() => import('./auth/Login'))
const Register = lazy(() => import('./auth/Register')) 
const Home = lazy(() => import('./pages/Home')) 
const Header = lazy(() => import('./components/nav/Header')) 
const RegisterComplete = lazy(() => import('./auth/RegisterComplete')) 
const ForgotPassword = lazy(() => import('./auth/ForgotPassword')) 
const History = lazy(() => import('./pages/user/History')) 

const UserRoute = lazy(() => import('./pages/user/UserRoute')) 
const Password = lazy(() => import('./pages/user/Password')) 
const Wishlist = lazy(() => import('./pages/user/Wishlist')) 

const AdminRoute = lazy(() => import('./pages/admin/AdminRoute')) 
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard')) 
const CategoryCreate = lazy(() => import('./pages/admin/category/CategoryCreate')) 
const UpdateCategory = lazy(() => import('./pages/admin/category/UpdateCategory')) 

const CategoryHome = lazy(() => import('./components/category/CategoryHome')) 


const ProductCreate = lazy(() => import('./pages/admin/product/ProductCreate')) 
const AllProducts = lazy(() => import('./pages/admin/product/AllProducts')) 
const ProductUpdate = lazy(() => import('./pages/admin/product/ProductUpdate')) 
const SingleProduct = lazy(() => import('./pages/SingleProduct')) 
const Shop = lazy(() => import('./pages/Shop')) 
const Cart = lazy(() => import('./pages/Cart')) 
const Checkout = lazy(() => import('./pages/Checkout')) 
const Payment = lazy(() => import('./pages/Payment')) 

const SideDrawer = lazy(() => import('./components/SideDrawer'))



const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if(user) {
        const idTokenResult = await user.getIdTokenResult()
        
        currentUser(idTokenResult.token)
        .then(res => {
        dispatch(loggedIn(res.data.name, res.data.email,  idTokenResult.token,res.data.role, res.data._id ))
      })
      .catch(err => console.log(err))
      }
    })

    return () => unsubscribe()
  }, [dispatch])

  return (
    <Suspense fallback={''}>
      <Header/>
      <SideDrawer/>
      <ToastContainer/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/register/complete" component={RegisterComplete}/>
        <Route exact path="/forgot/password" component={ForgotPassword}/>
        <UserRoute exact path="/user/history" component={History}/>
        <UserRoute exact path="/user/password" component={Password}/>
        <UserRoute exact path="/user/wishlist" component={Wishlist}/>
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard}/>
        <AdminRoute exact path="/admin/category" component={CategoryCreate}/>
        <AdminRoute exact path="/admin/category/:slug" component={UpdateCategory}/>
        <AdminRoute exact path="/admin/product" component={ProductCreate}/>
        <AdminRoute exact path="/admin/products" component={AllProducts}/>
        <AdminRoute exact path="/admin/product/:slug" component={ProductUpdate}/>

        <Route exact path="/product/:slug" component={SingleProduct}/>
        <Route exact path="/category/:slug" component={CategoryHome}/>
        <Route exact path="/shop" component={Shop}/>
        <Route exact path="/cart" component={Cart}/>
        <UserRoute exact path="/checkout" component={Checkout}/>
        <UserRoute exact path="/payment" component={Payment}/>
      </Switch>
    </Suspense>
  )
}


export default App;