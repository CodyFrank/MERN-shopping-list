const express = require('express')
const router = express.Router()

// user model
const User = require('../../models/User')

// @route GET /api/users
// @description Register new User
// @access Public
router.get('/', (req, res) => {
    res.send('register')
})

module.exports = router