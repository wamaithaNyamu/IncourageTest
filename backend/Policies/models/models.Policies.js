import mongoose from "mongoose";

const policiesSchema = new mongoose.Schema({
    policy_name: {
        type: String,
        required: true,
        trim: true,
    },
    policy_number: {
        type: String,
        required: true,
    },

    policy_type: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
},
    {
        timestamps: true,
    }
);

export default mongoose.model("Policies", policiesSchema);