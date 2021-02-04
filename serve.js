const express = require('express')
const bodParser = require('body-parser')

// router
const index = require('./routers/index')
const add = require('./routers/add')
const search = require('./routers/search')
const auth = require('./routers/auth')
const register = require('./routers/register')

const App = express()
App.listen(4000,() => {
    console.log('服务已启动，端口号 192.168.1.136:4000')
})
App.use(bodParser.urlencoded({ extended: false }))
App.use(bodParser.json())

App.use('/static', express.static('public'))
App.use('/', index)
App.use('/add', add)
App.use('/search', search)
App.use('/login',auth)
App.use('/register', register)