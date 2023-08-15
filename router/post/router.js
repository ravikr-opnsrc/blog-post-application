import express from 'express';
import { getAllblog,addAllblog,updateBlog,getById,deleteBlog,userblog} from './func.js';
const blogrouter = express.Router();

blogrouter.get("/", getAllblog);
blogrouter.post("/add",addAllblog);
blogrouter.put("/update/:id",updateBlog);
blogrouter.get("/:id",getById);
blogrouter.delete("/delete/:id",deleteBlog);
blogrouter.get("/user/:id",userblog);




export default blogrouter;