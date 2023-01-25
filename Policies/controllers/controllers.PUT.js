import PoliciesModel from "../models/models.Policies.js";

export const putPolicy = async (req, res) => {
    try {
        const user = await PoliciesModel.findOneAndUpdate({ _id: req.params.id }, req.body)
        res.status(201).json( user );
    } catch (error) {
        res.status(400).json({ error });
    }
}


