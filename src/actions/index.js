import {
    LOGGED_IN_USER,
    LOGOUT,

    ADD_TO_CART,
    SUBTRACT_FROM_CART,
    REMOVE_FROM_CART,
    EMPTY_CART,

    SET_VISIBLE,

    CHECKOUT,
    
} from './types'


// userReducer

export const loggedIn = (name, email, token, role, _id) => ({
    type: LOGGED_IN_USER,
    payload: {
        name,
        email,
        token,
        role,
        _id
      }
})

export const userLogout = () => ({
    type: LOGOUT,
    payload: null
})


//cartReducer

export const  addToCart  = product => ({
    type: ADD_TO_CART,
    payload: product
})

export const  subtractFromCart  = product => ({
    type: SUBTRACT_FROM_CART,
    payload: product
})

export const  removeFromCart  = product => ({
    type: REMOVE_FROM_CART,
    payload: product
})

export const emptyCart = () => ({
    type: EMPTY_CART
})


//drawerReducer
export const showSideDrawer = (data) => (
    {
        type: SET_VISIBLE ,
        payload: data   
    }
)

// checkoutReducer

export const checkoutChange = (data) =>({
    type: CHECKOUT,
    payload: data
}) 

