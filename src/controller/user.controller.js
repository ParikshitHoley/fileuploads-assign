const express = require("express");

const router = express.Router();

const {upload,uploadSingle,uploadMultiple} = require("../middleware/file-uploads")

const User = require("../model/user.model");

const Gallery = require("../model/gallery.model");

//Create Profile or user

router.post("/profile",uploadSingle("profile_pic"),async(req,res)=>{
    try{
        const user = await User.create({
            first_name : req.body.first_name,
            last_name: req.body.last_name,
            profile_pic: req.file.path
        });

        return res.send(user);
        
    }catch(err){
        res.status(500).send({message:err.message});
    }
})

//creating Gallery of user

router.post("/gallery",uploadMultiple("profile_pic"),async(req,res)=>{
    try
    {
        const images = req.files.map((el)=>{
            return el.path;
        })
        const gallery = await Gallery.create({
            pictures : images,
            user_id : req.body.user_id
        });

        res.send(gallery);
        
    }catch(err){
        res.status(500).send({message:err.message});
    }
});

//To get all users

router.get("", async (req, res) => {
    try {
      const users = await User.find().lean().exec();
  
      return res.send({ users });
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });

  // To get specific User

  router.get("/profile/:id", async (req, res) => {
    try {

      const users = await User.findById({_id:req.params.id}).lean().exec();
  
      return res.send({ users });

    } catch (err) {

      return res.status(500).send({ message: err.message });

    }
  });


  //Update user info

  router.patch("/profile/:id",uploadSingle("profile_pic"),async (req,res )=> {

    try{

        let user = await User.findByIdAndUpdate({_id:req.params.id},{$set : {profile_pic:req.file.path}}).lean().exec();

        res.send(user)

    }
    catch(err){

        return res.status(500).send({ message: err.message });

    }

    


  })




module.exports = router;

