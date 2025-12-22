import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
        type:String,
        required:true,
        trim:true,
    },
    avatar: {
        type:String,
        default:''
    },
    birthday: {
        type:Date,
        required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

export default mongoose.model('User', userSchema)
