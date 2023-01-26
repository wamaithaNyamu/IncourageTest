import ClaimsModel from "../models/models.Claims.js";
import User from "../../Users/models/models.User.js";
export const postClaim= async (req, res) => {
    try {
        const data = await ClaimsModel.create(req.body);
        res.status(201).json( data );
    } catch (error) {
        res.status(400).json({ error });
    }
}


export const postClaimByUSSD = async (req, res) => {
    try {
        const user = await User.findOne({phone:req.params.phone}).select('_id');
        const data = await ClaimsModel.create({User_ID:user._id,...req.body});
        console.log(data); 
        res.status(201).json( data );
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
}
