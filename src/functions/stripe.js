import axios from 'axios'

export const createPaymentIntent = (authtoken) => axios.post(`${process.env.REACT_APP_API}/create-payment-intent`, 
    {},
    {
        headers: {
            authtoken,
            "Content-Type": "text/plain", "Access-Control-Allow-Origin": "*"
        }
    })
