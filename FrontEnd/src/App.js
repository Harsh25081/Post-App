import axios from "axios"
import { useState , useEffect } from "react"
import {useNavigate} from "react-router-dom"

const App = () => {
    const navigate = useNavigate();
    const [posts,setPosts]=useState([])

    const getallposts = ()=>{
        axios.get("http://localhost:3001/getpost")
        .then((res)=>{setPosts(res.data.data)})
        .catch((err)=>{console.log(err.message)})
    }

    useEffect(()=>{
        getallposts();
    })

    const showPost = (post)=>{
        navigate(
            "/showpost",
            {state:{
                book:JSON.stringify(post)
            }
        } );
    };

    return (<div style={{backgroundColor:"#87CEFA"}}>
        <button className="btn btn-success" onClick={()=>{navigate("/createpost")}}>Create New Post</button>
        {posts.map((post,index)=>{
            let {Name,Post}=post
            return <div key={index} style={{border:"1.5px solid black",margin:"5px"}} onClick={()=>{showPost(post)}}>
                <div style={{display:"flex"}}>
                    <img alt={post.Name} src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1676831084~exp=1676831684~hmac=3eb7e29cc442645e2339bf6cac6b917c9a24e750166c24ed66602975645b6671" style={{width:"3%",height:"3%"}}></img>
                {/* <label style={{border:"1.5px solid black",width:"10%",marginRight:"15px"}}>Posted By -</label> */}
                <p style={{border:"1.5px solid red",width:"30%",height:"36px",paddingTop:"7px",paddingLeft:"10px"}}>{Name}</p>
                </div>
                <div>
                <label style={{border:"1.5px solid black",width:"5%",marginRight:"15px"}}>Post -</label>
                <p style={{width:"100%",marginLeft:"70px"}}>{Post}</p>
                </div>
            </div>
        })}
    </div>)
}

export default App