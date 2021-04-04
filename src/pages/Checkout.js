import React, {useState, useEffect} from 'react'
import { saveCheckoutToLS} from '../utils'
import { getUserCart, empytUserCart, saveUserAddress} from '../functions/user'
import {useDispatch, useSelector} from 'react-redux'
import {emptyCart, checkoutChange } from "../actions"
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Redirect } from 'react-router-dom'

const Checkout = ({history}) => {
    

    const [products, setProducts] = useState([])
    const [total, setTotal] = useState(0)
    const [address, setAddress] = useState('')

    let dispatch = useDispatch()
    let {cart, user, checkout} = useSelector(state => ({...state})) 


    useEffect(() => {
        getUserCart(user.token)
        .then(res => {
            setProducts(res.data.products)
            setTotal(res.data.cartTotal)
        })
    }, [user.token])

    const handleEmptyCart = () => {
        if(typeof window !== "undefined"){
            localStorage.removeItem('cart')
            localStorage.removeItem('checkout')
        }
        dispatch(emptyCart())
        dispatch(checkoutChange(false))
        empytUserCart(user.token)
        .then(res => {
            setProducts([])
            setTotal(0)  
        })
        .catch(err =>console.log(err))
        history.push('/shop')
      }


      const saveAddressToDB = () => {
        dispatch(checkoutChange(true))
        saveCheckoutToLS(checkout)
        saveUserAddress(address, user.token)
        .then(res =>{
            if(res.data.ok){
                history.push('/payment')
            }
        })
      }


      const singlularOrPlural = cart.length === 1 ? 'product' : 'products'


      if(!cart.length){
          return <Redirect to="/shop" />
      }

      if(checkout){
          return <Redirect to="/payment"/>
      }

  return (
    

      <div className="container checkout_margin">
    <div className="row">
        <div className="col-md-6 mb-3 text-center">
            <h4>Delivery data</h4>
            <p>(Enter your name, lastname and address to place order)</p>
            <ReactQuill
            theme="snow"
            value={address}
            onChange={setAddress}
            />
        </div>
        <div className="col-md-6">
            <h4 className="text-center">Order summary</h4>
            <p>{`${cart.length} ${singlularOrPlural}` }</p>
            
            {
                products.map(p => (
                    <div
                    className="d-flex flex-row justify-content-between"
                    key={p._id}>
                        <h6 className="pl-2">{p.product.brand} {p.product.title} x {p.count}</h6>
                        <h6 className="pr-2">€ {p.count * p.price}</h6>
                    </div>
                ))
            }
            <hr/>
            <h6>Cart total: € <strong>{total}</strong></h6>

            <div className="row d-flex justify-content-around mt-5 ">    
                <button
                disabled={!products.length || !address}
                className="btn btn-raised  btn-success"
                onClick={saveAddressToDB}
                >Place Order</button>

                <button disabled={!products.length} onClick={handleEmptyCart} className="btn btn-raised btn-secondary">Empty Cart</button> 
            </div>
        </div>
    </div>
    </div>
  )
}

export default Checkout
