import {
    ADD_TO_CART,
    SUBTRACT_FROM_CART,
    REMOVE_FROM_CART,
    EMPTY_CART
} from '../actions/types'

import { addItemToCart, subtractItemFromCart, removeItemFromCart} from '../utils'
let initState =  []
  


if(typeof window !== "undefined"){
    const cart = localStorage.getItem('cart')
    if(cart){
        initState = JSON.parse(cart)
    }else{
        initState = []
    }
}

export const cartReducer = (state = initState, {type, payload}) => {
    switch (type) {
        case ADD_TO_CART:
            return addItemToCart(state, payload)
        case SUBTRACT_FROM_CART:
            return subtractItemFromCart(state, payload)
        case REMOVE_FROM_CART:
            return removeItemFromCart(state, payload)
        case EMPTY_CART:
            return initState = []
        default:
            return state      
    }
}