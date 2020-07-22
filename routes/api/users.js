const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')


// user model
const User = require('../../models/User')

// @route POST /api/users
// @description Register new User
// @access Public
router.post('/', (req, res) => {
    const { name, email, password } = req.body
    // simple validation
    if(!name || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' })
    }
    // check for existing user
    User.findOne({ email }) 
        .then(user => {
            if(user) return res.status(400).json({ msg: "User already exists" })

            const newUser = new User({
                name, 
                email, 
                password
            })

            // create salt and hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err
                    newUser.password = hash
                    newUser.save()
                        .then(user => {

                            jwt.sign(
                                { id: user.id },
                                config.get('jwtSecret'),
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if(err) throw err
                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email
                                        }
                                    })
                                }
                            )
                        })
                })
            })
        })
})

// @route GET api/users/:id/items
// @desc gets all items (items index)
// access private
router.get('/:id/items', auth, (req, res) => {
    if(req.user.id != req.params.id) {
        res.status(400).json({ msg: "Not Authorized"})
    }
    try{
        User.findOne({ _id: req.params.id }) 
        .then( user => user.items)
        .then( items => res.json(items))
    }catch(e) {
        res.status(400).json({ msg: "could not retrive items"})
    }
})

// @route POST api/users/:id/items
// @desc create a new item
// access private
router.post('/:id/items', auth, (req, res) => {
    if(req.user.id != req.params.id) {
        res.status(400).json({ msg: "Not Authorized"})
    }
    try{
        const newItem = { name: req.body.name }
        User.findOne({ _id: req.params.id })
        .then(user => {
        const i = user.items.push(newItem)
        user.save()
        res.json(user.items[i - 1])
        })
    }catch(e){res.status(400).json({ msg: "Failed to add item" })}
})

// @route Delete api/users/:id/items
// @desc delete an item
// access private
router.delete('/:user_id/items/:item_id', auth, (req, res) => {
    if(req.user.id != req.params.user_id) {
        res.status(400).json({ msg: "Not Authorized"})
    }
        User.findOne({ _id: req.params.user_id })
        .then(user => {
        user.items.id(req.params.item_id).remove()
        user.save()
        res.json({ success: true })
        })
    .catch(e => res.status(404).json({ success: false })
    )
})


module.exports = router