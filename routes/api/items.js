const express = require('express')
const router = express.Router()

// item model
const Item = require('../../models/Item')

// @route GET api/items
// @desc gets all items (items index)
// access public
router.get('/', (req, res) => {
    Item.find()
    .sort({ date: -1 })
        .then(items => res.json(items))
})

module.exports = router