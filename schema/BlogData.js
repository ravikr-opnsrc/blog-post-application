import mongoose from "mongoose";

const blogdata = new mongoose.Schema({
    title:{ 
        type:String,
        // required : true

    },
    description:{
        type:String,
        // required : true

    },
    image:{
        type:String,
        // required : true

    },
    user:{
        type:mongoose.Types.ObjectId, // main user k id me jaana hai
        ref :"Detail",//database
        required : true,
        

    },
    date :{
        type:Date,
        default: Date.now()
    }
    
})

const BlogData = new mongoose.model("BlogData",blogdata);
export default BlogData;