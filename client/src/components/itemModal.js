import React, { Component } from 'react'
import {
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    Form, 
    FormGroup, 
    Label, 
    Input
} from 'reactstrap'
import { connect } from 'react-redux'
import { addItem } from '../actions/itemActions'

class ItemModal extends Component {
    state = {
        modal: false, 
        name: '',
        department: ''
    }

    toggle = () => {
        this.setState({ 
            modal: !this.state.modal
        })
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault()
        const newItem = {
            name: this.state.name,
            department: this.state.department
        }

        this.props.addItem(newItem, this.props.user)
        this.setState({
            ...this.state,
            name: '',
            department: '' 
        })
        this.toggle()
    }

    render() {
        return( 
        <div>

            { this.props.isAuthenticated ? <Button
                color="dark"
                style={{marginBottom: '2rem'}}
                 onClick={this.toggle}>Add Item
            </Button> : <h4 className="mb-3 ml-4">Please Log in to manage items</h4> }
  
            <Modal 
                isOpen={this.state.modal}
                toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Add To Shopping List</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="item">Item</Label>
                            <Input 
                                type="text"
                                name="name"
                                id="item"
                                placeholder="Item Name"
                                onChange={this.onChange}
                             />
                            <Label for="department">Department (Optional)</Label>
                            <Input 
                                type="text"
                                name="department"
                                id="department"
                                placeholder="Department Name (Optional)"
                                onChange={this.onChange}
                             />
                             <Button
                                color="dark"
                                style={{marginTop: '2rem'}}
                             >Add Item</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>

        </div>
        )
    }
}

const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps, { addItem })(ItemModal)