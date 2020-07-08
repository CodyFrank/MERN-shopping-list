import { GET_ITEMS, DELETE_ITEM, ADD_ITEM, ITEMS_LOADING } from '../actions/types'
import axios from 'axios'



export const getItems = () => dispatch => {
    dispatch(setItemsLoading())
    axios
        .get('/api/items')
        .then( res => 
            dispatch({
                type: GET_ITEMS,
                payload: res.data
            })
        )
}

export const addItem = item => dispatch => {
    axios.post('/api/items', item)
        .then(res => 
            dispatch({
                type: ADD_ITEM,
                payload: res.data
            })
        )
}

export const deleteItem = id => {
    return {
        type: DELETE_ITEM, 
        payload: id
    }
}



export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
}