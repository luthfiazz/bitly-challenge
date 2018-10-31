const express = require('express')
const route = express.Router()
const { track,shortUrl} = require('../db/models')

route.get('/:short',async(req,res) => {
    const a =  req.params.short
    
    const ipaddr = req.header('x-forwarded-for') || req.connection.remoteAddress
    // console.log('zzzzzzzzs'+ipaddr)

    const myHost = req.headers.host
    try {
        const check = await shortUrl.findOne({
            where : {short : a   } 
         })
         
         // console.log(check.url)
        //  res.redirect(check.url);
        track.create({
             uuid : check.idUser,
             shortUrlId : check.id ,
             ipAddress :ipaddr,
             referrerUrl : myHost
         })
         res.redirect(check.url);
         
    } catch (error) {
        res.json(error)
    }
    
})

module.exports = route
