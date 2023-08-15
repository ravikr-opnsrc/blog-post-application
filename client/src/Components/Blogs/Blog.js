import React from 'react'
import {CardContent,Avatar,Card, CardHeader,Box, CardMedia, Typography} from "@mui/material";
import { red } from '@mui/material/colors';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Blog({title,description, imageUrl,userName,date, isUser,id}) {
    console.log( "id ====" + isUser);
    
    const navigate = useNavigate();
    const handleEdit = ()=>{
      navigate(`/userblogs/${id}` )
    }

    const deletedata = async()=>{
      try{
        const res = await axios.delete(`http://localhost:5000/api/blog/delete/${id}`)
        const data = await res.data;
        return data;
      }catch(err){
        console.log(err)
      }
    }

    const handleDelete = async()=>{
      const data = await deletedata();
      await navigate("/");
      await navigate("/blogs")
      console.log(data);

    }

  return (
    <Card sx={{ width: "40%", margin:"auto",marginTop:2, padding:2, boxShadow:"5px 5px 10px #ccc", "&:hover":{
        boxShadow:"15px 15px 30px #ccc",
        cursor: 'pointer'
    } }}>

    {isUser && (
      <Box sx = {{display : "flex", flexDirection :"rowReverse"}}>
        <IconButton sx ={{marginLeft : "auto", color:"black", "&:hover":{color:"blue"}}} onClick = {handleEdit} > <EditIcon/> </IconButton>
        <IconButton sx = {{color:"black","&:hover":{color:"blue"}}}  onClick = {handleDelete} ><DeleteIcon/></IconButton>
   
      
      </Box>
    )}

      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {/* {userName.charAt(0)} */}
            {/* {x} */}
            {userName.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={date}
      />
      <CardMedia
        component="img"
        height="194"
        image={imageUrl}
        alt="Paella dish"
      />
     
      <CardContent>
      <hr />
     <br />
        <Typography variant="body2" color="text.secondary">
           <b>{userName}</b>{" : "}{description}
        </Typography>
      </CardContent>
      
        
    </Card>
  )
}

export default Blog