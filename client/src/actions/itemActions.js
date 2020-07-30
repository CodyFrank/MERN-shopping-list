import { GET_ITEMS, DELETE_ITEM, ADD_ITEM, ITEMS_LOADING, UPDATE_ITEM } from '../actions/types'
import axios from 'axios'
import { tokenConfig } from './authActions'
import { returnErrors } from './errorActions'



export const getItems = (user) => (dispatch, getState) => {
    dispatch(setItemsLoading())
    axios.get(`/api/users/${user.id}/items`, tokenConfig(getState))
        .then( res => 
            dispatch({
                type: GET_ITEMS,
                payload: res.data
            })
        ).catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const addItem = (item, user) => (dispatch, getState) => {
    axios.post(`/api/users/${user.id}/items`, item, tokenConfig(getState))
        .then(res => 
            dispatch({
                type: ADD_ITEM,
                payload: res.data
            })).catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const deleteItem = (itemId, user)  => (dispatch, getState) => {
    axios.delete(`/api/users/${user.id}/items/${itemId}`, tokenConfig(getState))
    .then(res => dispatch({
        type: DELETE_ITEM,
        payload: itemId
    })).catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const purchasedItem = (item, user) => (dispatch, getState) => {
    axios.patch(`/api/users/${user.id}/items/${item._id}`, item, tokenConfig(getState))
    .then(res => dispatch({
        type: UPDATE_ITEM,
        payload: res.data
    })).catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}



export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
}