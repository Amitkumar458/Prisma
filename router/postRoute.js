const { Router } = require('express');
const { authUser } = require('../controllers/userControllers');
const { postBlog, suggestPost, userPost, PostById, addComment, allComment } = require('../controllers/postControllers');

const router = Router();

router.get('/' , (req , res) => {
    res.json({
        success:true,
        msg:"post route is working"
    })
})

router.post('/postblog' , [authUser , postBlog] , async (req , res) => {
    res.status(200).json({success:true , data:res.data});
})

router.get('/suggest' , [authUser , suggestPost] , (req , res) => {
    res.status(200).json({success:true , data:res.data});
})

// find post of user by user Id
router.get('/:id' , userPost , (req , res) => {
    res.status(200).json({success:true , data:res.data});
})

// find post of by postId
router.get('/p/:id' , PostById , (req , res) => {
    res.status(200).json({success:true , data:[res.data]});
})

// comment on a post
router.post('/comment' , [authUser , addComment] , (req , res) => {
    res.status(200).json({success:true , data:res.data});
})

// get all comment of a perticular post by providing id
router.get('/comment/:id' , allComment , (req , res) => {
    res.status(200).json({success:true , data:res.data});
})


module.exports = router;