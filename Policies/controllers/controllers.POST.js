import PoliciesModel from "../models/models.Policies.js";

export const postPolicy= async (req, res) => {
    try {
        const data = await PoliciesModel.create(req.body);
        res.status(201).json( data );
    } catch (error) {
        res.status(400).json({ error });
    }
}



