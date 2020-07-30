import React, { Component } from 'react'
import {
    Container,
    ListGroup,
    ListGroupItem, 
    Button,
    ButtonGroup
} from 'reactstrap'
import { connect } from 'react-redux'
import { deleteItem, purchasedItem } from '../actions/itemActions'




class DepartmentContainer extends Component{

    onDeleteClick = (id) => {
        this.props.deleteItem(id, this.props.user)
    }
    
    onPurchasedClick = (item) => {
        const updatedItem = {...item, purchased: !item.purchased}
        this.props.purchasedItem(updatedItem, this.props.user)
    }

    render(){
        return (
            <Container className='pb-4'>
                <ListGroup >
                    <ListGroupItem color="dark" >
                        {this.props.name === "null" ?  "No Department" : `${this.props.name}`}
                    </ListGroupItem>
                    
                    {this.props.department.map((item) => {
                        return (
                            <ButtonGroup key={item._id} >

                                <ListGroupItem tag="button" onClick={this.onPurchasedClick.bind(this, item)} action className={`${item.purchased ? "purchased" : ''}`}>
                                    {item.name}
                                </ListGroupItem>

                                <Button 
                                    className="remove-btn float-right "
                                    color="danger"
                                    size="sm"
                                    onClick={this.onDeleteClick.bind(this, item._id)}
                                >&times;</Button>

                            </ButtonGroup>
                        )
                    })} 
                </ListGroup>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({ user: state.auth.user })


export default connect(mapStateToProps, { deleteItem, purchasedItem })(DepartmentContainer)