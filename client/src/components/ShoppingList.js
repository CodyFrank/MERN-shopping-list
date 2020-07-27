import React, { Component } from 'react'
import {
    Container, 
    ListGroup,
} from 'reactstrap'
import {
    TransitionGroup,
    CSSTransition
} from 'react-transition-group'
import { connect } from 'react-redux'
import { getItems, deleteItem } from '../actions/itemActions'
import DepartmentContainer from './DepartmentContainer'




class ShoppingList extends Component{

    componentDidMount(){
        this.props.getItems(this.props.user)
    }

    getDepartments = (items) => {
        const departments = {}
        for (const item of items){
            if (departments[item.department] != item.department){
                departments[item.department] = []
                departments[item.department].push(item)
            }else{
                departments[item.department].push(item)
            }
        }
        return departments
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

    render(){
        const departments = this.getDepartments(this.props.item.items)
        return (
        <Container className='pb-5'>
            <ListGroup >
                <TransitionGroup className="shopping-list">
                    {console.log(departments)}
                    {/* {departments.map((department) => (
                        <CSSTransition key={department.key} timeout={500} classNames={"fade"}>
                            <DepartmentContainer department={department}/>
                        </CSSTransition>
                    ))} */}
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