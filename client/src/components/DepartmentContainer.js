import React, { Component } from 'react'
import {
    ListGroupItem, 
    Button
} from 'reactstrap'
import { connect } from 'react-redux'
import { deleteItem } from '../actions/itemActions'




class DepartmentContainer extends Component{

    // onDeleteClick = (id) => {
    //     this.props.deleteItem(id, this.props.user)
    // }

    // sortItems = (item) => {
    //     return item.items.sort((a, b) => {
    //         if (a.department > b.department){
    //             return 1
    //         }else if(a.department < b.department){
    //             return -1
    //         }else{
    //             return 0
    //         }
    //     })
    // }

    render(){
        return (
            <>{console.log(this.props)}</>
            // <>
            // <ListGroupItem>
            //     <Button
            //      className="remove-btn"
            //      color="danger"
            //      size="sm"
            //      onClick={this.onDeleteClick.bind(this, _id)}
            //     >&times;</Button>
            //     {name}<p className='text-right'>{department}</p> 
            // </ListGroupItem>
            // </>
        )
    }
}



export default connect(null, { deleteItem })(DepartmentContainer)