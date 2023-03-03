const commentModel = require("../models/commentModel")
const postModel = require("../models/postModel")

exports.CreatePost = async (req,res)=>{
    try {
        const data = req.body
        const {Name,Post}=data
        if(!Name)res.status(400).send({status:false,message:"Pls provide Name"})
        if(!Post)res.status(400).send({status:false,message:"Pls provide Post"})
        const CreatePost = await postModel.create(data)
        res.status(201).send({status:true,message:"Created Successfully",data:CreatePost})
    } catch (error) {
        res.status(500).send({status:false,message:error.message})
    }
}

exports.GetPost = async (req,res)=>{
    try {
        const GetPost = await postModel.find({isDeleted:false})
        res.status(200).send({status:true,message:"Successfull",data:GetPost})
    } catch (error) {
        res.status(500).send({status:false,message:error.message})
    }
}

exports.UpdatePost = async (req,res)=>{
    try {
        const data = req.body
        const {Post,_id}=data
        const UpdatePost = await postModel.findByIdAndUpdate(_id,{$set:{Post}},{new:true})
        res.status(200).send({status:true,message:"Updated Successfully",data:UpdatePost})
    } catch (error) {
        res.status(500).send({status:false,message:error.message})
    }
}

exports.DeletePost = async (req,res)=>{
    try {
        const _id = req.body._id
        await postModel.findByIdAndUpdate(_id,{$set:{isDeleted:true}},{new:true})
        await commentModel.findOneAndUpdate({PostId:_id},{$set:{isDeleted:true}},{new:true})
        res.status(200).send({status:true,message:"Deleted Successfully"})
    } catch (error) {
        res.status(500).send({status:false,message:error.message})
    }
}