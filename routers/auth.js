const express = require('express')
const mysql = require('../mysqldemo')
const router = express.Router()

router.post('/', (req,res) => {
    const account = req.body.account
    const password = req.body.account
    const sql = `select * from user where account = ${account}`
    mysql.query(sql,(err, result) => {
        if (!result?.length) {
            res.send({
                success: false,
                message: '该账号还没有注册'
            })
            return
        }
        if (password == result[0].account) {
            res.send({...result[0], success: true})
        } else {
            res.send({ success: false })
        }
    })
    
})

router.post('/user', (req,res) => {
    const token = req.body.token
    const sql = `select * from user where token = '${token}'`
    mysql.query(sql, (err, result) => {
        if (!result.length) {
            res.statusCode = 401
            res.send({
                success: false,
                message: '查无此用户名'
            })
            return
        }
        const { name, account, last_lgoin_date, token } = result[0]
        res.send({ name, account, last_lgoin_date, token })
    })
})

module.exports = router