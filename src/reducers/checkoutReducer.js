import {CHECKOUT} from '../actions/types'

let initState = false

if(typeof window !== "undefined"){

    const checkout = localStorage.getItem('checkout')
    if(checkout){
        initState = JSON.parse(checkout)
    }else{
        initState = false
    }
}

export const checkoutReducer= (state = initState, {type, payload}) => {
    switch (type) {
        case CHECKOUT:
            return payload  
        default:
            return state      
    }
}