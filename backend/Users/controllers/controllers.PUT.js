import UserModel from "../models/models.User.js";

export const putUser = async (req, res) => {
    try {
        const user = await UserModel.findOneAndUpdate({ _id: req.params.id }, req.body)
        res.status(201).json( user );
    } catch (error) {
        res.status(400).json({ error });
    }
}


