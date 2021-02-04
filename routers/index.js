const express = require('express')
const router = express.Router()

router.get('/', (req,res) => {
    console.log('ok')
    res.send('欢迎来到这个全新的网站')
})

router.get('/home', (req, res) => {
    res.send({ user: 'AA辰', age: '21' })
})

module.exports =router