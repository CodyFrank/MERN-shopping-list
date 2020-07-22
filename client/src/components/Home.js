import React, { Component } from 'react'
import ShoppingList from './ShoppingList'
import ItemModal from './itemModal'
import { connect } from 'react-redux'
class Home extends Component {
    render(){
        return (
            <>
            <h1 className="text-center">Shopping Cart</h1>
            { this.props.isAuthenticated ? 
                <><ItemModal />
                <ShoppingList /></> : null }
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect (mapStateToProps, null)(Home)


