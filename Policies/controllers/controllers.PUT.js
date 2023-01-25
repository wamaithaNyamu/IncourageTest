import PoliciesModel from "../models/models.Policies.js";

export const putPolicy = async (req, res) => {
    try {
        const data = await PoliciesModel.findOneAndUpdate({ _id: req.params.id }, req.body)
        res.status(201).json( data );
    } catch (error) {
        res.status(400).json({ error });
    }
}


