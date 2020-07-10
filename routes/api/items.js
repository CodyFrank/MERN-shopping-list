const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')

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
router.post('/', auth, (req, res) => {
    const newItem = new Item({ name: req.body.name })
    newItem.save()
    .then(item => res.json(item))
})

// @route Delete api/items/:id
// @desc Delete 1 item
// @access public

router.delete('/:id', auth, (req, res) => {
    Item.findById(req.params.id)
    .then(item => item.remove())
        .then(() => res.json({ success: true }))
        .catch(err => res.status(404).json({ success: false }))
})


module.exports = router