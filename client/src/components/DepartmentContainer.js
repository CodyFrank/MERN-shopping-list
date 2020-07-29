import React, { Component } from 'react'
import {
    ListGroupItem, 
    Button
} from 'reactstrap'
import { connect } from 'react-redux'
import { deleteItem } from '../actions/itemActions'




class DepartmentContainer extends Component{

    onDeleteClick = (id) => {
        this.props.deleteItem(id, this.props.user)
    }

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

    // {console.log(this.props.department)}

    render(){
        return (
            <>
            <h4>{this.props.name}</h4>
            {/* {this.props.department} */}
            {this.props.department.map((item) => {
             return <ListGroupItem key={item._id}>
                <Button
                 className="remove-btn"
                 color="danger"
                 size="sm"
                 onClick={this.onDeleteClick.bind(this, item._id)}
                >&times;</Button>
                {item.name} 
                </ListGroupItem>
            })} 
            </>
        )
    }
}



export default connect(null, { deleteItem })(DepartmentContainer)