import React,{useEffect,useState}  from 'react'
import axios from 'axios';
import Blog from "../Blogs/Blog"



function UserBlogs() {
  const[blogss,setBlogs] =  useState([])
    
  const id = localStorage.getItem("userId");
  console.log(id);

    
      const sendRequest = async()=>{
      try{
      const res = await axios.get(`http://localhost:8000/api/blog/user/${id}`); // give blogs that the username id is same
      console.log("res")
      console.log(res)
      const data = await res.data;
      console.log("dtaa");
      console.log(data);
      return data;
      }
      catch(err){
        console.log(err);
    }
    }
    
    
  
  useEffect(()=>{
    sendRequest().then(data=>setBlogs(data));

  },[])
  console.log(" my blog wala");
  console.log(blogss);
  const blogarr = blogss.blogs
  console.log(" my blog wala........");
  
  return (
<div>
      {blogarr && blogarr.map((blog,index) => <Blog key = {index} isUser = {true} id = {blog._id} title = {blog.title} description = {blog.description} imageUrl ={ blog.image} userName = {blogss.email} date = {blog.date} />)}
    </div>
  )
}

export default UserBlogs