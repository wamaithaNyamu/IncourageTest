import ClaimsModel from "../models/models.Claims.js";

export const putClaim = async (req, res) => {
    try {
        const data = await ClaimsModel.findOneAndUpdate({ _id: req.params.id }, req.body)
        res.status(201).json( data );
    } catch (error) {
        res.status(400).json({ error });
    }
}


