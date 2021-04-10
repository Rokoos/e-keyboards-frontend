import React, {Fragment, useState, useEffect, useMemo} from 'react'
import { Link, Redirect} from 'react-router-dom'
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements  } from '@stripe/react-stripe-js'
import { useDispatch, useSelector} from 'react-redux'
import {createPaymentIntent} from '../functions/stripe'
import { DollarOutlined} from '@ant-design/icons'
import { createOrder, empytUserCart} from '../functions/user'
import { checkoutChange, emptyCart} from '../actions'
import { toast } from 'react-toastify'
import useResponsiveFontSize from "../utils/useResponsiveFontSize"
import "../stripe.css"


const useOptions = () => {
  const fontSize = useResponsiveFontSize();
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4"
          }
        },
        invalid: {
          color: "#9e2146"
        }
      }
    }),
    [fontSize]
  );

  return options;
};


const StripeCheckout = ({history}) => {

    let dispatch = useDispatch()
    let {cart, user, checkout} = useSelector(state => ({...state})) 

    const [error, setError] = useState(null)
    const [processing, setProcessing] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [clientSecret, setClientSecret] = useState('')
    const [cartTotal, setCartTotal] = useState(0)


    const stripe = useStripe()
    const elements = useElements()
    const options = useOptions();

    useEffect(() => {
        createPaymentIntent(user.token)
        .then(res => {
            setClientSecret(res.data.clientSecret)
            setCartTotal(res.data.cartTotal)
        })
    }, [user.token])

    const handleSubmit = async e => {
        e.preventDefault()
        setProcessing(true)

        const payload = await stripe.confirmCardPayment(clientSecret, {
          payment_method:{
            card: elements.getElement(CardNumberElement),
            billing_details: {
              name: e.target.name.value
            }
          }
        })

        if(payload.error){
          setError(`Payment failed ${payload.error.message}`)
        }else{
          console.log(JSON.stringify(payload, null, 4))
          createOrder(payload, user.token)
          .then(res => {
            if(res.data.ok){
              if(typeof window !== "undefined") localStorage.removeItem('cart')
              dispatch(emptyCart())
              dispatch(checkoutChange(false))
              localStorage.removeItem('checkout')
              empytUserCart(user.token)
              toast.success('Payment successfull!!')
            }
          })
          setError(null)
          setProcessing(false)
        }
    }

    const handleChange = async e => {
      setDisabled(e.empty)//disable pay button if errors
      setError(e.error ? e.error.message : '')
    }

    const showIcon = () => {
      if(cart.length){
        return (
          <Fragment>
          <DollarOutlined className="text-info"/>
           <br/>
           <em > Total to pay: €
          {cartTotal}
          </em>
          </Fragment>
        )
      }
    }
    
    if(!checkout){
      return <Redirect to="/user/history" />
    }


  return (
    <div style={{fontFamily:'"Source Code Pro", monospace'}}> 
        <div
        className="d-flex flex-column mt-5">
        
        <p style={{color: 'red'}}>To test payment use this data:</p>
        <p><strong>Card number: </strong>4242 4242 4242 4242</p>
        <p><strong>MM/RR: </strong>e.g. 11/22</p>
        <p><strong>CVC: </strong>e.g. 123</p>
        {showIcon()}
        </div>
        <hr/>

        <form onSubmit={handleSubmit} className="form_stripe">
        <div className="d-flex flex-column align-items-center mt-3"
        >
          <label className="d-flex flex-column align-items-start">
             Card number
            <CardNumberElement
            id="card_number"
              options={options}
              onChange={handleChange}
              />
          </label>
          <label className="d-flex flex-column align-items-start">
            Expiration date
            <CardExpiryElement
              options={options}
              />
          </label>
          <label className="d-flex flex-column align-items-start">
            CVC
            <CardCvcElement
              options={options}
              />
          </label>
          
          
            
              <button className="stripe-button" disabled={!checkout || disabled}>
          <span id="button-text">
              {processing ? <div className="spinner" id="spinner"></div> : "Pay" }
          </span>
          </button>
            
          

            {error && (
            <div className="card-error" role="alert">
              {error}
            </div>
            )}
      
            <br/>
            <p className= 'result-message mt-3'> <Link to="/user/history"> Purchase history</Link>
            </p>
          
          </div> 
        </form>
        </div> 
  )
}

export default StripeCheckout




 