import React from 'react'
import { connect } from 'react-redux'
import ShoppingList from './ShoppingList'
import ItemModel from './ItemModal'


class ContentContainer extends React.Component {
    render(){
        return (
            <>
            { this.props.user ? 
                <>
                <ItemModel />
                <ShoppingList />
                </> : <>
                <h2 className='text-center'>Welcome to shopping list</h2>
                <p className='text-center'>Log in or Register to make shopping lists easier!</p>
                </>
            }
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user
})

export default connect(mapStateToProps, null)(ContentContainer)