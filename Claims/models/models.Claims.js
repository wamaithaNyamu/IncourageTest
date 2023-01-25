import mongoose from "mongoose";

const claimsSchema = new mongoose.Schema({
  
    User_ID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    claim_channel: {
        type: String,
        required: true,
    },
    attachment: [{
        type: String,
        required: true,
    }],

    active: {
        type: Boolean,
        default: true,
    },
},
    {
        timestamps: true,
    }
);

export default mongoose.model("Claims", claimsSchema);