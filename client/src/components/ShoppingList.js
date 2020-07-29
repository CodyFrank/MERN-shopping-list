import React, { Component } from 'react'
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
            if (departments[item.department]){
                departments[item.department].push(item)
            }else{
                departments[item.department] = []
                departments[item.department].push(item)
            }
        }
        return departments
    }
    
    mapDepartments = (departments) => {
        return Object.keys(departments).map((k, i) => {
            return <DepartmentContainer key={k} name={k} department={departments[k]}/>
        })
    }

    render(){
        const departments = this.getDepartments(this.props.item.items)
        return (
            <>
                {this.mapDepartments(departments)}
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})



export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList)