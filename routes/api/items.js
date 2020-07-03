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

// @route POST api/items
// @desc create a new item
// access public

router.post('/', (req, res) => {
    const newItem = new Item({ name: req.body.name })
    newItem.save()
    .then(item => res.json(item))
})

module.exports = router