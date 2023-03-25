import mongoose from "mongoose";

const userCollection = "users"

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    password: String,
    role: String,
    orders: [{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Orders'
    }
        
    ],
    cart: {
        type:mongoose.SchemaTypes.ObjectId,
        ref:'carts'
    }
})

mongoose.set("strictQuery", false)
const UserModel = mongoose.model(userCollection, userSchema)

export default UserModel
