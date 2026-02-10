import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({

        productID: { type: mongoose.Schema.Types.ObjectId,required: true },
        userID: { type: mongoose.Schema.Types.ObjectId,required: true  },
        qty: { type: Number, required: true, default: 1 , min:1},
        color:{type:String,required: true},
        size:{type:String,required:true}
    }
    ,
    {
        timestamps: true,
        versionKey:false
    }
)
const CartModel = mongoose.model('carts', DataSchema);

export default CartModel;