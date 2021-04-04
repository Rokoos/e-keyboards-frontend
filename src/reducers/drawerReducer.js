import { SET_VISIBLE } from '../actions/types'

export const drawerReducer = (state = false, {type, payload}) => {
    switch (type) {
        case SET_VISIBLE:
            return payload 
        default:
            return state      
    }
}