import ClaimsModel from "../models/models.Claims.js";
import User from "../../Users/models/models.User.js";

export const getClaim = async (req, res) => {
    try {
        
        const data = await ClaimsModel.find({_id:req.params.id,...req.query}).populate("User_ID");
        res.status(200).json( data );
    } catch (error) {
        res.status(400).json({ error });
    }
}

export const getClaimByUserPhone = async (req, res) => {
    try {

        const user = await User.findOne({phone:req.params.phone}).select('_id');
        const data = await ClaimsModel.find({User_ID:user._id,...req.query}).lean();
        res.status(200).json( data );
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
}





export const getAllClaims = async (req, res) => {
    try {
        const data = await ClaimsModel.find({...req.query}).populate("User_ID");
        res.status(200).json( data );
    } catch (error) {
        res.status(400).json({ error });
    }
}


