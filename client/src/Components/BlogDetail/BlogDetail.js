import axios from 'axios';
import React,{useEffect,useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { InputLabel, TextField, Typography,Box, Button } from '@mui/material'



function BlogDetail() {

  const navigate = useNavigate();

  const [inputs, setinputs] = useState({
    title :"",
    description:"",
  
  })

  const handleChange = (e) =>{
    setinputs((prevState)=>({
      ...prevState,
      [e.target.name] : e.target.value,
    }));

  }


  const [blog, setblog] = useState()
  const id = useParams().id;
  console.log(id);

  const sendRequest = async()=>{

    try{
      const res = await axios.get(`http://localhost:5000/api/blog/${id}`)
      const data = await res.data;
      return data;

    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
     sendRequest().then(data => {
      setblog(data)
      setinputs({
        title : data.title,
        description: data.description,
       

      })
    })
    
  }, [id]); // whenever the id change it will rerender the component
  console.log(blog)

  const senddata = async()=>{
    try{
      const res = await axios.put(`http://localhost:5000/api/blog/update/${id}`,{
        title:inputs.title,
        description:inputs.description
       

      })
      const data = await res.data;
      return data;

    }catch(err){
      console.log(err);
    }
  }

     const handleSubmit = async(e)=>{
       e.preventDefault();
       console.log(inputs)
       const data = await senddata()
       console.log(data);
       await navigate("/userblogs")

     }

  return (
    <div>
    { inputs &&
    
      <form onSubmit={handleSubmit}>
        <Box sx= {{border:3,borderColor : "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(13,18,54,1) 35%, rgba(0,212,255,1) 100%)", position:"sticky", justifyContent:"center", borderRadius:10, boxShadow:"10px 10px 20px #ccc ", padding:3, margin:"auto", display : "flex",flexDirection:"column", width:"80%",marginTop:5}}>
          <Typography sx={{fontWeight:"bold", padding:3, color:"grey", variant:"h2", textAlign:"center"}}> post your blog</Typography>
          <InputLabel sx={{marginTop:2,marginBottom:2,fontSize:"24px",fontWight:"bold"}}> title </InputLabel>
          <TextField name ="title" onChange = {handleChange} value={inputs.title} sx={{margin:"auto",variant:"outlined"}}/>
          {/* <InputLabel sx={{marginTop:2,marginBottom:2,fontSize:"24px",fontWight:"bold"}}> imageUrl </InputLabel>
          <TextField  name ="imageUrl" onChange = {handleChange} value={inputs.imageUrl} sx={{margin:"auto",variant:"outlined"}}/> */}
          <InputLabel sx={{marginTop:2,marginBottom:2,fontSize:"24px",fontWight:"bold"}}> description </InputLabel>
          <TextField name ="description" onChange = {handleChange} value={inputs.description} sx={{margin:"auto",variant:"outlined"}}/>
          <Button type='submit' variant = "contained" sx={{borderRadius :3 ,marginTop:3, color:"white", width:"50%" , marginLeft:"auto", marginRight:"auto"}} >submit</Button>
        </Box>
      </form>
    }
    </div>
  )
}

export default BlogDetail