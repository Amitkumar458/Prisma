const { Router } = require("express");
const { signup, loginuser, authUser , addFollower, finduser, getFollowers, getFollowing } = require("../controllers/userControllers");
const { getAlldata } = require("../controllers/postControllers");

const router = Router();

router.get('/me' , authUser , (req , res) => {
    res.json({success:true , data:req.user});
})

router.get('/all' , getAlldata , (req , res) => {
    return res.json({success:true , data:res.data});
})

router.post('/signup' , signup , (req , res) => {
    res.status(200).json(res.data);
})

router.post('/login', loginuser , (req , res) => {
    res.json(res.data);
})

router.post('/addfollowing' , [authUser , addFollower] , (req , res) => {
    res.json({success:true , data:res.data});
})

router.get('/:name' , [authUser , finduser] , (req , res) => {
    res.status(200).json({success:true , data:res.data});
})

router.get('/followers/:name' , getFollowers , (req , res) => {
    res.status(200).json({success:true , data:res.data});
})

router.get('/following/:name' , getFollowing , (req , res) => {
    res.status(200).json({success:true , data:res.data});
})

module.exports = router;
