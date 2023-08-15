

import React, { useState } from 'react'
import {AppBar, Typography,Toolbar,Box, Button, Tabs, Tab} from '@mui/material';
import {  Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/store';




 


function Header() {
  const dispatch = useDispatch()
 const [value, setValue] = useState()
 const isLoggedIn = useSelector((state) => state.isLoggedIn )
    
  return (
    <AppBar sx={{background : "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(13,18,54,1) 35%, rgba(0,212,255,1) 100%)", position:"sticky", justifyContent:"center"}}>
    <Toolbar >
    <Typography variant = "h3">BlogApp</Typography>
    { isLoggedIn && <Box display= "flex" margin={'auto'} >
        <Tabs value = {value} onChange={ (e,val) => setValue(val)}>
            <Tab  LinkComponent = {Link} to = "/blogs" label = "All Blogs" sx = {{color:"white"}}/> 
            <Tab LinkComponent = {Link} to = "/userblogs" label = "My Blogs" sx = {{color:"white"}}/> 
            <Tab LinkComponent = {Link} to = "/blogs/add" label = "post blog" sx = {{color:"white"}}/> 
        </Tabs>

    </Box>}
    <Box sx={{display : "flex", marginLeft :"auto"} }>
    { !isLoggedIn && <><Button  LinkComponent={Link}  to = "/login" variant='contained' sx= {{color : "white" , margin:1.5, background: "none" }} >Login</Button>
    <Button  LinkComponent = {Link} to = "/login" variant='contained'  sx= {{color : "white" , margin:1.5 ,  background: "none"}}>SignUp</Button> </>}
    {isLoggedIn && <Button onClick={()=>dispatch(authActions.logout())}LinkComponent = {Link} to = "/login" variant='contained'  sx= {{color : "white" , margin:1.5 ,  background: "none"}}>LogOut</Button>}
    </Box>
    
    </Toolbar>
    </AppBar> 
  );
}

export default Header