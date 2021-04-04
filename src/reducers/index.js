import { combineReducers} from 'redux'
import {userReducer} from './userReducer'
import { cartReducer} from './cartReducer'
import {drawerReducer} from './drawerReducer'
import { checkoutReducer } from './checkoutReducer'


export default combineReducers({
    user: userReducer,
    cart: cartReducer,
    drawer: drawerReducer,
    checkout: checkoutReducer
})