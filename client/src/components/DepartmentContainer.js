import React, { Component } from 'react'
import {
    Container,
    ListGroup,
    ListGroupItem, 
    Button
} from 'reactstrap'
import { connect } from 'react-redux'
import { deleteItem, purchasedItem } from '../actions/itemActions'




class DepartmentContainer extends Component{

    onDeleteClick = (id) => {
        this.props.deleteItem(id, this.props.user)
    }
    
    onPurchasedClick = (item) => {
        const updatedItem = {...item, purchased: true}
        this.props.purchasedItem(updatedItem, this.props.user)
    }

    render(){
        return (
            <Container className='pb-4'>
            <ListGroup >
            {this.props.name === "null" ? <ListGroupItem active action > No Department </ListGroupItem> : <ListGroupItem active action > {this.props.name} </ListGroupItem>}
             {this.props.department.map((item) => {
                return (
                <ListGroupItem tag="button" onClick={this.onPurchasedClick.bind(this, item)} action key={item._id} className="text-left">
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


export default connect(mapStateToProps, { deleteItem, purchasedItem })(DepartmentContainer)