import Detail from "../schema/schema.js";
import bcrypt from 'bcrypt'


export const getAllUser = async(req,res)=>{
    let allUserData;
    

    try{
        allUserData = await Detail.find().populate('blogs');

    }catch(err){
        console.log(err);

    }
    if(!allUserData){
        return res.status(404).json({message:"no user found"});
    }
    return  res.status(200).json({allUserData});

}
export const signUpData = async(req,res)=>{
    try{
        const {name,  LastName, Country,  password,  Conformpassword, email} = req.body;
        // Conformpassword = password;
        console.log(req.body);
        if( Conformpassword == password){
            const hashPassword = await bcrypt.hash(password,10);
            
            
            
             
            const result = await Detail.findOne({email});

            if(!result){
            const register = new Detail({FirstName : name,  LastName, Country,  password : hashPassword , Conformpassword: hashPassword, email, blogs:[]});
            console.log( register);
            await register.save()
             
             console.log("signUp ho gya");
             return  res.status(200).json({message :"success",user:result});
            }else{
                return res.status(201).json({message:"account already exist"});
            }
            
        }else{
            
            return res.status(400).json({message:"password doesnot match"});
        }
       
    }catch(err){
        return res.status(404).json({message : err});
    }
   




}

export const loginData = async(req,res)=>{
     const{email, password} = req.body;
     const result = await Detail.findOne({email});
     try{
        if(!result){
            return res.status(201).json({message:"account does not exist"});
         }
         else{
             console.log(result);
             const check = await bcrypt.compare(password,result.password)
             if(check){
                 console.log("login success");
                return res.status(200).json({message:"success", user:result});
             }else{
                return res.status(401).json({message:"invalid password"});
             }
         }
     }catch(err){
        return res.status(404).json({message : "check your password is unique or not"});
     }
    


 }


            


//  let blogdataa = await BlogData.findById(id)
//  let blog = await BlogData.findByIdAndDelete(id) 
//  if(!blog){
//      console.log(" id "+blogdataa);
     
//  const existingUser = await Detail.findById(blogdataa.user);
//      if(existingUser){
//          await Detail.findByIdAndUpdate(blogdataa.user,{
//              $pull:{
//                  blogs : blog._id

//              }
             
//          },{
//              new:true
//          })


//          return res.status(200).json({"message":"delete ho gya"});

//      }else{
//          return res.status(203).json({"message": "delete nahi hua"});

//      }

//  }
//  else{
//      return res.status(203).json({"message": "blog not created"});
//  }
