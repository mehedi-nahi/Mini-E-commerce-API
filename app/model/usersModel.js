import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({

        email: { type: String, required: true, unique: true, lowercase: true },
        otp: { type: String, required: true  },// In usersModel.js
        role: { type: String, enum: ['admin', 'customer'], default: 'customer' }

    }
    ,
    {
        timestamps: true,
        versionKey:false
    }
)
const UserModel = mongoose.model('users', DataSchema);

export default UserModel;