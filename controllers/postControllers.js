const prisma = require("../prisma");

const postBlog = async (req , res , next) => {
    const {title , image} = req.body;
    const authorId = req.user.id;
    const slug = title.split(" ").join("-");
    const likeCount = 0;
    const body = "null"
    if(!title || !body || !authorId){
        return res.json({
            success:false,
            "error":"please enter all Fields"
        });
    }
    const data = await prisma.post.create({
        data:{
            title,
            body:"",
            author:{connect:{id:authorId}},
            Image:image,
            slug,
            likeCount
        }
    });
    res.data = data;
    next();
}

const getAlldata = async (req , res , next) => {
    const user = req.query.username;
    if(!user){
        return res.json({
            success:false,
            error:"please provide username"
        })
    }
    const data = await prisma.user.findUnique({
        where:{
            username:user
        },
        include:{
            posts:true,
            followers:true,
            following:true,
        }
    })
    if(!data) {
        return res.json({success:false , msg:"user not Found"});
    }
    res.data = data;
    next();
}

const suggestPost = async (req , res , next) => {
    try {
        const data = await prisma.post.findMany({
            include:{
                author:true
            },
            orderBy: {
                createdAt:'desc',
            }
        });
        res.data = data;
    } catch (error) {
        console.log(error);
        return res.status(400).json({success:false , msg:"something went wrong"});
    }
    next();
}

const userPost = async (req , res , next) => {
    const id = req.params.id;
    try {
        const data = await prisma.post.findMany({
            where:{
                authorId:id
            },
            orderBy: {
                createdAt:'desc',
            }
        });
        res.data = data;
    } catch (error) {
        console.log(error);
        return res.status(400).json({success:false , msg:"something went wrong"});
    }
    next();
}

const PostById = async (req , res , next) => {
    const id = req.params.id;
    try {
        const data = await prisma.post.findFirst({
            where:{
                id:id
            },
            include:{
                author:true
            }
        })
        res.data = data;
        next();
    } catch (error) {
        return res.status(400).json({success:false , msg:"something went wrong"});
    }

}

module.exports = {postBlog , getAlldata , suggestPost , userPost , PostById};