const express = require('express')
const mysql = require('../mysqldemo')

const router = express.Router()

const add = 'INSERT INTO customer(name,age,sex) VALUES(?,?,?)'

router.get('/', (req,res) => {
    const params = Object.values(req.query)
    console.log(params)
    mysql.query(add,params, (err,  result) => {
        if (err) {
            res.sendStatus = 500
            res.send({ success: false })
            return
        }

        res.send({ success: true })
    })
})


module.exports = router