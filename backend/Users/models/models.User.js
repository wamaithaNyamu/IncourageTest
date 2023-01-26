import mongoose from "mongoose";
import Policies from "../../Policies/models/models.Policies.js";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    national_id: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    telegram_username: {
        type: String,
        trim: true,
        unique: true,
    },
    active: {
        type: Boolean,
        default: false,
    },
    Policy_ID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Policies
    },

},
    {
        timestamps: true,
    }
);

export default mongoose.model("User", userSchema);