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
                </> : null
            }
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user
})

export default connect(mapStateToProps, null)(ContentContainer)