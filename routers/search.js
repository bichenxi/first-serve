const express = require('express')
const content = require('../mysqldemo')
const  sql = 'select * from customer';

const router = express.Router()

router.get('/', (req, res) => {
    const { q } = req.query
    content.query(sql,(err, result) => {
        const data = result.find((i) => {
            return q == i.name
        })
        res.send(data)
    })
})

module.exports = router