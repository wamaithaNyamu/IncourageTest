import ClaimsModel from "../models/models.Claims.js";

export const postClaim= async (req, res) => {
    try {
        const data = await ClaimsModel.create(req.body);
        res.status(201).json( data );
    } catch (error) {
        res.status(400).json({ error });
    }
}



