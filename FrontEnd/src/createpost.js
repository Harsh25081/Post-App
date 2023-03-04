import axios from "axios"
import { useState } from "react"
import {  useNavigate } from "react-router-dom"

const CreatePost = ()=>{
    const navigate = useNavigate();
    let [Post,setPost]=useState("")
    let [Name,setName]=useState("")




    const createPost = (e)=>{
        axios.post("https://post-app-lake.vercel.app/createpost",{Name,Post})
        // .then((res)=>{console.log(res.data.data)})
        .then((res)=>{navigate(
            "/showpost",
            {state:{
                book:JSON.stringify(res.data.data)
            }
        } );})
        .catch((err)=>{console.log(err.message)})
    e.preventDefault();
    }

    return (
        <div style={{backgroundColor:"#9370DB",height:"620px",display:"flex",justifyContent:"center"}}><div >{/*creating post*/}
                <div >
                    <textarea rows="15" cols="70" style={{resize:"none",marginTop:"10%"}} onChange={(e)=>{setPost(e.target.value)}}></textarea>
                </div>
                <label>Your Name : </label>
                <input  onChange={(e)=>{setName(e.target.value)}}></input>
                <button onClick={(e)=>createPost(e)} >Post</button>
            </div>
        </div>
    )
}

export default CreatePost