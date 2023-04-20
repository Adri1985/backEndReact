import mongoose from "mongoose";

const schema = new mongoose.Schema({
    user:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    time: new Date().toLocaleDateString()
})

const ResetModel = mongoose.model('Resets', schema)

export default ResetModel

