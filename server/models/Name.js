import mongoose from 'mongoose'
const NameSchema = new mongoose.Schema({
    firstName:{type:String},
    lastName:{type:String},
},{timestamps:true})
export default mongoose.model('Name',NameSchema)