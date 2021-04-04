import React from 'react'
import { Link} from 'react-router-dom'
import {useDispatch, useSelector } from 'react-redux'
import ProductItemInCheckout from '../components/ProductItemInCheckout'
import {userCart} from '../functions/user'
import {emptyCart, checkoutChange} from '../actions'
import { getTotalPrice} from '../utils'

const Cart = ({history}) => {
    const dispatch = useDispatch()
    const {user, cart, checkout} = useSelector(state => ({...state}) )
   

    const handleEmptyCart = () => {
      dispatch(emptyCart())
      dispatch(checkoutChange(false))
      if(typeof window !== "undefined"){
        localStorage.removeItem('cart')
        localStorage.removeItem('checkout')
    }
    }

    const saveOrderToDB = () => {
      userCart(cart, user.token)
      .then(res => {
        if(res.data.ok) history.push('/checkout') 
      })
      .catch(err => console.log('cart save error', err))
      
    }

    const desktopCartItems = () => (
        cart.map( p => <ProductItemInCheckout key={p._id} product={p} />)
    )

    
  return (
    <div className="container"
    style={{paddingTop:"80px"}}
    >
      <div className="column">
      <h4 className="text-center">Cart Items</h4>
      <div className="col-md-12">
      {
        !cart.length ? <p>Your cart is empty <Link to="/shop">Go shopping</Link></p> :(
          desktopCartItems() 
        )
      }
      </div> 
        
        {
          cart.length > 0 && (
            <div className="ml-5" >
          
          <p>Products:</p>
          {cart.map((c, i) => (
              <div key={i}>
                <p>{c.title} x {c.count} = €{c.price * c.count}</p>
              </div>
          ))}
          Total: <b>€{getTotalPrice(cart)}</b>
         
        </div>
          )
        }

        <div className=" text-center mt-3" >
        {cart.length > 0 ?  user  ? (
          <button
          onClick={saveOrderToDB}
          disabled={!cart.length}
          className="btn btn-sm btn-success btn-raised  ">
             {checkout ? "Proceed to payment" : 'Proceed to checkout' } 
          </button>
        ) : (
          <button className="btn btn-sm btn-success btn-raised  ">
            <Link
            className="text-white"
            to={{
              pathname: '/login',
              state: {from: 'cart'}
            }}>Login to checkout</Link>
          </button>
        ): ''}
        </div>

        <div>
        {
          cart.length > 0 && (
            <div className="text-center mt-3">
          <div
          onClick={handleEmptyCart}
          className="btn btn-sm btn-raised btn-secondary">
                  Empty cart
          </div>
        </div>
          )
        }
        </div>
      </div>
      <div className="losFooteros"></div>
    </div>
  )
}

export default Cart
