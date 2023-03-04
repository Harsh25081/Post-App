const express = require("express")
const { CreateComment, GetComment, UpdateComment, DeleteComment } = require("../controllers/commentController")
const { CreatePost, GetPost, UpdatePost, DeletePost } = require("../controllers/postController")
const router = express.Router()

router.get("/",(req,res)=>{
    res.send("This is the test API")
})

router.post("/createpost",CreatePost)
router.get("/getpost",GetPost)
router.put("/updatepost",UpdatePost)
router.put("/deletepost",DeletePost)

router.post("/createcomment",CreateComment)
router.get("/getcomment",GetComment)
router.put("/updatecomment",UpdateComment)
router.put("/deletecomment",DeleteComment)


module.exports = router