const express = require('express')
const router = express.Router()
const {
    user,
    track,
    shorturl
} = require('../db/models')
const passport = require('../helper/auth')
const jwt = require('jsonwebtoken')



router.post('/', async (req, res) => {
    const {username,password} = req.body

    try {
        const data = await user.findOne({
            where: {
                username:username,
                password:password
            }
        })

        const token = jwt.sign({
            id:data.id,
            username: data.username,
            password: data.password,
            email:data.email,
            notelepon:data.notelepon
        }, 'secret', {

            issuer: 'luthfibitly.com',
            audience: 'luthfibitly',
        })
        res.json({token})
    } catch (error) {
        res.json(error)
    }
})


module.exports = router;