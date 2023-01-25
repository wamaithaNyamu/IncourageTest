import PoliciesModel from "../models/models.Policies.js";

export const postPolicy= async (req, res) => {
    try {
        const user = await PoliciesModel.create(req.body);
        res.status(201).json( user );
    } catch (error) {
        res.status(400).json({ error });
    }
}



