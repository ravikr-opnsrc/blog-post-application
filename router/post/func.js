import mongoose from "mongoose";
import BlogData from "../../schema/BlogData.js";
import Detail from "../../schema/schema.js";

export const getAllblog = async(req,res)=>{
    try{
        const blog = await BlogData.find().populate("user");
        if(blog){
            res.status(200).json({blog})
        }else{
            res.status(201).json({"message" : "no blog is created till now"});
        }
       

    }catch(err){
        res.status(404).json({"message":err});
    }

}
export const addAllblog = async(req,res)=>{
    const{title,description,image,user} = req.body;
    console.log(req.body);
    try{
        const existingUser = await Detail.findById(user); // it gives the data of the persion now we have tp save the blog on blogs array.
        console.log(existingUser);
        // const blog = new BlogData(req.body);
        // const saveData = await blog.save();
        // res.status(200).json(saveData);

        if(existingUser){
            console.log("hello");
            const blog = new BlogData({title,description, image,user});
            // const session = await mongoose.startSession();
            // session.startTransaction();
            // await blog.save({session});
            // existingUser.blogs.push(blog);
            // await existingUser.save({session})
            // await session.commitTransaction();
            console.log(blog);

            await blog.save();
            console.log("hogya");
             await Detail.findByIdAndUpdate(user,{
                $push:{
                    blogs : blog._id

                }
                
            },{
                // new:true // when you write new on updation new id is created
            })
            
            
            res.status(200).json({"message" : "add ho gya"});


        }else{
            res.status(400).json({"message" : "unable to find user by this id"}); 
        }

    }catch(err){
        res.status(404).json({"message":err});
    }

}

export const updateBlog = async(req,res)=>{
    const {title,description} = req.body;
    const blogId = req.params.id;
    try{
         
        const blog = await BlogData.findByIdAndUpdate(blogId,{
            title,
            description,
        },{
            new:true // this show updated data from the client side otherwise we have to referesh the (once again send get request) to get updated data
        });
        console.log(blog)
        if(blog){
            res.status(200).json(blog);

        }
        else{
            res.status(203).json({"message": "blog not created"});
        }
    }catch(err){
        res.status(404).json({"message":err});
    }


}

export const getById = async(req,res)=>{
    const id = req.params.id

    try{
        let blog = await BlogData.findById(id)
        if(blog){
            res.status(200).json(blog);

        }
        else{
            res.status(203).json({"message": "blog not created"});
        }
    }catch(err){
        res.status(404).json({"message":err});
    }

}

export const deleteBlog = async(req,res)=>{
    const id = req.params.id

    try{
        let blog = await BlogData.findByIdAndDelete(id)
        if(blog){
            console.log(blog);
            const existingUser = await Detail.findById(blog.user);
            if(existingUser){
                await Detail.findByIdAndUpdate(blog.user,{
                    $pull:{
                        blogs : blog._id
    
                    }
                    
                },{
                    // new:true // when you write new on updation new id is created
                })

            }

            res.status(200).json({message:"blog deleted"});

        }
        else{
            res.status(203).json({"message": "blog not created"});
        }
    }catch(err){
        res.status(404).json({"message":err});
    }
}


export const userblog= async(req,res)=>{
    const id = req.params.id

    try{
        let blog = await Detail.findById(id).populate('blogs')
        if(blog){
            res.status(200).json(blog);

        }
        else{
            res.status(203).json({"message": "blog not created"});
        }
    }catch(err){
        res.status(404).json({"message":err});
    }
    

}

