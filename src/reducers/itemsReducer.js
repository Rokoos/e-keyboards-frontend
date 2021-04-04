import {
    SET_FILTERS
} from '../actions/types'

const initState = {
    items: [],
    category: [],
    rating:[],
    brands:[],
    shipping:'yes',
    price: 0,
    minPrice: 0,
    maxPrice: 0,
  };
  
  export default (state = initState, action) => {
    switch (action.type) {
        case SET_FILTERS:
            return {
              ...state,
              [action.name]: action.value
            };
      default:
        return state;
    }
  };