const express = require('express');
const router = express.Router();
const {user}=require('../db/models');
const passport = require('../helper/auth')

/* GET users listing. */
 router.get('/',async(req, res) =>{
   const data = await user.findAll()
   res.json(data);
 });

 router.get('/',async(req,res)=>{
   const {id} = req.user

   try{
     const data = await user.findOne({
      where:{
        id
      }
     })
     res.json(data)
   }catch(error){
     res.json(error)
   }
 })


/* POST users listing. */
router.post('/',async (req,res)=>{
  const{username,
        password,
        email,
        notelepon
      } = req.body
  
  try{
    const data = await user.create({
      username,
      password,
      email,
      notelepon
    })
    res.json(data)
  }catch (error){
    res.json(error)
  }
})

/* PUT users listing. */
router.put('/:id',async(req,res)=>{
  const {id} = req.params
  const {username,password,email,notelepon} = req.body

  const data = await user.update({username,password,email,notelepon},{
    where:{id:id}
  })
  res.json(data)
  console.log('Update Success')
})

/* DELETE users listing. */
router.delete('/:id',async(req,res)=>{
  const {id} =req.params

  const data = await user.destroy({where: {id:id}})
  res.json(data)
  console.log('Delete Success')
})


    module.exports = router;
    
    