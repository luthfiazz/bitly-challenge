var express = require('express');
var router = express.Router();
const {track}=require('../db/models');

/* GET track listing. */
 router.get('/track', async(req,res)=>{
 const data = await track.findAll()
 res.json(data)
 });

 /* POST track listing. */
 router.post('/track', async(req,res)=>{
     const {uuid,shortUrlId,ipAddress,referrerUrl} = req.body

     try{
         const data = await track.create({
            uuid,
            shortUrlId,
            ipAddress,
            referrerUrl
         })
         res.json(data)
     }catch(error){
     res.json(error)
     }
 })


 /* DELETE track listing. */
 router.delete('/track/:id', async(req,res)=>{
 const {id} = req.params

 const data = await track.destroy({where:{id:id}})
 res.json(data);
 console.log('Delete Success')
 })

module.exports = router;
