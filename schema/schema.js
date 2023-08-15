import mongoose from "mongoose";

const detail = new mongoose.Schema({
    FirstName:{ 
        type:String,
        // required : true

    },
    LastName:{
        type:String,
        // required : true

    },
    Country:{
        type:String,
        // required : true

    },
    password:{
        type:String,
        required : true,
        minlength : 6

    },
    Conformpassword:{
        type:String,
        required : true,
        minlength : 6
    },
    email:{
        type:String,
        unique : true,
        required : true
        // immutable : true means we can't change it
        // validator : v => v%2 == 0 // validator that only even no store
        
    },
    blogs : [
        {
            type:mongoose.Types.ObjectId, // sare blog ka id rahega
            ref :"BlogData", // database
            // required : true,
        }
    ]

    

})

const Detail = new mongoose.model("Detail",detail);
export default Detail;