import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const ShowPost = () => {
    let location = useLocation()
    let navigate = useNavigate()
    let [comment, setComment] = useState([])
    let { _id, Name, Post } = JSON.parse(location.state.book)
    let [replyy,setReply]=useState("")
    let [Namee,setNamee]=useState("")
    let [post,setPost]=useState("")

    let [editpst,setEditpst]=useState(false)
    let [rep,setRep]=useState(false)
    // let [comm,setComm]=useState(false)

    let selId = _id

    function refreshPage() {
        window.location.reload(false);
      }

    const getComment = () => {
        axios.get("https://post-app-lake.vercel.app/getcomment")
            .then((res) => { setComment(res.data.data) })
            .catch((err) => { console.log(err.message) })
    }

    useEffect(() => {
        getComment();
    })

    const deletepost = (_id) => {
        axios.put("https://post-app-lake.vercel.app/deletepost", { _id })
            .then((res) => { alert("Deleted Successfully"); navigate("/") })
            .catch((err) => { console.log(err.message) })
    }

    const deleteComment = (_id) => {
        axios.put("https://post-app-lake.vercel.app/deletecomment", { _id })
            .then((res) => { alert("Deleted Successfully") })
            .catch((err) => { console.log(err.message) })
    }

    const deleteReply = (_id, replyId) => {
        axios.put("https://post-app-lake.vercel.app/deletecomment", { _id, replyId })
            .then((res) => { alert("Deleted Successfully") })
            .catch((err) => { console.log(err.message) })
    }

    const editpost = (_id,post)=>{
        let Post = post;
        axios.put("https://post-app-lake.vercel.app/updatepost", { _id,Post})
            .then((res) => { console.log(res.data) })
            .catch((err) => { console.log(err.message) })
            setEditpst(false);
            refreshPage()
    }

    const editcomment = (_id,Comment)=>{
        axios.put("https://post-app-lake.vercel.app/updatecomment", { _id,Comment})
            .then((res) => {console.log(res.data) })
            .catch((err) => { console.log(err.message) })
            setEditpst(false);
            getComment();
            refreshPage()
    }

    const editreply = (_id,Reply,Name)=>{
        axios.put("https://post-app-lake.vercel.app/updatecomment", { _id,Reply,Name})
            .then((res) => { console.log(res.data) })
            .catch((err) => { console.log(err.message) })
            setEditpst(false);
            setRep("")
            refreshPage()
    }

    const createComment = (selId, Namee,post)=>{
        let PostId = selId;
        let Name = Namee;
        let Comment = post;
        axios.post("https://post-app-lake.vercel.app/createcomment", { PostId,Name,Comment})
            .then((res) => { console.log(res.data) })
            .catch((err) => { console.log(err.message) })
            setNamee("");setPost("");
    }

    return (
        <div style={{backgroundColor:"#7FFFD4"}}>

            <div>{/*showing post*/}
                <div style={{ border: "1.5px solid black", width: "60%", height: "200px" }}>
                    <p style={{ borderBottom: "solid", width: "100%" }}><label>Posted By :</label>{Name}</p>
                    {editpst===false && <p>{Post}</p>}
                    {editpst===true && <textarea placeholder={Post} onChange={(e)=>{setPost(e.target.value);}} style={{height:"80%",width:"99.6%",resize:"none"}}>{Post}</textarea>}
                </div>
                {editpst===false && <button onClick={()=>{setEditpst(true)}}>Edit Post</button>}
                {editpst===true && <button onClick={() => editpost(_id,post)}>Save</button>}
                <button onClick={() => deletepost(_id)}>Delete Post</button>


                <div style={{ border: "1.5px solid black", width: "60%" }}>{/*showing comments*/}
                    <p style={{marginTop:"12px"}}>Comments - </p>
                    <div style={{display:"flex"}}>
                <input placeholder="Name"  onChange={(e)=>{setNamee(e.target.value)}} style={{height:"30px "}}></input>
                    <textarea placeholder="Comment" onChange={(e)=>{setPost(e.target.value)}} style={{resize:"none",height:"30px",width:"70%",borderRadius:"10px",backgroundColor:"#D3D3D3"}}></textarea>
                    <button onClick={()=>{createComment(selId,Namee,post)}}>Comment</button>
                    </div>

                    <div>
                        {comment.map((com, index) => {
                            let { _id, PostId, Name, Comment, Reply } = com
                            let comId = _id
                            return <div key={index}>
                                {PostId === selId && <div><br />
                                    <div style={{ display: "flex" }}>
                                        <img alt={com.Name} src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1676831084~exp=1676831684~hmac=3eb7e29cc442645e2339bf6cac6b917c9a24e750166c24ed66602975645b6671"
                                            style={{ width: "3%", height: "3%", marginTop: "5px" }}></img>
                                        <div style={{ border: "1.5px solid black", width: "90%", marginTop: "5px", borderRadius: "10px" }}>
                                            <p style={{ "font-weight": "bold", height: "23px", paddingTop: "2px", paddingLeft: "10px" }}>{Name}</p>
                                            {/* <p style={{ width: "100%", marginLeft: "30px" }}>{Comment}</p> */}
                                            {editpst===false && <p>{Comment}</p>}
                                            {editpst===true && <textarea placeholder={Comment} onChange={(e)=>{console.log(e.target.value);setPost(e.target.value);}} style={{height:"50%",width:"99%",resize:"none",border:"transparent",marginLeft:"2px"}}>{Comment}</textarea>}
                                        </div>
                                        {/* <button>Edit</button>Edit Button */}
                                        {editpst===false && <button onClick={()=>{setEditpst(true)}}>Edit</button>}
                                        {editpst===true && <button onClick={() => editcomment(_id,post)}>Save</button>}
                                        <button onClick={() => deleteComment(_id)}>Delete</button>{/*Delete Button*/}
                                    </div>



                                    {rep===false && <button style={{ marginLeft: "40px" }} onClick={()=>{setRep(true)}}>Reply</button>}{/*Reply Button*/}
                                    {rep===true && <div style={{display:"flex"}}>
                                        <div style={{marginLeft:"90px",width:"78%",border:"2px solid red",borderRadius:"10px"}}>
                                    <label>Your Name : </label>
                                        <input  onChange={(e)=>{setNamee(e.target.value)}}></input><br/>
                                    <textarea onChange={(e)=>{setReply(e.target.value)}} style={{resize:"none",marginLeft:"13%"}}></textarea>
                                    </div>
                                    {rep===true && <button onClick={()=>{editreply(comId,replyy,Namee)}}>send</button>}
                                        </div>}
                                    
                                    {Reply.map((repl, index) => {
                                        let { Name, reply, _id } = repl
                                        let replyId = _id
                                        return <div key={index} style={{ marginLeft: "90px" }}>
                                            {repl.status === false && <div style={{ display: "flex" }}>
                                                
                                                <img alt={repl.Name} src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1676831084~exp=1676831684~hmac=3eb7e29cc442645e2339bf6cac6b917c9a24e750166c24ed66602975645b6671"
                                                    style={{ width: "3%", height: "3%", marginTop: "5px" }}></img>
                                                <div style={{ border: "1.5px solid black", width: "90%", marginTop: "5px", borderRadius: "10px" }}>
                                                    <p style={{ "font-weight": "bold", height: "23px", paddingTop: "2px", paddingLeft: "10px" }}>{Name}</p>
                                                    {/* <p style={{ width: "100%", marginLeft: "30px" }}>{reply}</p> */}
                                                    <p>{reply}</p>
                                                    {/* {comm===true && <textarea placeholder={reply} onChange={(e)=>{console.log(e.target.value);setPost(e.target.value);}} style={{height:"50%",width:"99%",resize:"none",border:"transparent",marginLeft:"2px"}}>{reply}</textarea>} */}
                                            </div>
                                                {/* <button>Edit</button>Edit Button */}
                                                {/* {comm===false && <button onClick={()=>{setComm(true)}}>Edit</button>} */}
                                                {/* {comm===true && <button onClick={() => editreply(replyId,reply,Name)}>Save</button>} */}
                                                
                                                <button onClick={() => deleteReply(comId, replyId)}>Delete</button>{/*Delete Button*/}
                                            </div>}
                                        </div>
                                    })}
                                </div>
                                }
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowPost