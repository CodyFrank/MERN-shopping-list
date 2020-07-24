const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')

// user model
const User = require('../../models/User')

// @route GET /api/auth
// @description authenticate user
// @access Public
router.post('/', (req, res) => {
    const {  email, password } = req.body
    // simple validation
    if(!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' })
    }
    // check for existing user
    User.findOne({ email }) 
        .then(user => {
            if(!user) return res.status(400).json({ msg: "User does not exist" })

            //  validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({ msg: "invalid credentials" })

                    jwt.sign(
                        { id: user.id },
                        process.env.jwtSecret,
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


// @route GET /api/auth/user
// @description get user data
// @access Private

router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user))
    .catch(err => res.status(400).json({ msg: err }))
})



module.exports = router