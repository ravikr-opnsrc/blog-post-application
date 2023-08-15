import { InputLabel, TextField, Typography,Box, Button } from '@mui/material'
import React,{useState} from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';


function Addblog() {
  const navigate = useNavigate();
  const [inputs, setinputs] = useState({
    title :"",
    description:"",
    imageUrl:""
  })
  
  const sendRequest = async()=>{
    try{
      const res = await axios.post("http://localhost:8000/api/blog/add",{
        title:inputs.title,
        description:inputs.description,
        image:inputs.imageUrl, // jo schema me naam hoga wahi left side me hoga
        user:localStorage.getItem("userId"),
      
      })
      const data = await res.data;
      return data;
    }catch(err){
      console.log(err)
    }
   
  }

  const handleChange = (e) =>{
    setinputs((prevState)=>({
      ...prevState,
      [e.target.name] : e.target.value,
    }));

  }
  const handleSubmit = async(e) =>{
    e.preventDefault();
    console.log(inputs)
     const data = await sendRequest();
     await navigate("/userblogs")

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box sx= {{border:3,borderColor : "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(13,18,54,1) 35%, rgba(0,212,255,1) 100%)", position:"sticky", justifyContent:"center", borderRadius:10, boxShadow:"10px 10px 20px #ccc ", padding:3, margin:"auto", display : "flex",flexDirection:"column", width:"80%",marginTop:5}}>
          <Typography sx={{fontWeight:"bold", padding:3, color:"grey", variant:"h2", textAlign:"center"}}> post your blog</Typography>
          <InputLabel sx={{marginTop:2,marginBottom:2,fontSize:"24px",fontWight:"bold"}}> title </InputLabel>
          <TextField name ="title" onChange = {handleChange} value={inputs.title} sx={{margin:"auto",variant:"outlined"}}/>
          <InputLabel sx={{marginTop:2,marginBottom:2,fontSize:"24px",fontWight:"bold"}}> imageUrl </InputLabel>
          <TextField  name ="imageUrl" onChange = {handleChange} value={inputs.imageUrl} sx={{margin:"auto",variant:"outlined"}}/>
          <InputLabel sx={{marginTop:2,marginBottom:2,fontSize:"24px",fontWight:"bold"}}> description </InputLabel>
          <TextField name ="description" onChange = {handleChange} value={inputs.description} sx={{margin:"auto",variant:"outlined"}}/>
          <Button type='submit' variant = "contained" sx={{borderRadius :3 ,marginTop:3, color:"white", width:"50%" , marginLeft:"auto", marginRight:"auto"}} >submit</Button>
        </Box>
      </form>
    </div>
  )
}

export default Addblog

