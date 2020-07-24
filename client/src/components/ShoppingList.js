import React, { Component } from 'react'
import {
    Container, 
    ListGroup,
    ListGroupItem, 
    Button
} from 'reactstrap'
import {
    TransitionGroup,
    CSSTransition
} from 'react-transition-group'
import { connect } from 'react-redux'
import { getItems, deleteItem } from '../actions/itemActions'




class ShoppingList extends Component{

    componentDidMount(){
        this.props.getItems(this.props.user)
    }

    onDeleteClick = (id) => {
        this.props.deleteItem(id, this.props.user)
    }

    sortItems = (item) => {
        return item.items.sort((a, b) => {
            if (a.department > b.department){
                return 1
            }else if(a.department < b.department){
                return -1
            }else{
                return 0
            }
        })
    }

    render(){
        const items = this.sortItems(this.props.item)
        return (
        <Container>
            <ListGroup>
                <TransitionGroup className="shopping-list">
                    {items.map(({ _id, name, department }) => (
                        <CSSTransition key={_id} timeout={500} classNames={"fade"}>
                            <ListGroupItem>
                                <Button
                                 className="remove-btn"
                                 color="danger"
                                 size="sm"
                                 onClick={this.onDeleteClick.bind(this, _id)}
                                >&times;</Button>
                                {name}<p className='text-right'>{department}</p> 
                            </ListGroupItem>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </ListGroup>
        </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})



export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList)