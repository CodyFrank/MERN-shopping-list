import React, { Component } from 'react'
import {
    Container,
    ListGroup,
    ListGroupItem, 
    Button
} from 'reactstrap'
import {
    CSSTransition,
    TransitionGroup
} from 'react-transition-group'
import { connect } from 'react-redux'
import { deleteItem } from '../actions/itemActions'




class DepartmentContainer extends Component{

    onDeleteClick = (id) => {
        this.props.deleteItem(id, this.props.user)
    }


    render(){
        return (
            <Container className='pb-5'>
            <ListGroup >
            {this.props.name === "null" ? <h4>No Department</h4> : <h4>{this.props.name}</h4>}
             {this.props.department.map((item) => {
                return (
                <TransitionGroup key={item._id} className="shopping-list">
                <CSSTransition key={item._id} timeout={500} classNames={"fade"}>
                <ListGroupItem >
                {item.name}
                <Button 
                 className="remove-btn float-right"
                 color="danger"
                 size="sm"
                 onClick={this.onDeleteClick.bind(this, item._id)}
                >&times;</Button>
                </ListGroupItem>
                </CSSTransition>
                </TransitionGroup>
                )
            })} 
            </ListGroup>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({ user: state.auth.user })


export default connect(mapStateToProps, { deleteItem })(DepartmentContainer)