import { GET_ITEMS, DELETE_ITEM, ADD_ITEM, ITEMS_LOADING, CLEAR_ITEMS, UPDATE_ITEM } from '../actions/types'
  
  
  
const initialState = {
    items: [],
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ITEMS:
            return {
            ...state, 
            items: action.payload,
            loading: false
        }
        case DELETE_ITEM:
            return {
                ...state, 
                items: state.items.filter(item => item._id !== action.payload)
            }
        case UPDATE_ITEM:
        case ADD_ITEM:
            return {
                ...state, 
                items: [...state.items, action.payload,]
            }
        case ITEMS_LOADING: 
            return {
                ...state,
                loading: true
            }
        case CLEAR_ITEMS:
            return{
                ...state,
                items: []
            }
        default:
             return state
    }
}