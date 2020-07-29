import React, { Component } from 'react'
import {
    Container,
    ListGroup,
    ListGroupItem, 
    Button
} from 'reactstrap'
import { connect } from 'react-redux'
import { deleteItem, PurchasedItem } from '../actions/itemActions'




class DepartmentContainer extends Component{

    onDeleteClick = (id) => {
        this.props.deleteItem(id, this.props.user)
    }
    
    onPurchasedClick = (id) => {
        this.props.PurchasedItem(id, this.props.user)
    }

    render(){
        return (
            <Container className='pb-4'>
            <ListGroup >
            {this.props.name === "null" ? <ListGroupItem active action color="dark"> No Department </ListGroupItem> : <ListGroupItem active action color="dark"> {this.props.name} </ListGroupItem>}
             {this.props.department.map((item) => {
                return (
                <ListGroupItem tag="button" color="dark" onClick={this.onPurchasedClick.bind(this, item._id)} action key={item._id} className="text-left">
                {item.name}
                <Button 
                 className="remove-btn float-right "
                 color="danger"
                 size="sm"
                 onClick={this.onDeleteClick.bind(this, item._id)}
                >&times;</Button>
                </ListGroupItem>
                )
            })} 
            </ListGroup>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({ user: state.auth.user })


export default connect(mapStateToProps, { deleteItem, PurchasedItem })(DepartmentContainer)