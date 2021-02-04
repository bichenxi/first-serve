const express = require('express')
const mysql = require('../mysqldemo')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post('/', (req,res) => {
    const { account, password, date, name } = req.body
    const sql = `select * from user where account = ${account}`
    const add = 'INSERT INTO user(token,name,account,password,last_lgoin_date) VALUES(?,?,?,?,?)'

    mysql.query(sql,(err, result) => {
        if (!result?.length) {
            const params = Object.values(req.body)
            if (!params.length) {
                res.statusCode = 401
                res.send({
                    message: '传参不得为空！！！'
                })
                return
            }
            jwt.sign({
                "jti": 1,
                iss: name,
                user: account
            },"secretkey",{ expiresIn: '1day' },(err, token) => {
                params.unshift(token)
                mysql.query(add,params,(err) => {
                    if (err) {
                        res.statusCode = 400
                        res.send({success: false, message: '注册失败'})
                        return
                    }
                    res.send({
                        account,
                        success: true,
                        message: '恭喜您已注册成功快登录试试吧'
                    })
                })

            })
            return
        }
        // 如果已经注册了
        res.statusCode = 401
        res.send({
            success: false,
            message: '这个账号已经被注册了'
        })
   })
})

module.exports = router