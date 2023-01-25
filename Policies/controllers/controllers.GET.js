import PoliciesModel from "../models/models.Policies.js";

export const getPolicy = async (req, res) => {
    try {
        
        const users = await PoliciesModel.find({_id:req.params.id,...req.query});
        res.status(200).json( users );
    } catch (error) {
        res.status(400).json({ error });
    }
}

export const getAllPolicies = async (req, res) => {
    try {
        const users = await PoliciesModel.find({});
        res.status(200).json( users );
    } catch (error) {
        res.status(400).json({ error });
    }
}


