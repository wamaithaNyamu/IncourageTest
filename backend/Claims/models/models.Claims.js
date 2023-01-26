import mongoose from "mongoose";
import User from "../../Users/models/models.User.js";

const claimsSchema = new mongoose.Schema({
  
    User_ID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    claim_channel: {
        type: String,
        required: true,
    },
    telegram_chat_id: {
        type: String,
    },

    attachments: [{
        type: String,
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