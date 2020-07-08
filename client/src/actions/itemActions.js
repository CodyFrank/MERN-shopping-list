import { GET_ITEMS, DELETE_ITEM, ADD_ITEM } from '../actions/types'

export const getItems = () => {
    return {
        type: GET_ITEMS
    }
}

export const deleteItem = id => {
    return {
        type: DELETE_ITEM, 
        payload: id
    }
}