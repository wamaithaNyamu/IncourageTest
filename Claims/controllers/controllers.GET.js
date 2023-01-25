import ClaimsModel from "../models/models.Claims.js";

export const getClaim = async (req, res) => {
    try {
        
        const data = await ClaimsModel.find({_id:req.params.id,...req.query});
        res.status(200).json( data );
    } catch (error) {
        res.status(400).json({ error });
    }
}

export const getAllClaims = async (req, res) => {
    try {
        const data = await ClaimsModel.find({});
        res.status(200).json( data );
    } catch (error) {
        res.status(400).json({ error });
    }
}


